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

// Validation middleware for DSA category
codeSchema.pre("save", function (next) {
  const isDSA = this.primaryCategory === "Data Structures and Algorithms (DSA)";
  const requiredLanguages = ["C", "C++", "Java", "Python"];

  if (isDSA) {
    // Ensure every codeItem contains exactly the required languages
    for (const item of this.codeItems) {
      const uploadedLanguages = item.code.map((c) => c.language);
      const missingLanguages = requiredLanguages.filter(
        (lang) => !uploadedLanguages.includes(lang)
      );

      if (missingLanguages.length > 0) {
        return next(
          new Error(
            `Please upload code snippets for the following languages in the code item "${item.title}": ${missingLanguages.join(
              ", "
            )}`
          )
        );
      }

      if (uploadedLanguages.length > requiredLanguages.length) {
        return next(
          new Error(
            `Too many code snippets uploaded for the code item "${item.title}". Only provide snippets for: ${requiredLanguages.join(
              ", "
            )}`
          )
        );
      }
    }
  }

  // Non-DSA: Allow multiple codeItems with flexible code content
  next();
});

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;
