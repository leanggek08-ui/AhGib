import express from "express";
import cors from "cors"; // allow frontend (ex:port 3000) to talk to backend port 5000
import authRoutes from "./routes/auth.js"; // connect auth route to server
import { authenticateToken } from "./middlewares/authMiddleware.js";
import questionRoutes from "./routes/question.js"; // connect queation to server
import assessmentRoutes from "./routes/assessment.js"; 
import answerRoutes from "./routes/answer.js";
import scoreRoutes from "./routes/score.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import pool from "./db/db.js";
const app = express();


dotenv.config();


app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/assessments", assessmentRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);
app.use("/score", scoreRoutes);
app.use("/users", userRoutes);


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
        user: req.user
    });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});