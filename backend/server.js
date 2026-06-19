const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const applicationRoutes = require("./routes/applicationRoutes");
const authRoutes = require("./routes/authRoutes");
const analyzerRoutes = require("./routes/analyzerRoutes");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/analyzer", analyzerRoutes);

app.get("/", (req, res) => {
  res.send("Intern Pilot API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});