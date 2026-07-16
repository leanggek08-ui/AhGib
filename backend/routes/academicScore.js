import express from "express";
import * as ac from "../controllers/academicScoreController.js";

const router = express.Router();

router.post("/", ac.createAcademicScores);
router.get("/:ass_id", ac.getAcademicScores);

export default router;