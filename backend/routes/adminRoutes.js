const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../models/User");

router.get("/allUsers", async (req, res) => { }); // Admin can view all users