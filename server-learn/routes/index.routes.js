import { Router } from "express";
import AllControllers from "../controllers/index.controllers.js";

const router = Router();

// http://localhost:4000/api/v1      

router.get("/api/v1", AllControllers.GetController)



router.post("/api/v1", AllControllers.POSTCONTROLLER)


router.delete("/api/v1", AllControllers.DELETEUSER);






export default router;