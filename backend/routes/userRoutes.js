const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticateToken = require("../middleware/authenticateToken");
require("dotenv").config();
const multer = require("multer");
const ImageKit = require("imagekit");
const { v4: uuidv4 } = require("uuid");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed"), false);
    }

    cb(null, true);
  },
});

router.get("/userProfile", authenticateToken, async (req, res) => {
  try {
    const userEmail = req.header("userEmail");
    if (!userEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: userEmail }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details" });
  }
});

router.get("/userProfile/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/userInformation", authenticateToken, async (req, res) => {
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
      { new: true, upsert: true },
    );

    res.status(201).json(user);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Failed to save user details", error });
  }
});

router.post(
  "/uploadUserImage",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }
      const uploadedFile = await imagekit.upload({
        file: req.file.buffer,
        fileName: `${uuidv4()}.jpg`,
        folder: "/profile-pic",
      });
      const imageUrl = uploadedFile.url;
      await User.updateOne(
        { email: req.headers.email },
        {
          profilePhoto: imageUrl,
          profilePhotoFileId: uploadedFile.fileId,
        },
      );
      res.status(200).json({
        url: imageUrl,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({
        error: "Failed to upload image",
      });
    }
  },
);

module.exports = router;
