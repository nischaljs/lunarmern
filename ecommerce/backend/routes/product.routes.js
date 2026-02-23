import express from 'express';
import ProductController from '../controllers/product.controllers.js';

const Productrouter = express.Router();

//public routes

//get all products
Productrouter.get("/products",ProductController.getAllProducts);

//get single product by id 
Productrouter.get("/products/:id",ProductController.getProductById);

//admin routes
// router.post("/products",);
// router.put("/products/:id",);
// router.delete("/products/:id",);


export default Productrouter;