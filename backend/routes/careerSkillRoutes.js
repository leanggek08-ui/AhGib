import express from "express";

import {
    getAllCareerSkills,
    createCareerSkill,
    updateCareerSkill,
    deleteCareerSkill
} from "../controllers/careerSkillController.js";


import { authenticateToken } 
from "../middlewares/authMiddleware.js";


import { allowRoles } 
from "../middlewares/roleMiddleware.js";


const router = express.Router();



// ===============================
// GET ALL CAREER SKILLS
// Admin + Super Admin can view
// ===============================

router.get(
    "/",
    authenticateToken,
    getAllCareerSkills
);




// ===============================
// CREATE SKILL
// Only Admin and Super Admin
// ===============================

router.post(
    "/",
    authenticateToken,
    allowRoles(1,3),
    createCareerSkill
);




// ===============================
// UPDATE SKILL
// Only Admin and Super Admin
// ===============================

router.put(
    "/:id",
    authenticateToken,
    allowRoles(1,3),
    updateCareerSkill
);




// ===============================
// DELETE SKILL
// Only Admin and Super Admin
// ===============================

router.delete(
    "/:id",
    authenticateToken,
    allowRoles(1,3),
    deleteCareerSkill
);



export default router;