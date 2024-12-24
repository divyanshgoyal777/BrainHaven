const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/resource", require("./routes/resourceRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
