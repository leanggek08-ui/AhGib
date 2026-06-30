import pool from "../db/db.js";
import { calculateScore } from "../services/scoreService.js";
export const createAnswer = async (req, res) => {
  const { ass_id, question_id, answer_text, answer_value } = req.body;

  if (!ass_id) {
    return res.status(400).json({ error: "ass_id is required" });
  }

  if (!question_id) {
    return res.status(400).json({ error: "question_id is required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO answer (ass_id, question_id, answer_text, answer_value)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [ass_id, question_id, answer_text, answer_value]
    );

    // auto score
    await calculateScore(ass_id);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};