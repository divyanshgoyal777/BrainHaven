const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../models/User");

router.get("/allUsers", async (req, res) => { }); // Admin can view all users
router.delete("/deleteUser/:id", async (req, res) => { }); // Admin can delete a user

module.exports = router;