import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
},
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            orderprice: {
                type: Number,
                required: true,
            },
        },
    ],
    totalamount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "pending",
    },
    location: {
        type: String,
        required: true,
    },
    
},
{ timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;