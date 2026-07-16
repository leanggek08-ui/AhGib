import express from "express";
import * as ass from "../controllers/assessmentController.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import {
  generateCareerRecommendation,
  chatWithCareerAdvisor,
} from "../services/groqService.js";


const router = express.Router();

router.post("/", ass.createAssessment);
router.get("/:user_id", ass.getAssessment);
router.put("/:ass_id/complete", ass.completeAssessment);

router.post("/recommendation", authenticateToken, async (req, res) => {
  try {
    const studentProfile = req.body;

    if (!studentProfile || typeof studentProfile !== "object") {
      return res.status(400).json({ message: "studentProfile is required" });
    }

    const recommendation = await generateCareerRecommendation(studentProfile);

    res.json({
      message: "Career recommendation generated successfully",
      data: recommendation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/chat", authenticateToken, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res
        .status(400)
        .json({ message: "messages must be a non-empty array" });
    }

    const reply = await chatWithCareerAdvisor(messages);

    res.json({
      message: "Chat response generated successfully",
      reply,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;