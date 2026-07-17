import pool from "../db/db.js";
import { logActivity } from "../utils/activityLogger.js";

// Get all relationships
export async function getAllMajorCareers(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        mc.major_career_id,
        mc.major_id,
        m.major_name,
        mc.careers_id,
        c.careers_name

      FROM major_career mc

      JOIN major m
      ON mc.major_id = m.major_id

      JOIN careers c
      ON mc.careers_id = c.careers_id

      ORDER BY m.major_name;
    `);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

// Create relationship
export async function createMajorCareer(req, res) {
  try {
    const {
      major_id,
      careers_id,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO major_career
      (
        major_id,
        careers_id
      )
      VALUES
      ($1,$2)
      RETURNING *
      `,
      [
        major_id,
        careers_id,
      ]
    );

    await logActivity(
      "major_career_create",
      "Major assigned to Career",
      req.user.user_id
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

// Update relationship
export async function updateMajorCareer(req, res) {
  try {

    const { id } = req.params;

    const {
      major_id,
      careers_id,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE major_career

      SET
        major_id=$1,
        careers_id=$2

      WHERE major_career_id=$3

      RETURNING *
      `,
      [
        major_id,
        careers_id,
        id,
      ]
    );

    await logActivity(
      "major_career_update",
      "Updated Major-Career relationship",
      req.user.user_id
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

// Delete relationship
export async function deleteMajorCareer(req, res) {
  try {

    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM major_career
      WHERE major_career_id=$1
      `,
      [id]
    );

    await logActivity(
      "major_career_delete",
      "Deleted Major-Career relationship",
      req.user.user_id
    );

    res.json({
      message: "Relationship deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
