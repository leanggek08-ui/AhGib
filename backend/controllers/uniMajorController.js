import pool from "../db/db.js";
import { logActivity } from "../utils/activityLogger.js";

/**
 * Get all University-Major assignments
 */
export async function getAllUniMajors(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        um.uni_major_id,
        um.university_id,
        u.name AS university_name,
        um.major_id,
        m.major_name,
        um.tuition_fee
      FROM uni_major um
      JOIN universities u
        ON um.university_id = u.university_id
      JOIN major m
        ON um.major_id = m.major_id
      ORDER BY u.name, m.major_name
    `);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

/**
 * Create assignment
 */
export async function createUniMajor(req, res) {
  try {
    const {
      university_id,
      major_id,
      tuition_fee,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO uni_major
      (
        university_id,
        major_id,
        tuition_fee
      )
      VALUES
      ($1,$2,$3)
      RETURNING *
      `,
      [
        university_id,
        major_id,
        tuition_fee,
      ]
    );

    await logActivity(
      "uni_major_create",
      `Assigned Major ${major_id} to University ${university_id}`,
      req.user.user_id
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

/**
 * Update assignment
 */
export async function updateUniMajor(req, res) {
  try {

    const { id } = req.params;

    const {
      university_id,
      major_id,
      tuition_fee,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE uni_major
      SET
        university_id = $1,
        major_id = $2,
        tuition_fee = $3
      WHERE uni_major_id = $4
      RETURNING *
      `,
      [
        university_id,
        major_id,
        tuition_fee,
        id,
      ]
    );

    await logActivity(
      "uni_major_update",
      `Updated University-Major Assignment`,
      req.user.user_id
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

/**
 * Delete assignment
 */
export async function deleteUniMajor(req, res) {
  try {

    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM uni_major
      WHERE uni_major_id = $1
      `,
      [id]
    );

    await logActivity(
      "uni_major_delete",
      `Deleted University-Major Assignment`,
      req.user.user_id
    );

    res.json({
      message: "Assignment deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
