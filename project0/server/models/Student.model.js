import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    grade:{
        type:String,
        required:true,
    },
    DateOfInsertion:{
        type:Date,
        default:Date.now,
        required:true
    }
    
})

const Student = mongoose.model("Student",studentSchema);

export default Student;