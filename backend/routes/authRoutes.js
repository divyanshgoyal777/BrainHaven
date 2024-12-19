const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "999d",
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/profile', async (req, res) => {
  try {
     const {email} =req.query;
     console.log(email);
     if(!email) return res.status(400).json({message: "Email is Required"});

     const user= await User.findOne({email});
     console.log(user);
     if(!user) return res.status(404).json({message: "User not Found"});
      
     res.json({
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email
     })

  } catch (error) {
    res.status(500).send('Error fetching user details');
  }
});





module.exports = router;
