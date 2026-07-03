import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import * as user from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", authenticateToken, user.getProfile);
router.put("/profile", authenticateToken, user.updateProfile);
router.get("/", authenticateToken, user.getAllUsers);
router.delete("/:id", authenticateToken, user.deleteUser);
export default router;