const express = require("express");
const router = express.Router();
require("dotenv").config();
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/User");
const Resource = require("../models/Resource");
const Code = require("../models/Code");
const Hackathon = require("../models/Hackathon");
const HackmateTeam = require("../models/HackmateTeam");

router.get("/allUsers", authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.delete("/deleteUser/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

router.delete("/deleteResource/:id", authenticateToken, async (req, res) => {
  try {
    const resourceId = req.params.id;
    await Resource.findByIdAndDelete(resourceId);
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    console.error("Error deleting resource:", error);
    res.status(500).json({ error: "Failed to delete resource" });
  }
});

router.delete("/deleteCode/:id", authenticateToken, async (req, res) => {
  try {
    const codeId = req.params.id;
    await Code.findByIdAndDelete(codeId);
    res.json({ message: "Code deleted successfully" });
  } catch (error) {
    console.error("Error deleting code:", error);
    res.status(500).json({ error: "Failed to delete code" });
  }
});

router.delete("/deleteHackathon/:id", authenticateToken, async (req, res) => {
  try {
    const hackathonId = req.params.id;
    await Hackathon.findByIdAndDelete(hackathonId);
    res.json({ message: "Hackathon deleted successfully" });
  } catch (error) {
    console.error("Error deleting hackathon:", error);
    res.status(500).json({ error: "Failed to delete hackathon" });
  }
});

router.delete("/deleteHackmate/:id", authenticateToken, async (req, res) => {
  try {
    const hackmateId = req.params.id;
    const team = await HackmateTeam.findById(hackmateId);
    if (!team) {
      return res.status(404).json({ error: "Hackmate team not found" });
    }
    await HackmateTeam.findByIdAndDelete(hackmateId);
    res.json({ message: "Hackmate deleted successfully" });
  } catch (error) {
    console.error("Error deleting hackmate:", error);
    res.status(500).json({ error: "Failed to delete hackmate" });
  }
});

module.exports = router;
