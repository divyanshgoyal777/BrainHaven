const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authenticateToken = require("../middleware/authenticateToken"); // Import the middleware
const router = express.Router();
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Sign Up route
router.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const username = `${firstname} ${lastname}`;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Use email instead of firstname and lastname
  
  try {
    const user = await User.findOne({ email }); // Use email to find user
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Protected route (requires authentication)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Profile found", user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
