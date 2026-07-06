import pool from "../db/db.js";

export async function logActivity(action, message, user_id = null) {
  try {
    await pool.query(
      `INSERT INTO activity_logs (action, message, user_id)
       VALUES ($1, $2, $3)`,
      [action, message, user_id]
    );
  } catch (err) {
    console.error("Activity log error:", err.message);
  }
}