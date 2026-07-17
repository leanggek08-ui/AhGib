import express from "express";
import * as ac from "../controllers/academicScoreController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, ac.createAcademicScores);
router.get("/:ass_id", authenticateToken, ac.getAcademicScores);

export default router;
