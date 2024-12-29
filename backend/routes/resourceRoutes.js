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
  const { degree, branch, semester, subject, type, pages, videoLinks } = req.body;
  const file = req.file;

  if (!degree || !branch || !semester || !subject || !type) {
    return res.status(400).send("All Categories (degree, branch, semester, subject, type) are required.");
  }

  if (type !== "Tutorials" && !pages) {
    return res.status(400).send("Pages are required for non-tutorial resources.");
  }

  if (type !== "Tutorials" && !file) {
    return res.status(400).send("No file uploaded. File is required for non-tutorial resources.");
  }

  try {
    if (type === "Tutorials") {
      if (!videoLinks) {
        return res.status(400).send("Video links are required for tutorial resources.");
      }

      console.log("Video Links Received:", videoLinks); 

      const existingTutorial = await Resource.findOne({
        degree,
        branch,
        semester,
        subject,
        type,
      });

      if (existingTutorial) {
        return res.status(400).json({
          message: "A tutorial with the same details already exists.",
          exists: true,
        });
      }

      const videoLinksArray = videoLinks.split(",");  

      const tutorialResource = new Resource({
        degree,
        branch,
        semester,
        subject,
        type,
        videoLinks: videoLinksArray,  
      });

      await tutorialResource.save();
      return res.status(200).send({
        message: "Tutorial uploaded successfully.",
        resource: tutorialResource,
      });
    }

    if (!file || !file.path) {
      return res.status(400).send("No file uploaded. File is required for non-tutorial resources.");
    }

    const cloudinary_url = file.path;

    const existingResource = await Resource.findOne({
      degree,
      branch,
      subject,
      semester,
      type,
    });

    if (existingResource) {
      return res.status(400).json({
        message: "A resource with the same details already exists.",
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
      cloudinary_url,  
    });

    await newResource.save();
    return res.status(200).send({
      message: "File uploaded successfully.",
      file: newResource,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error: Unable to save file.");
  }
});


router.post("/replace", upload.single("resourceFile"), async (req, res) => {
  const { degree, branch, semester, subject, type, pages, videoLinks } = req.body;
  const file = req.file;

  // Validate required fields for all types
  if (!degree || !branch || !semester || !subject || !type) {
    return res.status(400).send("All categories (degree, branch, semester, subject, type) are required.");
  }

  // Validate fields specific to non-tutorial types
  if (type !== "Tutorials" && (!pages || !file)) {
    return res.status(400).send(
      `Pages and a file are required for non-tutorial resources. Missing: ${
        !pages ? "pages" : "file"
      }.`
    );
  }

  // Validate fields specific to tutorials
  if (type === "Tutorials" && (!videoLinks || videoLinks.trim() === "")) {
    return res.status(400).send("Video links are required for tutorial resources.");
  }

  try {
    // Check if the resource already exists
    const existingResource = await Resource.findOne({
      degree,
      branch,
      semester,
      subject,
      type,
    });

    if (existingResource) {
      await existingResource.deleteOne();
      console.log("Existing resource deleted.");
    }

    // Create new resource based on type
    if (type === "Tutorials") {
      const videoLinksArray = videoLinks.split(",").map((link) => link.trim()); // Split and trim video links
      const newTutorial = new Resource({
        degree,
        branch,
        semester,
        subject,
        type,
        videoLinks: videoLinksArray,
      });
      await newTutorial.save();
      res.status(200).send("Tutorial resource replaced successfully!");
    } else {
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
      res.status(200).send("Non-tutorial resource replaced successfully!");
    }
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
