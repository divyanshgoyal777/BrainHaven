const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const Message = require("../models/Message");

router.get("/chatMessages", authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});

module.exports = router;
