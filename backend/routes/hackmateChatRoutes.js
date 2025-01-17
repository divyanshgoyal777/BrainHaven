const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authenticateToken = require("../middleware/authenticateToken");
const HackmateChat = require("../models/HackmateChat");
const HackmateTeam = require("../models/HackmateTeam");

router.post("/chat/:teamId", authenticateToken, async (req, res) => {
  const { message, userId, senderName } = req.body;
  const { teamId } = req.params;

  if (!message || !userId || !senderName) {
    return res
      .status(400)
      .json({ error: "Message, userId, and senderName are required" });
  }

  if (!mongoose.Types.ObjectId.isValid(teamId)) {
    return res.status(400).json({ error: "Invalid teamId" });
  }

  try {
    const team = await HackmateTeam.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const userIsPartOfTeam = team.members.some(
      (member) => member.userId.toString() === userId.toString()
    );

    if (!userIsPartOfTeam) {
      return res.status(403).json({ error: "You are not part of this team" });
    }

    let chat = await HackmateChat.findOne({ teamId });

    if (!chat) {
      chat = new HackmateChat({ teamId, messages: [] });
      await chat.save();
    }

    chat.messages.push({ senderId: userId, senderName, message });
    await chat.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error.message, error.stack);
    res.status(500).json({ error: `Failed to send message: ${error.message}` });
  }
});

router.get("/chat/:teamId", authenticateToken, async (req, res) => {
  const { teamId } = req.params;
  const userId = req.user.userId;

  if (!mongoose.Types.ObjectId.isValid(teamId)) {
    return res.status(400).json({ error: "Invalid teamId" });
  }

  try {
    const team = await HackmateTeam.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing or invalid" });
    }

    const userIsPartOfTeam = team.members.some(
      (member) =>
        member.userId && member.userId.toString() === userId.toString()
    );

    if (!userIsPartOfTeam) {
      return res.status(403).json({ error: "You are not part of this team" });
    }

    const chat = await HackmateChat.findOne({ teamId })
      .populate({
        path: "messages.senderId",
        select: "firstName lastName",
      })
      .exec();

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const messages = chat.messages.map((msg) => ({
      ...msg.toObject(),
      senderName: `${msg.senderId.firstName} ${msg.senderId.lastName}`,
    }));

    res.status(200).json({ teamId, messages });
  } catch (error) {
    console.error("Error fetching messages:", error.message, error.stack);
    res
      .status(500)
      .json({ error: `Failed to fetch messages: ${error.message}` });
  }
});

module.exports = router;
