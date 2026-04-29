import express from "express";
import Authcontroller from "../controllers/auth.controllers.js";

const router = express.Router();

authRouter.post("/register",Authcontroller.Register);
authRouter.post("/login",Authcontroller.Login);
export default authRouter;

