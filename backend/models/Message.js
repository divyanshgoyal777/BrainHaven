const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    msg: { type: String, required: true },
    userPic: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    chatType: { type: String, enum: ["group"], required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
