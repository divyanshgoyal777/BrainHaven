const mongoose = require("mongoose");

const hackmateChatSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  messages: [
    {
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      senderName: { type: String, required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const HackmateChat = mongoose.model("HackmateChat", hackmateChatSchema);

module.exports = HackmateChat;
