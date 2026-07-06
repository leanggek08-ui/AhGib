import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import * as user from "../controllers/userController.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

/* =========================
   PROFILE (ALL USERS)
========================= */
router.get("/profile", authenticateToken, user.getProfile);
router.put("/profile", authenticateToken, user.updateProfile);

/* =========================
   ADMIN + SUPER ADMIN
========================= */
router.get("/", authenticateToken, allowRoles(1, 3), user.getAllUsers);


/* =========================
   SUPER ADMIN ONLY
========================= */
router.delete("/:id", authenticateToken, allowRoles(3), user.deleteUser);


/* =========================
   ADMIN + SUPER ADMIN
========================= */
// router.put("/:id", authenticateToken, allowRoles(1, 3), user.updateUser);
router.put("/:id", authenticateToken, allowRoles(1, 3), user.updateUser);

export default router;