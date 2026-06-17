const express = require("express");
const cors = require("cors"); // allow frontend (ex:port 3000) to talk to backend port 5000
const authRoutes = require("./routes/auth"); // connect auth route to server
const authenticateToken = require("./middlewares/authMiddleware");
const questionRoutes = require("./routes/question"); // connect queation to server
const assessmentRoutes = require("./routes/assessment"); 
const answerRoutes = require("./routes/answer");
const scoreRoutes = require("./routes/score");
const app = express();
const pool = require("./db/db");

require("dotenv").config();



app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/assessment", assessmentRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/score", scoreRoutes);


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