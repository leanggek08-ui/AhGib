import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import { getStats, getActivities } from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/stats",
  authenticateToken,
  allowRoles(1, 3),
  getStats
);

router.get(
  "/activities",
  authenticateToken,
  allowRoles(1, 3),
  getActivities
);

export default router;