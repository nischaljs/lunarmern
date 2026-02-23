import Product from "../models/product.model.js";


const ProductController = {

    getAllProducts: async (req, res) => {
        try {
            // Logic to fetch all products from the database
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error fetching products', error });
        }
    },
    
    getProductById: async (req, res) => {
        try {
            const id= req.params.id;
            // Logic to fetch a single product by ID from the database
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error });
        }
    }

}

export default ProductController;