import mongoode from "mongoose";

const userSchema=new mongoode.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
        role:{
        type:String,
        required:true,
        enum:['admin','user'],
        default:'user',
    },
},
{timestamps:true}
);

const User=mongoode.model('User',userSchema);

export default User;