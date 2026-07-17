import pool from "../db/db.js";

export async function logActivity(action, message, userId = null) {
  try {
    await pool.query(
      `INSERT INTO activity_logs (action, message, user_id)
       VALUES ($1, $2, $3)`,
      [action, message, userId],
    );
  } catch (error) {
    console.error("Activity log error:", error.message);
  }
}
