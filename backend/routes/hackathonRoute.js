const express = require("express");
const router = express.Router();
const Hackathon = require("../models/Hackathon");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/allHackathon", authenticateToken, async (req, res) => {
  try {
    const hackathon = await Hackathon.find();
    res.json(hackathon);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/uploadHackathon", authenticateToken, async (req, res) => {
  const hackathon = new Hackathon({
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    isOnline: req.body.isOnline,
    location: req.body.location,
    timing: req.body.timing,
    prizeMoney: req.body.prizeMoney,
    teamSizeMax: req.body.teamSizeMax,
    registerByDate: req.body.registerByDate,
    categories: req.body.categories,
    eligibilityCriteria: req.body.eligibilityCriteria,
    registrationLink: req.body.registrationLink,
  });

  try {
    const newHackathon = await hackathon.save();
    res.status(201).json(newHackathon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/editHackathon/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedHackathon = await Hackathon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedHackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }
    res.status(200).json(updatedHackathon);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
