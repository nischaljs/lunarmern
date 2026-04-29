import express from "express";
import productController from "../controllers/product.controllers.js";

const productrouter = express.Router();

productrouter.get("/products", productController.getProducts);
productrouter.get("/products/:id", productController.getProduct);

export default productrouter;
