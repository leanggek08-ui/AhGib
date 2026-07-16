import pool from "../db/db.js";

// SAVE ALL 8 ACADEMIC SCORES AT ONCE
export async function createAcademicScores(req, res) {
    try {
        const { ass_id, scores } = req.body;
        // scores expected shape: { math: 85, khmer: 90, physics: 70, ... }

        if (!ass_id) {
            return res.status(400).json({ error: "ass_id is required" });
        }
        if (!scores || typeof scores !== "object" || Object.keys(scores).length === 0) {
            return res.status(400).json({ error: "scores object is required" });
        }

        const entries = Object.entries(scores);
        const inserted = [];

        for (const [subject, score_value] of entries) {
            const result = await pool.query(
                `INSERT INTO academic_score (ass_id, subject, score_value)
                 VALUES ($1, $2, $3)
                 ON CONFLICT (ass_id, subject)
                 DO UPDATE SET score_value = EXCLUDED.score_value
                 RETURNING *`,
                [ass_id, subject, score_value]
            );
            inserted.push(result.rows[0]);
        }

        res.json(inserted);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// GET ACADEMIC SCORES FOR AN ASSESSMENT
export async function getAcademicScores(req, res) {
    try {
        const { ass_id } = req.params;

        const result = await pool.query(
            `SELECT * FROM academic_score WHERE ass_id = $1`,
            [ass_id]
        );

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}