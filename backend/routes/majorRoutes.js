import express from "express";

import {
  getAllMajors,
  createMajor,
  updateMajor,
  deleteMajor,
} from "../controllers/majorController.js";

import authenticateToken from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  getAllMajors
);

router.post(
  "/",
  authenticateToken,
  allowRoles(1,3),
  createMajor
);

router.put(
  "/:id",
  authenticateToken,
  allowRoles(1,3),
  updateMajor
);

router.delete(
  "/:id",
  authenticateToken,
  allowRoles(1,3),
  deleteMajor
);

export default router;