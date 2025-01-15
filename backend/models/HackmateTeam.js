const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adminName: {
    type: String,
    required: true,
  },
  maxSize: {
    type: Number,
    required: true,
  },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      userName: {
        type: String,
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  pendingRequests: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      userName: {
        type: String,
      },
      requestedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  skillsRequired: [
    {
      type: String,
    },
  ],
  lookingFor: {
    type: String, // e.g., "Frontend Developer, Backend Developer, Designer"
  },
  teamNeeds: {
    type: String, // Detailed explanation of what the team is looking for
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Team", teamSchema);
