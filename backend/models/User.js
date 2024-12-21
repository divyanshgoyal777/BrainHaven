const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String, // Changed to String to accommodate validation regex
      default: "",
      match: [/^\d{10,15}$/, "Please enter a valid phone number"],
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
    socialLinks: {
      instagram: {
        type: String,
        default: "",
        match: [
          /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
          "Please enter a valid Instagram URL",
        ],
      },
      linkedIn: {
        type: String,
        default: "",
        match: [
          /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
          "Please enter a valid LinkedIn URL",
        ],
      },
      github: {
        type: String,
        default: "",
        match: [
          /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/?$/,
          "Please enter a valid GitHub URL",
        ],
      },
    },
    collegeName: {
      type: String,
      default: "",
      trim: true,
    },
    degree: {
      type: String,
      default: "",
      trim: true,
    },
    branch: {
      type: String,
      default: "",
      trim: true,
    },
    semester: {
      type: String,
      default: "",
      match: [/^\d{1,2}$/, "Semester must be a valid number (e.g., 1-12)"],
    },
    rollNumber: {
      type: String,
      default: "",
      match: [/^\d{4,10}$/, "Roll number must be between 4 and 10 digits"],
    },
    dateOfBirth: {
      type: String,
      default: "",
      match: [
        /^\d{4}-\d{2}-\d{2}$/,
        "Date of birth must be in the format YYYY-MM-DD",
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
