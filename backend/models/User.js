const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Get JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const username = `${firstname} ${lastname}`;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstname, lastname, email, password: hashedPassword, username });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { firstname, lastname, password } = req.body;

  try {
    const username = `${firstname} ${lastname}`;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
