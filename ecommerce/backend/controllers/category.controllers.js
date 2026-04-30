


const CategoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json({message: "All categories", categories});

        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        
    } 
}
};

export default CategoryController;