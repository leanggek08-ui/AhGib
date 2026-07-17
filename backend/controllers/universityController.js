import pool from "../db/db.js";
import { logActivity } from "../utils/activityLogger.js";

export async function getAllUniversities(req, res) {
  try {
    const result = await pool.query(
      `SELECT university_id, name, location, website
       FROM public.universities
       ORDER BY university_id ASC`,
    );
    console.log(`[Universities] Returned ${result.rowCount} universities`);
    return res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("[Universities] Failed to fetch universities:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load universities",
    });
  }
}

export async function getUniversityById(req, res) {
  try {
    const result = await pool.query(
      `SELECT university_id, name, location, website
       FROM public.universities
       WHERE university_id = $1`,
      [req.params.id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "University not found" });
    }
    return res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("[Universities] Failed to fetch university:", error);
    return res.status(500).json({ success: false, message: "Failed to load university" });
  }
}

export async function createUniversity(req, res) {
  try {
    const { name, location, website } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ success: false, message: "University name is required" });
    }
    const result = await pool.query(
      `INSERT INTO public.universities (name, location, website)
       VALUES ($1, $2, $3) RETURNING *`,
      [name.trim(), location, website],
    );
    await logActivity("create_university", `University "${name}" created`, req.user.user_id);
    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("[Universities] Failed to create university:", error);
    return res.status(500).json({ success: false, message: "Failed to create university" });
  }
}

export async function updateUniversity(req, res) {
  try {
    const { name, location, website } = req.body;
    const result = await pool.query(
      `UPDATE public.universities SET name = $1, location = $2, website = $3
       WHERE university_id = $4 RETURNING *`,
      [name, location, website, req.params.id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "University not found" });
    }
    await logActivity("update_university", `University "${name}" updated`, req.user.user_id);
    return res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("[Universities] Failed to update university:", error);
    return res.status(500).json({ success: false, message: "Failed to update university" });
  }
}

export async function deleteUniversity(req, res) {
  try {
    const result = await pool.query(
      "DELETE FROM public.universities WHERE university_id = $1 RETURNING university_id",
      [req.params.id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "University not found" });
    }
    await logActivity("delete_university", `University ID ${req.params.id} deleted`, req.user.user_id);
    return res.json({ success: true, message: "University deleted successfully" });
  } catch (error) {
    console.error("[Universities] Failed to delete university:", error);
    return res.status(500).json({ success: false, message: "Failed to delete university" });
  }
}
