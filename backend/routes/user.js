import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import * as user from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", authenticateToken, user.getProfile);
router.put("/profile", authenticateToken, user.updateProfile);
export default router;