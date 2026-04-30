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
    getFeaturedProducts: async (req, res) => {
        try{
            const featuredProducts = await Product.find({ isfeaturedProduct: true });
            res.status(200).json(featuredProducts);
        }
        catch(error){
            console.log("Error fetching featured products:", error);
            res.status(500).json({ message: "Error fetching featured products" }); 
        }

    },
    searchProducts: async (req, res) => {
        try{
            const {userSearched} = req.query;
            const searchResults = await Product.find(
                { name:
                     { $regex:
                         userSearched,
                          $options: "i" 
                        } 
                    }
                );
            res.status(200).json(searchResults);

        }
        catch(error){
            console.log("Error searching products:", error);
            res.status(500).json({ message: "Error searching products" }); 
        }
    },
    getProductsByCategory: async (req, res) => {
        try{
            const categoryId = req.params.category;

            const productsofThatCategory = await Product.find(
                { 
                    category: categoryId
                 }
                );
            res.status(200).json(productsofThatCategory);
        }
        catch(error){
            console.log("Error fetching products by category:", error);
            res.status(500).json({ message: "Error fetching products by category" }); 
        }
    }
};

export default ProductController;
