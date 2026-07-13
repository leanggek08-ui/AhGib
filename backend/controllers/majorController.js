import pool from "../db/db.js";
import { logActivity } from "../utils/activityLogger.js";

// Get all majors
export async function getAllMajors(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM major ORDER BY major_id ASC"
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Create major
export async function createMajor(req, res) {
  try {
    const { major_name, field_of_study } = req.body;

    const result = await pool.query(
      `
      INSERT INTO major
      (major_name, field_of_study)
      VALUES ($1,$2)
      RETURNING *
      `,
      [major_name, field_of_study]
    );

    await logActivity(
      "major_create",
      `Major "${major_name}" created`,
      req.user.user_id
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update major
export async function updateMajor(req, res) {
  try {
    const { id } = req.params;
    const { major_name, field_of_study } = req.body;

    const result = await pool.query(
      `
      UPDATE major
      SET
      major_name=$1,
      field_of_study=$2
      WHERE major_id=$3
      RETURNING *
      `,
      [major_name, field_of_study, id]
    );

    await logActivity(
      "major_update",
      `Major "${major_name}" updated`,
      req.user.user_id
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete major
export async function deleteMajor(req, res) {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM major WHERE major_id=$1",
      [id]
    );

    await logActivity(
      "major_delete",
      `Major ID ${id} deleted`,
      req.user.user_id
    );

    res.json({
      message: "Major deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}