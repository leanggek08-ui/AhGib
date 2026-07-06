import pool from "../db/db.js";

export async function getStats(req, res) {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const questions = await pool.query("SELECT COUNT(*) FROM questions");

    res.json({
      totalUsers: parseInt(users.rows[0].count),
      totalQuestions: parseInt(questions.rows[0].count),
      totalUniversities: 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getActivities(req, res) {
  try {
    const result = await pool.query(`
      SELECT *
      FROM activity_logs
      ORDER BY created_at DESC
      LIMIT 20
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}