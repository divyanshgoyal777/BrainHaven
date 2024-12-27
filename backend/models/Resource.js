const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  type: { type: String, required: true },
  pages: { type:String, required:true },
  cloudinary_url: { type: String, required: true },
  uploaded_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resource", resourceSchema);
