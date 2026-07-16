<<<<<<< HEAD
import express from "express";
import cors from "cors"; // allow frontend (ex:port 3000) to talk to backend port 5000
import authRoutes from "./routes/auth.js"; // connect auth route to server
import authenticateToken from "./middlewares/authMiddleware.js";
import questionRoutes from "./routes/question.js"; // connect queation to server
import assessmentRoutes from "./routes/assessment.js"; 
=======
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors"); // allow frontend (ex:port 3000) to talk to backend port 5000
const authRoutes = require("./routes/auth"); // connect auth route to server
const authenticateToken = require("./middlewares/authMiddleware");
const questionRoutes = require("./routes/question"); // connect queation to server
const assessmentRoutes = require("./routes/assessment");
const answerRoutes = require("./routes/answer");
const scoreRoutes = require("./routes/score");
const aiRoutes = require("./routes/ai");
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import { authenticateToken } from "./middlewares/authMiddleware.js";
import questionRoutes from "./routes/question.js";
import assessmentRoutes from "./routes/assessment.js";
>>>>>>> c76542f1a13ebaf44334a4a51e26cf2124ea161d
import answerRoutes from "./routes/answer.js";
import scoreRoutes from "./routes/score.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import dashboardRoutes from "./routes/dashboard.js";
import universityRoutes from "./routes/universityRoutes.js";
<<<<<<< HEAD
import majorRoutes from "./routes/majorRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import uniMajorRoutes from "./routes/uniMajorRoutes.js";
import careerSkillRoutes from "./routes/careerSkillRoutes.js";
import majorCareerRoutes from "./routes/majorCareerRoutes.js";
import dotenv from "dotenv";
import pool from "./db/db.js";
const app = express();


dotenv.config();

=======
import aiRoutes from "./routes/ai.js";
import pool from "./db/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const pool = require("./db/db");
const PORT = process.env.APP_PORT || 5000;
>>>>>>> c76542f1a13ebaf44334a4a51e26cf2124ea161d

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/assessments", assessmentRoutes);
app.use("/questions", questionRoutes);
app.use("/universities", universityRoutes);
app.use("/major", majorRoutes);
app.use("/career", careerRoutes);
app.use("/answers", answerRoutes);
app.use("/score", scoreRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/dashboard", dashboardRoutes);
<<<<<<< HEAD
app.use("/uni-major", uniMajorRoutes);
app.use( "/career-skill", careerSkillRoutes);
app.use("/major-career", majorCareerRoutes);


=======
app.use("/ai", aiRoutes);
>>>>>>> c76542f1a13ebaf44334a4a51e26cf2124ea161d

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// test database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
