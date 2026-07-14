import express from "express";

import {
  getAllMajorCareers,
  createMajorCareer,
  updateMajorCareer,
  deleteMajorCareer,
} from "../controllers/majorCareerController.js";

import authenticateToken from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  getAllMajorCareers
);

router.post(
  "/",
  authenticateToken,
  allowRoles(1, 3),
  createMajorCareer
);

router.put(
  "/:id",
  authenticateToken,
  allowRoles(1, 3),
  updateMajorCareer
);

router.delete(
  "/:id",
  authenticateToken,
  allowRoles(1, 3),
  deleteMajorCareer
);

export default router;