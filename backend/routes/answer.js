import express from "express";
import pool from "../db/db.js";
import calculateScore from "../utils/calculateScore.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Submit answer
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { ass_id, question_id, answer_text, answer_value } = req.body;

    if (!ass_id || !question_id) {
      return res.status(400).json({
        message: "ass_id and question_id are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO answer
        (ass_id, question_id, answer_text, answer_value)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (ass_id, question_id)
       DO UPDATE SET
         answer_text = EXCLUDED.answer_text,
         answer_value = EXCLUDED.answer_value
       RETURNING *`,
      [ass_id, question_id, answer_text, answer_value],
    );

    await calculateScore(ass_id);

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Submit answer error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
});

// Get answers by assessment
router.get("/:ass_id", authenticateToken, async (req, res) => {
  try {
    const { ass_id } = req.params;

    const result = await pool.query("SELECT * FROM answer WHERE ass_id = $1", [
      ass_id,
    ]);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Get answers error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
