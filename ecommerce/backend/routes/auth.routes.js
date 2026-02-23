import express from "express";
import AuthController from "../controllers/auth.controllers.js";

const authRouter = express.Router();


authRouter.post("/register",AuthController.Register );
authRouter.post("/login", AuthController.Login);

export default authRouter;