const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  primaryCategory: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  topic:{
    type: String,
    required: true,
  },
  codeItems: [
    {
      title: {
        type: String,
        required: true,
      },
      code: [
        {
          language: { type: String, required: true },
          snippet: { type: String, required: true },
        },
      ],
      description: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;
