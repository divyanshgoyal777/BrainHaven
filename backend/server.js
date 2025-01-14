const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const helmet = require("helmet");
require("dotenv").config();
const socket = require("socket.io");
const http = require("http");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = socket(server, { cors: { origin: "*" } });

app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());

connectDB();

io.on("connection", async (socket) => {
  console.log("a user connected", socket.id);
  const messages = await Message.find().sort({ createdAt: 1 });
  socket.emit("previous messages", messages);

  socket.on("group chat message", async (msg) => {
    const newMessage = new Message({
      user: msg.user,
      msg: msg.msg,
      userPic: msg.userPic,
      userId: msg.userId,
      chatType: "group",
    });
    await newMessage.save();
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/resource", require("./routes/resourceRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/messages", require("./routes/chatRoutes"));
app.use("/api/code", require("./routes/codeRoutes"));
app.use("/api/hackathon", require("./routes/hackathonRoute"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
