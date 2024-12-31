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
  codeItems: [
    {
      codeImageUrl: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
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
