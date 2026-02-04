import mongoose from "mongoose";


const connectToDatabse = async () => {
    try {
        await mongoose.connect("mongodb+srv://dummynischal108_db_user:vBD10LQTFNMzl72L@nischal.2fnyljn.mongodb.net/");
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
    }
}


export default connectToDatabse;