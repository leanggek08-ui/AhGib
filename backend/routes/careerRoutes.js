import express from "express";

import {
    getAllCareers,
    createCareer,
    updateCareer,
    deleteCareer
} from "../controllers/careerController.js";


import {authenticateToken}
from "../middlewares/authMiddleware.js";


import {allowRoles}
from "../middlewares/roleMiddleware.js";


const router = express.Router();



router.get(
"/",
authenticateToken,
getAllCareers
);



router.post(
"/",
authenticateToken,
allowRoles(1,3),
createCareer
);



router.put(
"/:id",
authenticateToken,
allowRoles(1,3),
updateCareer
);



router.delete(
"/:id",
authenticateToken,
allowRoles(1,3),
deleteCareer
);



export default router;