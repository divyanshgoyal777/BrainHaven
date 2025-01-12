const express = require("express");
const router = express.Router();
require("dotenv").config();
const Code = require("../models/Code");
const authenticateToken = require("../middleware/authenticateToken");

// Middleware to parse JSON bodies
router.use(express.json());

router.post('/upload', authenticateToken, async (req, res) => {
  try {
    // Log the incoming request body for debugging
    console.log("Received Request Body:", req.body);

    const { primaryCategory, subCategory, codeItems } = req.body;

    // Check if codeItems is an array
    if (!Array.isArray(codeItems)) {
      return res.status(400).json({
        error: "'codeItems' should be an array.",
      });
    }

    // Validate codeItems and each code snippet
    for (const item of codeItems) {
      if (typeof item.title !== 'string' || typeof item.description !== 'string') {
        return res.status(400).json({
          error: `"title" and "description" must be strings for each code item.`,
        });
      }

      if (!Array.isArray(item.code)) {
        return res.status(400).json({
          error: `"code" must be an array for each code item.`,
        });
      }

      for (const snippet of item.code) {
        if (typeof snippet.language !== 'string' || typeof snippet.snippet !== 'string') {
          return res.status(400).json({
            error: `Each "code" snippet must have both "language" and "snippet" as strings.`,
          });
        }
      }
    }

    // Create and save the new Code document
    const newCode = new Code({
      primaryCategory,
      subCategory,
      codeItems,
    });

    await newCode.save();

    res.status(200).json({ message: "Data uploaded successfully!" });
  } catch (error) {
    console.error("Error during upload:", error.message);
    res.status(500).json({
      error: "Failed to upload data.",
      details: error.message,
    });
  }
});


router.get("/codeSearch", authenticateToken, async (req, res) => {
  const { primaryCategory, subCategory } = req.query;
  const query = {};

  if (primaryCategory) query.primaryCategory = primaryCategory;
  if (subCategory) query.subCategory = subCategory;

  try {
    const files = await Code.find(query);
    if (!files.length) {
      return res.status(404).send("No Resources Found.");
    }
    res.status(200).send(files);
  } catch (err) {
    res.status(500).send("Server Error: Unable to Fetch Resources.");
  }
});

router.get("/categories", authenticateToken, async (req, res) => {
  try {
    const categories = await Code.aggregate([
      {
        $group: {
          _id: "$primaryCategory",
          subCategories: { $addToSet: "$subCategory" },
        },
      },
      {
        $project: {
          _id: 0,
          primaryCategory: "$_id",
          subCategories: 1,
        },
      },
    ]);

    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found." });
    }

    const categoryMap = categories.reduce(
      (acc, { primaryCategory, subCategories }) => {
        acc[primaryCategory] = subCategories;
        return acc;
      },
      {}
    );

    res.status(200).json(categoryMap);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Server Error: Unable to fetch categories.",
        details: error.message,
      });
  }
});

module.exports = router;
