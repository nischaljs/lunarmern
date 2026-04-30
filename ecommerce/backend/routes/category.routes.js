import { Router } from "express";
import { getAllCategories } from "../controllers/category.controllers.js";


const Categoryrouter = Router();


Categoryrouter.get("/categories",getAllCategories );


export default Categoryrouter;