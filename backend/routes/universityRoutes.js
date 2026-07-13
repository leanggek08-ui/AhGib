import express from "express";

import {
  getAllUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} from "../controllers/universityController.js";

import { authenticateToken } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Everyone can view
router.get("/", authenticateToken, getAllUniversities);

router.get("/:id", authenticateToken, getUniversityById);

// Admin & Super Admin only
router.post("/", authenticateToken, allowRoles(1, 3), createUniversity);

router.put("/:id", authenticateToken, allowRoles(1, 3), updateUniversity);

router.delete("/:id",authenticateToken, allowRoles(1, 3), deleteUniversity);

export default router;