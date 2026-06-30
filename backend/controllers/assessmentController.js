import pool from "../db/db.js";

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