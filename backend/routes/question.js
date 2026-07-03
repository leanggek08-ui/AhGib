import express from "express";
import * as q from "../controllers/questionController.js";
const router = express.Router();
import { authenticateToken } from "../middlewares/authMiddleware.js";


router.post("/", authenticateToken, q.createQuestion);
router.get("/",q.getQuestions);
router.get("/:id",q.getQuestionById);
router.put("/:id", q.updateQuestion);
router.delete("/:id", q.deleteQuestion);

export default router;

