const express = require("express");
const router = express.Router();
require("dotenv").config();
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/User");

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

module.exports = router;