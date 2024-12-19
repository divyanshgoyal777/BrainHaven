const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/User");
require("dotenv").config();

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

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details" });
  }
});

module.exports = router;