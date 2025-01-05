const express = require("express");
const router = express.Router();
require("dotenv").config();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v4: uuidv4 } = require("uuid");
const Code = require("../models/Code");
const authenticateToken = require("../middleware/authenticateToken");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_RESOURCES_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_RESOURCES_API_KEY,
  api_secret: process.env.CLOUDINARY_RESOURCES_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "codes",
    format: async () => "jpg",
    public_id: () => uuidv4(),
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  authenticateToken,
  upload.array("codeImageUrl"),
  async (req, res) => {
    try {
      console.log("Request body:", req.body);
      console.log("Uploaded files:", req.files);

      const { primaryCategory, subCategory, replace } = req.body;

      if (!primaryCategory || !subCategory) {
        return res
          .status(400)
          .json({ error: "Primary category and subcategory are required." });
      }

      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ error: "At least one code image is required." });
      }

      const codeArray = Array.isArray(req.body.code)
        ? req.body.code
        : [req.body.code];
      const descriptionArray = Array.isArray(req.body.description)
        ? req.body.description
        : [req.body.description];

      const existingCode = await Code.findOne({ primaryCategory, subCategory });

      if (existingCode && !replace) {
        return res.status(400).json({
          error: "Code details already exist.",
          data: existingCode,
        });
      }

      if (existingCode && replace) {
        await existingCode.deleteOne();
        console.log("Existing code deleted.");
      }

      const codeItems = req.files.map((file, index) => ({
        codeImageUrl: file.path,
        code: codeArray[index],
        description: descriptionArray[index],
      }));

      const newCode = new Code({
        primaryCategory,
        subCategory,
        codeItems,
      });

      await newCode.save();

      res.status(200).json({
        message: replace
          ? "Code replaced successfully!"
          : "Data and images uploaded successfully!",
        data: newCode,
      });
    } catch (error) {
      console.error("Error during upload:", error.message, error.stack);
      res
        .status(500)
        .json({
          error: "Failed to upload data and images",
          details: error.message,
        });
    }
  }
);

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
