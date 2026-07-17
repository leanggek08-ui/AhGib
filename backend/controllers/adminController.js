import pool from "../db/db.js";

export async function getDashboardStats(req, res) {
  try {
    // total users
    const users = await pool.query("SELECT COUNT(*) FROM users");

    // total questions
    const questions = await pool.query("SELECT COUNT(*) FROM questions");

    // total admins
    const admins = await pool.query(
      "SELECT COUNT(*) FROM users WHERE role_id = 1"
    );

    // total students
    const students = await pool.query(
      "SELECT COUNT(*) FROM users WHERE role_id = 2"
    );

    res.json({
      total_users: parseInt(users.rows[0].count),
      total_questions: parseInt(questions.rows[0].count),
      total_admins: parseInt(admins.rows[0].count),
      total_students: parseInt(students.rows[0].count),
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
