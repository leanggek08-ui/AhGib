import express from "express";
import * as q from "../controllers/questionController.js";
const router = express.Router();

//create queation
router.post("/",q.createQuestion);
//get all queation
router.get("/",q.getQuestions);
//get by id
router.get("/:id",q.getQuestionById);

export default router;

