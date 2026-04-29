import express from "express";
import dotenv from "dotenv";
import productrouter from "./routes/product.routes";
import connectDB from "./config/db";
import authRouter from "./routes/auth.routes.js";


dotenv.config();
const app = express();

app.use(express.json()); // allows us to accept JSON data in the body of the request
app.use(productrouter);  

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});