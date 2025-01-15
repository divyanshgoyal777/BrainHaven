const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const HackmateTeam = require("../models/HackmateTeam");

router.get("/createTeam", authenticateToken, async (req, res) => {});

router.put("/editTeam", authenticateToken, async (req, res) => {});

router.put("/sendTeamJoinRequest", authenticateToken, async (req, res) => {});

router.put("/acceptTeamJoinRequest", authenticateToken, async (req, res) => {});

// Router Delete Hackmate Team is in admin

module.exports = router;
