const express = require("express");
const router = express.Router();
require("dotenv").config();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v4: uuidv4 } = require("uuid");
const Resource = require("../models/Resource");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_RESOURCES_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_RESOURCES_API_KEY,
  api_secret: process.env.CLOUDINARY_RESOURCES_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resources",
    format: async () => "pdf",
    public_id: () => uuidv4(),
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("resourceFile"), async (req, res) => {
  const { degree, branch, semester, subject, type, pages } = req.body;
  const file = req.file;

  if (!file) return res.status(400).send("No File Uploaded.");
  if (!degree || !branch || !semester || !subject || !type || !pages) {
    return res.status(400).send("All Categories are Required.");
  }

  try {
    const newResource = new Resource({
      degree,
      branch,
      semester,
      subject,
      type,
      pages,
      cloudinary_url: file.path,
    });

    await newResource.save();
    res.status(200).send({ message: "File Uploaded Successfully", file: newResource });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error: Unable to Save File.");
  }
});

router.get("/options", async (req, res) => {
  try {
    const degrees = await Resource.distinct('degree');
    const branches = await Resource.aggregate([
      { $group: { _id: '$degree', branches: { $addToSet: '$branch' } } }
    ]);
    const semesters = await Resource.aggregate([
      { $group: { _id: '$degree', semesters: { $addToSet: '$semester' } } }
    ]);
    const subjects = await Resource.aggregate([
      { $group: { _id: '$branch', subjects: { $addToSet: '$subject' } } }
    ]);
    const types = await Resource.distinct('type');

    res.status(200).json({
      degrees,
      branches: branches.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.branches }), {}),
      semesters: semesters.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.semesters }), {}),
      subjects: subjects.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.subjects }), {}),
      types
    });
  } catch (err) {
    console.error("Error fetching options:", err);
    res.status(500).send("Server Error: Unable to Fetch Options.");
  }
});

router.get("/search", async (req, res) => {
  const { degree, branch, semester, subject, type } = req.query;
  const query = {};

  if (degree) query.degree = degree;
  if (branch) query.branch = branch;
  if (semester) query.semester = semester;
  if (subject) query.subject = subject;
  if (type) query.type = type;

  try {
    const files = await Resource.find(query);
    if (!files.length) {
      return res.status(404).send("No Resources Found.");
    }
    res.status(200).send(files);
  } catch (err) {
    res.status(500).send("Server Error: Unable to Fetch Resources.");
  }
});

module.exports = router;
