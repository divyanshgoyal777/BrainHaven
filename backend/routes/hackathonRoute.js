const express = require('express');
const router = express.Router();
const Hackathon = require('../models/Hackathon');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/search',authenticateToken, async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Example route to create a new hackathon
router.post('/upload', authenticateToken, async (req, res) => {
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

router.put('/editHackathon/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  // Ensure user is authenticateTokend and has admin role
  // Check if the user is authenticateTokend and an admin

  console.log("Attempting to update Hackathon - ID:", id);
  console.log("Request Params - ID:", id);
  console.log("Request Body:", req.body);

  try {
    // Attempt to update the hackathon
    // Find and update the hackathon
    const updatedHackathon = await Hackathon.findByIdAndUpdate(id, req.body, { new: true });

    // Validate if hackathon was found and updated
    // Check if the hackathon exists
    if (!updatedHackathon) {
      console.log(`Hackathon with ID ${id} not found`);
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    console.log("Hackathon updated successfully:", updatedHackathon);
    res.status(200).json(updatedHackathon);
  } catch (error) {
    console.error('Error updating hackathon:', error);

    // Return a detailed error message
    res.status(500).json({ message: error.message || 'Internal server error' });
    res.status(500).json({ message: 'Internal server error' });
  }
});

  

module.exports = router;

