const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// CREATE question (Admin)
router.post("/", async (req, res) => {
    try {
        const { question_text, question_type, admin_create_by } = req.body;

        const result = await pool.query(
            "INSERT INTO questions (question_text, question_type, admin_create_by) VALUES ($1, $2, $3) RETURNING *",
            [question_text, question_type, admin_create_by]
        );

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all questions (Student)
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM questions ORDER BY question_id ASC"
        );

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM questions WHERE question_id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;