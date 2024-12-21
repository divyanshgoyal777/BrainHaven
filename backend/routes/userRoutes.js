const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/User");
require("dotenv").config();
const multer = require('multer');
const {v2: cloudinary} = require('cloudinary')
const {CloudinaryStorage}= require('multer-storage-cloudinary')
const { v4: uuidv4 } = require('uuid'); 
const path = require('path')

cloudinary.config({
  cloud_name: 'brainwave-profile-pic', 
  api_key: '191562688573332', 
  api_secret: 'WnVh8Ta8iRKDwcCFmbl3kyyV7To', 
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
  params:{
    folder:"profile-pic",
  },
})

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  res.send({ message: 'File uploaded successfully', file: req.file });
});


module.exports = router;