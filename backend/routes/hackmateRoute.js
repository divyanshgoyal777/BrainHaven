const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const HackmateTeam = require("../models/HackmateTeam");
const User = require("../models/User");
const mongoose = require("mongoose");
const Team = require("../models/HackmateTeam");

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
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.put("/joinTeam/:id", authenticateToken, async (req, res) => {
  try {
    const teamId = req.params.id;
    const userId = req.user.userId;

    if (!teamId || !userId) {
      return res
        .status(400)
        .json({ message: "Team ID and User ID are required." });
    }

    const team = await HackmateTeam.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isAlreadyMember = team.members.some(
      (member) => member.userId.toString() === userId
    );
    if (isAlreadyMember) {
      return res
        .status(400)
        .json({ message: "You are already a member of this team." });
    }

    const isAlreadyPending = team.pendingRequests.some(
      (request) => request.userId.toString() === userId
    );
    if (isAlreadyPending) {
      return res
        .status(400)
        .json({ message: "You have already requested to join this team." });
    }
    const { firstName, lastName } = await User.findById(userId);
    const userName = `${firstName} ${lastName}`;

    team.pendingRequests.push({
      userId: user._id,
      userName: userName,
      requestedAt: new Date(),
    });
    await team.save();

    res.status(200).json({
      message: "Your request to join the team has been sent.",
      pendingRequests: team.pendingRequests,
    });
  } catch (error) {
    console.error("Error sending join request:", error);
    res
      .status(500)
      .json({ error: "Failed to send join request. Please try again later." });
  }
});

router.get("/getRequests/:id", authenticateToken, async (req, res) => {
  try {
    const teamId = req.params.id;

    const team = await HackmateTeam.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const pendingRequests = team.pendingRequests.map((request) => ({
      userId: request.userId,
      userName: request.userName,
    }));

    res.status(200).json({
      message: "Pending requests fetched successfully.",
      pendingRequests,
    });
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    res.status(500).json({ error: "Failed to fetch pending requests" });
  }
});

router.put(
  "/declineRequest/:teamId/:userId",
  authenticateToken,
  async (req, res) => {
    try {
      const { teamId, userId } = req.params;

      const team = await HackmateTeam.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      const pendingRequestIndex = team.pendingRequests.findIndex(
        (request) => request.userId.toString() === userId
      );
      if (pendingRequestIndex === -1) {
        return res.status(404).json({ message: "Request not found" });
      }

      team.pendingRequests.splice(pendingRequestIndex, 1);
      await team.save();

      res.status(200).json({ message: "Request declined successfully" });
    } catch (error) {
      console.error("Error declining request:", error);
      res.status(500).json({ error: "Failed to decline request" });
    }
  }
);

router.put(
  "/acceptRequest/:teamId/:userId",
  authenticateToken,
  async (req, res) => {
    try {
      const { teamId, userId } = req.params;

      const team = await HackmateTeam.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      const pendingRequestIndex = team.pendingRequests.findIndex(
        (request) => request.userId.toString() === userId
      );
      if (pendingRequestIndex === -1) {
        return res.status(404).json({ message: "Request not found" });
      }

      const userRequest = team.pendingRequests[pendingRequestIndex];

      team.pendingRequests.splice(pendingRequestIndex, 1);

      const isAlreadyMember = team.members.some(
        (member) => member.userId.toString() === userId
      );
      if (isAlreadyMember) {
        return res
          .status(400)
          .json({ message: "User is already a member of the team." });
      }

      team.members.push({
        userId: userRequest.userId,
        userName: userRequest.userName,
        joinedAt: new Date(),
      });

      await team.save();

      res.status(200).json({ message: "Request accepted successfully", team });
    } catch (error) {
      console.error("Error accepting request:", error);
      res.status(500).json({ error: "Failed to accept request" });
    }
  }
);

router.put(
  "/removeMember/:teamId/:userId",
  authenticateToken,
  async (req, res) => {
    try {
      const { teamId, userId } = req.params;

      const team = await HackmateTeam.findById(teamId);
      if (!team) {
        res.status(404).json({ message: "Team not found" });
      }

      const memberIndex = team.members.findIndex(
        (member) => member.userId.toString() === userId
      );
      if (memberIndex === -1) {
        return res.status(404).json({ message: "Member not found" });
      }

      team.members.splice(memberIndex, 1);
      await team.save();
      res.status(200).json({ message: "Member removed successfully" });
    } catch (error) {
      console.error("Error removing member:", error);
      res.status(500).json({ error: "Failed to remove member" });
    }
  }
);

router.get("/joinedHackmate/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const teams = await Team.find({
      members: { $elemMatch: { userId } },
      admin: { $ne: userId },
    });

    if (teams.length === 0) {
      return res.status(400).json({ message: "No teams found." });
    }

    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ message: "Failed to fetch teams.", error });
  }
});

router.put(
  "/leaveTeam/:teamId/:userId",
  authenticateToken,
  async (req, res) => {
    try {
      const { teamId, userId } = req.params;

      const team = await HackmateTeam.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      const memberIndex = team.members.findIndex(
        (member) => member.userId.toString() === userId
      );
      if (memberIndex === -1) {
        return res
          .status(404)
          .json({ message: "User is not a member of the team" });
      }

      team.members.splice(memberIndex, 1);
      await team.save();

      res.status(200).json({ message: "You have left the team successfully" });
    } catch (error) {
      console.error("Error leaving team:", error);
      res.status(500).json({ error: "Failed to leave team" });
    }
  }
);

module.exports = router;
