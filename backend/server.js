const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

console.log("Environment variables:", process.env.MONGODB_URI);

if (!process.env.MONGODB_URI) {
  console.error("MongoDB URI is undefined. Check your .env file.");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send("Hello World");
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});