const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const HackmateTeam = require("../models/HackmateTeam");
const mongoose = require("mongoose");

router.get("/allHackmate", authenticateToken, async (req, res) => {
  try {
    const hackmates = await HackmateTeam.find().sort({ createdAt: -1 });
    res.json(hackmates);
  } catch (error) {
    console.error("Error fetching hackmate:", error);
    res.status(500).json({ error: "Failed to fetch hackmate" });
  }
});

router.get("/userTeam", authenticateToken, async (req, res) => {
  try {
    const userId = req.query.userId;
    const objectIdUserId = new mongoose.Types.ObjectId(userId);
    const teams = await HackmateTeam.find({
      admin: objectIdUserId,
    });
    if (!teams || teams.length === 0) {
      return res.status(200).json({ teams: [] });
    }
    return res.status(200).json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return res.status(500).json({
      message: "Server error. Could not fetch teams.",
    });
  }
});

router.post("/createTeam", authenticateToken, async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("User from token:", req.user);

    const {
      name,
      title,
      description,
      maxSize,
      skillsRequired,
      lookingFor,
      teamNeeds,
    } = req.body;

    if (!req.user || !req.user.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized: User data missing or invalid" });
    }

    const team = await HackmateTeam.create({
      title,
      description,
      admin: req.user.userId,
      adminName: name,
      maxSize,
      skillsRequired,
      lookingFor,
      teamNeeds,
      members: [
        {
          userId: req.user.userId,
          userName: name,
          joinedAt: new Date(),
        },
      ],
    });

    res.status(201).json({
      id: team._id,
      title: team.title,
      description: team.description,
      adminName: team.adminName,
      members: team.members,
      createdAt: team.createdAt,
    });
  } catch (error) {
    console.error("Error creating hackmate team:", error.message);
    res.status(500).json({ error: "Failed to create hackmate team" });
  }
});

router.get("/teamProfile/:id", authenticateToken, async (req, res) => {
  try {
    const team = await HackmateTeam.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/deleteTeam/:id", authenticateToken, async (req, res) => {
  try {
    const teamId = req.params.id;
    await HackmateTeam.findByIdAndDelete(teamId);
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ error: "Failed to delete team" });
  }
});

router.put("/editTeam/:id", authenticateToken, async (req, res) => {
  try {
    const teamId = req.params.id;
    const updatedTeam = await HackmateTeam.findByIdAndUpdate(teamId, req.body, {
      new: true,
    });
    if (!updatedTeam) {
      console.log(`Team with ID ${teamId} not found`);
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.put("/joinTeam/:id", authenticateToken, async (req, res) => {});

router.put("/acceptRequest/:id", authenticateToken, async (req, res) => {});

module.exports = router;