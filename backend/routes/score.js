import express from "express";
const router = express.Router();

import { runScore } from "../controllers/scoreController.js";

router.post("/calculate/:ass_id", runScore);

export default router;