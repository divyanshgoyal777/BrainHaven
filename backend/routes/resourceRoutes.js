const express = require("express");
const router = express.Router();
require("dotenv").config();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_RESOURCES_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_RESOURCES_API_KEY,
  api_secret: process.env.CLOUDINARY_RESOURCES_API_SECRET,
});

router.post("/upload", async (req, res) => { }); // Admin can upload resources
router.get("/search", async (req, res) => { }); // User can search resources