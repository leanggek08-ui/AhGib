const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const calculateScore = require("../utils/calculateScore");// Submit answer
router.post("/", async (req, res) => {
    try {
        const { ass_id, question_id, answer_text, answer_value } = req.body;

        const result = await pool.query(
            `INSERT INTO answer
            (ass_id, question_id, answer_text, answer_value)
            VALUES ($1,$2,$3,$4)
            RETURNING *`,
            [ass_id, question_id, answer_text, answer_value]
        );

        // 🔥 AUTO CALCULATE SCORE HERE
        await calculateScore(ass_id);

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get answers by assessment
router.get("/:ass_id", async (req, res) => {
    try {
        const { ass_id } = req.params;

        const result = await pool.query(
            "SELECT * FROM answer WHERE ass_id = $1",
            [ass_id]
        );

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;