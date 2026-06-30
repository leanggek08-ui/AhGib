import pool from "../db/db.js";

export const calculateScore = async (ass_id) => {
  try {
    const result = await pool.query(
      `
      SELECT q.subject, SUM(a.answer_value) AS score
      FROM answer a
      JOIN question q ON q.question_id = a.question_id
      WHERE a.ass_id = $1
      GROUP BY q.subject
      `,
      [ass_id]
    );

    for (const row of result.rows) {
      await pool.query(
        `
        INSERT INTO score (ass_id, subject, score_value)
        VALUES ($1, $2, $3)
        ON CONFLICT (ass_id, subject)
        DO UPDATE SET score_value = EXCLUDED.score_value
        `,
        [ass_id, row.subject, row.score]
      );
    }
  } catch (err) {
    console.error("Score calculation error:", err.message);
  }
};