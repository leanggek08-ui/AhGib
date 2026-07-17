import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "../controllers/questionController.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.post("/", authenticateToken, allowRoles(1, 3), createQuestion);
router.put("/:id", authenticateToken, allowRoles(1, 3), updateQuestion);
router.delete("/:id", authenticateToken, allowRoles(1, 3), deleteQuestion);

export default router;
