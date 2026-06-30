import express from "express";
import * as ass from "../controllers/assessmentController.js";
const router = express.Router();


router.post("/", ass.createAssessment);
router.get("/:user_id", ass.getAssessment);

export default router;