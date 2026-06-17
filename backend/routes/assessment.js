const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// Create assessment
router.post("/", async (req, res) => {
    try {
        const { user_id } = req.body;

        const result = await pool.query(
            "INSERT INTO assessments (user_id, status) VALUES ($1, $2) RETURNING *",
            [user_id, "in_progress"]
        );

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;