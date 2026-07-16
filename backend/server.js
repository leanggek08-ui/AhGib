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
import answerRoutes from "./routes/answer.js";
import scoreRoutes from "./routes/score.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import dashboardRoutes from "./routes/dashboard.js";
import universityRoutes from "./routes/universityRoutes.js";
import aiRoutes from "./routes/ai.js";
import pool from "./db/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const pool = require("./db/db");
const PORT = process.env.APP_PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/assessment", assessmentRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/score", scoreRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/ai", aiRoutes);

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
