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
      SELECT
      activity_logs.id,
      activity_logs.action,
      activity_logs.message,
      users.username,
      activity_logs.created_at
    FROM activity_logs
    LEFT JOIN users
    ON activity_logs.user_id = users.user_id
    ORDER BY activity_logs.created_at DESC;
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}