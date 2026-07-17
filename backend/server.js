import express from "express";
import cors from "cors"; // allow frontend (ex:port 3000) to talk to backend port 5000
import authRoutes from "./routes/auth.js"; // connect auth route to server
import authenticateToken from "./middlewares/authMiddleware.js";
import questionRoutes from "./routes/question.js"; // connect queation to server
import assessmentRoutes from "./routes/assessment.js"; 
import answerRoutes from "./routes/answer.js";
import scoreRoutes from "./routes/score.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import dashboardRoutes from "./routes/dashboard.js";
import universityRoutes from "./routes/universityRoutes.js";
import majorRoutes from "./routes/majorRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import uniMajorRoutes from "./routes/uniMajorRoutes.js";
import careerSkillRoutes from "./routes/careerSkillRoutes.js";
import majorCareerRoutes from "./routes/majorCareerRoutes.js";
import academicScoreRoutes from "./routes/academicScore.js";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js";
import pool from "./db/db.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.originalUrl}`);
  next();
});
app.use("/auth", authRoutes);
app.use("/assessments", assessmentRoutes);
app.use("/questions", questionRoutes);
app.use("/api/universities", universityRoutes);
app.use("/major", majorRoutes);
app.use("/career", careerRoutes);
app.use("/answers", answerRoutes);
app.use("/score", scoreRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/uni-major", uniMajorRoutes);
app.use( "/career-skill", careerSkillRoutes);
app.use("/major-career", majorCareerRoutes);
app.use("/academic-scores", academicScoreRoutes);
app.use("/api/ai", aiRoutes);



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

app.use((req, res) => {
  res.status(404).json({ message: `API route not found: ${req.method} ${req.path}` });
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ message: "Invalid JSON request body" });
  }

  console.error("Unhandled API error:", error);
  return res.status(500).json({ message: "Internal server error" });
});

async function startServer() {
  try {
    await pool.query("SELECT 1");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (database connected)`);
      console.log(`University API: http://localhost:${PORT}/api/universities`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exitCode = 1;
  }
}

startServer();
