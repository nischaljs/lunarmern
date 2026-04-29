import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Saleprice:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0
    },
    variant:{
        type:[String],
        required:true
    },
    featuredimagePath:{
        type:String,
        required:true
    },
    imagesPath:{
        type:[String]
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    isfeaturedProduct:{
        type:Boolean,
        default:false
    }
},{ timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;