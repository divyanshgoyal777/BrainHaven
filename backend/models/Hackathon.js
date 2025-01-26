const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value >= this.startDate;
        },
        message: "End date must be greater than or equal to start date",
      },
    },
    isOnline: {
      type: Boolean,
    },
    location: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          return this.isOnline || value?.length > 0;
        },
        message: "Location is required for offline events",
      },
    },
    teamSizeMax: {
      type: Number,
      min: [1, "Team size must be at least 1"],
    },
    registerByDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value <= this.startDate;
        },
        message: "Registration closing date must be before the start date",
      },
    },
    categories: {
      type: [String],
    },
    registrationLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          return /^https?:\/\/.+/.test(value);
        },
        message: "Registration link must be a valid URL",
      },
    },
  },
  { timestamps: true }
);

const Hackathon = mongoose.model("Hackathon", hackathonSchema);

module.exports = Hackathon;
