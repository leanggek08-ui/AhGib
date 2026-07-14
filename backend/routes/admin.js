import express from "express";
import authenticateToken from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import { getDashboardStats } from "../controllers/adminController.js";

const router = express.Router();

// only Admin + Super Admin
router.get(
  "/dashboard",
  authenticateToken,
  allowRoles(1, 3),
  getDashboardStats
);

export default router;