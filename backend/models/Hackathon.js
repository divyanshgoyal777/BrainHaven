const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isOnline: { type: Boolean, required: true },
    location: {
      type: String,
      required: function () {
        return !this.isOnline;
      },
    },
    timing: { type: String, required: true },
    prizeMoney: { type: Number, required: true },
    teamSizeMax: { type: Number, required: true },
    registerByDate: { type: Date, required: true },
    categories: { type: [String], required: true },
    eligibilityCriteria: { type: String, required: true },
    registrationLink: { type: String, required: true },

  },
  { timestamps: true }
);

const Hackathon = mongoose.model("Hackathon", hackathonSchema);

module.exports = Hackathon;
