const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const HackmateTeam = require("../models/HackmateTeam");

router.post("/createTeam", authenticateToken, async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      console.log("User from token:", req.user); // Should now contain `id` and `username`
  
      const { name, title, description, maxSize, skillsRequired, lookingFor, teamNeeds } = req.body;
  
      if (!req.user || !req.user.userId) {
        return res.status(403).json({ error: "Unauthorized: User data missing or invalid" });
      }
  
      // Create the team and include the admin as the first member
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
            joinedAt: new Date(), // Automatically sets the join date
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
  
  
  

router.put("/editTeam", authenticateToken, async (req, res) => {});

router.put("/sendTeamJoinRequest", authenticateToken, async (req, res) => {});

router.put("/acceptTeamJoinRequest", authenticateToken, async (req, res) => {});

// Router Delete Hackmate Team is in admin

module.exports = router;
