import express from "express";

import {
  getAllUniMajors,
  createUniMajor,
  updateUniMajor,
  deleteUniMajor,
} from "../controllers/uniMajorController.js";

import authenticateToken from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// View all assignments
router.get(
  "/",
  authenticateToken,
  getAllUniMajors
);

// Create assignment
router.post(
  "/",
  authenticateToken,
  allowRoles(1, 3),
  createUniMajor
);

// Update assignment
router.put(
  "/:id",
  authenticateToken,
  allowRoles(1, 3),
  updateUniMajor
);

// Delete assignment
router.delete(
  "/:id",
  authenticateToken,
  allowRoles(1, 3),
  deleteUniMajor
);

export default router;