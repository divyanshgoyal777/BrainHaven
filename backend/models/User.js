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
    bio: {
      type: String,
      default: "",
      trim: true, 
    },
    phoneNumber: {
      type: String,
      default: "",
      match: [/^\d{10,15}$/, "Please enter a valid phone number"], 
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedIn: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
