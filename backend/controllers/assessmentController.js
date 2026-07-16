import pool from "../db/db.js";
import { calculateScore } from "../services/scoreService.js";

// CREATE ASSESSMENT
export async function createAssessment(req, res) {
    try {
        const { user_id } = req.body;

        const result = await pool.query(
            `INSERT INTO assessments (user_id, status)
             VALUES ($1, 'in_progress')
             RETURNING *`,
            [user_id]
        );

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// GET BY USER
export async function getAssessment(req, res) {
    try {
        const { user_id } = req.params;

        const result = await pool.query(
            `SELECT * FROM assessments WHERE user_id = $1`,
            [user_id]
        );

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// COMPLETE ASSESSMENT — call this when student finishes the personality test
export async function completeAssessment(req, res) {
    try {
        const { ass_id } = req.params;

        // Mark assessment as completed
        const updated = await pool.query(
            `UPDATE assessments
             SET status = 'completed'
             WHERE ass_id = $1
             RETURNING *`,
            [ass_id]
        );

        if (updated.rows.length === 0) {
            return res.status(404).json({ error: "Assessment not found" });
        }

        // Run scoring once, now that all answers are in
        await calculateScore(ass_id);

        const score = await pool.query(
            `SELECT * FROM score WHERE ass_id = $1`,
            [ass_id]
        );

        res.json({
            assessment: updated.rows[0],
            score: score.rows,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}