const express = require("express");
const router = express.Router();
const User = require("../models/User");
require("dotenv").config();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/profile", async (req, res) => {
  try {
    const userEmail = req.header("userEmail");
    if (!userEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details" });
  }
});

router.post("/information", async (req, res) => {
  const userData = req.body;

  try {
    if (!userData.firstName || !userData.lastName || !userData.email) {
      return res
        .status(400)
        .json({ message: "First name, last name, and email are required" });
    }

    const user = await User.findOneAndUpdate(
      { email: userData.email },
      userData,
      { new: true, upsert: true }
    );

    res.status(201).json(user);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Failed to save user details", error });
  }
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile-pic",
    format: async (req, file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      return ext === ".png" || ext === ".jpeg" || ext === ".jpg"
        ? "jpg"
        : "png";
    },
    public_id: (req, file) => uuidv4(),
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }
    const imageUrl = req.file.path;
    await User.updateOne(
      { email: req.headers.email },
      { profilePhoto: imageUrl }
    );
    res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

module.exports = router;
