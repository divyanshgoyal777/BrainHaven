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
    const resource = await Resource.findOne({
      degree,
      branch,
      subject,
      semester,
      type,
    });

    if (resource) {
      return res.status(400).json({
        message: "Resource with the same details already exists.",
        exists: true,
      });
    }

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
    res.status(200).send({
      message: "File Uploaded Successfully",
      file: newResource,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error: Unable to Save File.");
  }
});

router.post("/replace", upload.single("resourceFile"), async (req, res) => {
  const { degree, branch, semester, subject, type, pages } = req.body;
  const file = req.file;

  // Validate inputs
  if (!file) return res.status(400).send("No File Uploaded.");
  if (!degree || !branch || !semester || !subject || !type || !pages) {
    return res.status(400).send("All Categories are Required.");
  }

  try {
    const resource = await Resource.findOne({
      degree,
      branch,
      subject,
      semester,
      type,
    });

    if (resource) {
      await resource.deleteOne();
      console.log("Existing resource deleted.");
    }

    const newResource = new Resource({
      degree,
      branch,
      subject,
      semester,
      type,
      pages,
      cloudinary_url: file.path,
    });

    await newResource.save();

    res.status(200).send("Resource replaced successfully!");
  } catch (error) {
    console.error("Error in replacing resource:", error);
    res.status(500).send("Failed to replace resource. Please try again.");
  }
});

router.get("/options", async (req, res) => {
  try {
    const { degree, branch, semester, subject } = req.query;

    const degrees = await Resource.distinct("degree");

    const branches = degree
      ? await Resource.aggregate([
          { $match: { degree } },
          { $group: { _id: "$degree", branches: { $addToSet: "$branch" } } },
        ])
      : await Resource.aggregate([
          { $group: { _id: "$degree", branches: { $addToSet: "$branch" } } },
        ]);

    const branchesByDegree = branches.reduce(
      (acc, curr) => ({ ...acc, [curr._id]: curr.branches }),
      {}
    );

    const semesters =
      degree && branch
        ? await Resource.aggregate([
            { $match: { degree, branch } },
            {
              $group: {
                _id: { degree: "$degree", branch: "$branch" },
                semesters: { $addToSet: "$semester" },
              },
            },
          ])
        : await Resource.aggregate([
            {
              $group: {
                _id: { degree: "$degree", branch: "$branch" },
                semesters: { $addToSet: "$semester" },
              },
            },
          ]);

    const semestersByDegreeBranch = semesters.reduce(
      (acc, curr) => ({
        ...acc,
        [`${curr._id.degree}_${curr._id.branch}`]: curr.semesters,
      }),
      {}
    );

    const subjects =
      degree && branch && semester
        ? await Resource.aggregate([
            { $match: { degree, branch, semester } },
            {
              $group: {
                _id: {
                  degree: "$degree",
                  branch: "$branch",
                  semester: "$semester",
                },
                subjects: { $addToSet: "$subject" },
              },
            },
          ])
        : await Resource.aggregate([
            {
              $group: {
                _id: {
                  degree: "$degree",
                  branch: "$branch",
                  semester: "$semester",
                },
                subjects: { $addToSet: "$subject" },
              },
            },
          ]);

    const subjectsByDegreeBranchSemester = subjects.reduce(
      (acc, curr) => ({
        ...acc,
        [`${curr._id.degree}_${curr._id.branch}_${curr._id.semester}`]:
          curr.subjects,
      }),
      {}
    );

    const types = await Resource.aggregate([
      {
        $group: {
          _id: {
            degree: "$degree",
            branch: "$branch",
            semester: "$semester",
            subject: "$subject",
          },
          types: { $addToSet: "$type" },
        },
      },
    ]);

    const typesByDegreeBranchSemesterSubject = types.reduce((acc, curr) => {
      const key = `${curr._id.degree || "all"}_${curr._id.branch || "all"}_${
        curr._id.semester || "all"
      }_${curr._id.subject || "all"}`;
      acc[key] = curr.types;
      return acc;
    }, {});

    res.status(200).json({
      degrees,
      branches: branchesByDegree,
      semesters: semestersByDegreeBranch,
      subjects: subjectsByDegreeBranchSemester,
      types: typesByDegreeBranchSemesterSubject,
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
