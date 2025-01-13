const express = require("express");
const router = express.Router();
require("dotenv").config();
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/User");
const Resource = require("../models/Resource");
const Code = require("../models/Code");

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

router.get("/allResources", authenticateToken, async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Failed to fetch resources" });
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

router.get("/allCode", authenticateToken, async (req, res) => {
  try {
    const code = await Code.find();
    res.json(code);
  } catch (error) {
    console.error("Error fetching code:", error);
    res.status(500).json({ error: "Failed to fetch code" });
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

module.exports = router;
