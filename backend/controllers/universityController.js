import pool from "../db/db.js";
import { logActivity } from "../utils/activityLogger.js";

// Get all universities
export async function getAllUniversities(req, res) {
  try {
    const result = await pool.query(
      `SELECT *
       FROM universities
       ORDER BY university_id ASC`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

// Get one university
export async function getUniversityById(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM universities
       WHERE university_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "University not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

// Create university
export async function createUniversity(req, res) {
  try {
    const { name, location, website } = req.body;

    const result = await pool.query(
      `INSERT INTO universities
      (name, location, website)
      VALUES ($1,$2,$3)
      RETURNING *`,
      [name, location, website]
    );

    await logActivity(
      "create_university",
      `University "${name}" created`,
      req.user.user_id
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

// Update university
export async function updateUniversity(req, res) {
  try {
    const { id } = req.params;
    const { name, location, website } = req.body;

    const result = await pool.query(
      `UPDATE universities
       SET
       name=$1,
       location=$2,
       website=$3
       WHERE university_id=$4
       RETURNING *`,
      [name, location, website, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "University not found",
      });
    }

    await logActivity(
      "update_university",
      `University "${name}" updated`,
      req.user.user_id
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

// Delete university
export async function deleteUniversity(req, res) {
  try {
    const { id } = req.params;

    await pool.query(
      `DELETE FROM universities
       WHERE university_id=$1`,
      [id]
    );

    await logActivity(
      "delete_university",
      `University ID ${id} deleted`,
      req.user.user_id
    );

    res.json({
      message: "University deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}