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
import aiRoutes from "./routes/ai.js";
import pool from "./db/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/assessment", assessmentRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/score", scoreRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database connected successfully",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ error: "Invalid JSON request body" });
  }

  return next(error);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
