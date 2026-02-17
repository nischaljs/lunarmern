import { Router } from "express";
import authController from "../controllers/auth.controllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authrouter = Router();

// http://localhost:4000/auth/login

authrouter.post("/auth/login",authController.LoginController); 


//http://localhost:4000/auth/register

authrouter.post("/auth/register",authController.RegisterController);

authrouter.get("/me",authMiddleware,authController.GetMeController);

export default authrouter;