import mongoose from "mongoose";
import Product from "../models/product.model.js";

const ProductController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            console.log("Error fetching products:", error);
            res.status(500).json({ message: "Error fetching products" });
        }
    },

    getProductById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(404).json({ message: "Product not found" });
            }

            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            res.status(200).json(product);
        } catch (error) {
            console.log("Error fetching product:", error);
            res.status(500).json({ message: "Error fetching product" });
        }
    },
};

export default ProductController;
