import Mongoose from "mongoose";

const orderSchema = new Mongoose.Schema({
    user:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[
        {
            product:{
                type:Mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            },
            orderedPrice:{
                type:Number,
                required:true
            }
        }
    ],
    totalAmount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["PENDING","SHIPPED","DELIVERED"],
        default:"PENDING"
    },
    Location:{
        type:String,
        required:true
    }
}, { timestamps: true });

const Order = Mongoose.model("Order", orderSchema);

export default Order;