import express from 'express';
import ProductController from '../controllers/product.controllers.js';

const Productrouter = express.Router();

//public routes

//get all products
Productrouter.get("/products",ProductController.getAllProducts);

//get single product by id 
Productrouter.get("/products/:id",ProductController.getProductById);


Productrouter.get("/products/featured", ProductController.getFeaturedProducts);

Productrouter.get("/products/search", ProductController.searchProducts);

Productrouter.get("/products/category/:category", ProductController.getProductsByCategory);


export default Productrouter;


// index.js -> route -> controller ( main db queries ) -> response 
// request ->indexedDB.js ->route -> controller -> response

