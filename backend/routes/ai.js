import express from "express";
import { chatWithCareerAdvisor } from "../services/groqService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const message = typeof req.body?.message === "string"
    ? req.body.message.trim()
    : "";

  if (!message) {
    return res.status(400).json({
      error: "message is required and must be a non-empty string",
    });
  }

  try {
    const reply = await chatWithCareerAdvisor([
      { role: "user", content: message },
    ]);

    return res.json({ reply });
  } catch (error) {
    console.error("AI chat error:", error);

    const configurationError = error.message.includes("GROQ_API_KEY");
    return res.status(configurationError ? 503 : 502).json({
      error: configurationError
        ? "AI service is not configured"
        : "AI service is temporarily unavailable",
    });
  }
});

export default router;
