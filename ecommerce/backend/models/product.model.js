import mongoode from "mongoose";

const productSchema = new mongoode.Schema({
    name: {
        type: String,
        required: true,
    },
    Saleprice: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    variant: {
        type: String,
        required: true,
    },
    featureimagepath: {
        type: String,
        required: true,
    },
    featureproduct: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }   // ✅ correct place
);
const Product = mongoode.model("Product", productSchema);

export default Product;