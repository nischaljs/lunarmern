import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagepath: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
},
 { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;