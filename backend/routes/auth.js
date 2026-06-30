import express from "express";
const router = express.Router();
import * as auth from "../controllers/authController.js";

router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/forgot-password",auth.forgotPassword);
router.post("/reset-password",auth.resetPassword);

export default router;