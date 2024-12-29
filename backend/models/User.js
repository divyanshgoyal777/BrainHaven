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
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
      type: String,
      default: "",
      match: /^\d{10,15}$/,
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
        match: /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
      },
      linkedIn: {
        type: String,
        default: "",
        match: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
      },
      github: {
        type: String,
        default: "",
        match: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/?$/,
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
      match: /^\d{1,2}$/,
    },
    rollNumber: {
      type: String,
      default: "",
      match: /^\d{4,10}$/,
    },
    dateOfBirth: {
      type: String,
      default: "",
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    skills: {
      type: [String],
      default: [],
    },
    achievements: {
      type: [String],
      default: [],
    },
    experience: [
      {
        companyName: { type: String, trim: true },
        role: { type: String, trim: true },
        duration: { type: String, trim: true },
        description: { type: String, trim: true, default: "" },
      },
    ],
    projects: [
      {
        title: { type: String, trim: true },
        description: { type: String, trim: true, default: "" },
        link: { type: String, trim: true, default: "" },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
