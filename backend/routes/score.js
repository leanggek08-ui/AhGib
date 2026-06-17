const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// CREATE score
router.post("/", async (req, res) => {
    try {
        const { ass_id, subject, score_value } = req.body;

        const result = await pool.query(
            "INSERT INTO score (ass_id, subject, score_value) VALUES ($1, $2, $3) RETURNING *",
            [ass_id, subject, score_value]
        );

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET score by assessment
router.get("/:ass_id", async (req, res) => {
    try {
        const { ass_id } = req.params;

        const result = await pool.query(
            "SELECT * FROM score WHERE ass_id = $1",
            [ass_id]
        );

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;