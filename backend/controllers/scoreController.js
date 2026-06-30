import pool from "../db/db.js";
import { calculateScore } from "../services/scoreService.js";
// MANUAL CALCULATION (IMPORTANT)
export async function runScore(req, res) {
    try {
        const { ass_id } = req.params;

        await calculateScore(ass_id);

        const result = await pool.query(
            `SELECT * FROM score WHERE ass_id = $1`,
            [ass_id]
        );

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}