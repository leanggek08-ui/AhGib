import pool from "../db/db.js";

/**
 * Get current user's profile
 */
export async function getProfile(req, res) {
  try {
    const result = await pool.query(
      `
      SELECT
        user_id,
        username,
        email,
        role_id
      FROM users
      WHERE user_id = $1
      `,
      [req.user.user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

export async function updateProfile(req, res) {
  try {
    const { username } = req.body;

    if (!username || username.trim() === "") {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    const result = await pool.query(
      `
      UPDATE users
      SET username = $1
      WHERE user_id = $2
      RETURNING user_id, username, email, role_id
      `,
      [username.trim(), req.user.user_id]
    );

    res.json({
      message: "Profile updated successfully",
      user: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}


export async function getAllUsers(req, res) {
  try {
    const result = await pool.query(
      "SELECT user_id, username, email, role_id FROM users ORDER BY user_id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM users WHERE user_id = $1", [id]);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}