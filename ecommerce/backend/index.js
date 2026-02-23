import express from "express";
import dotenv from "dotenv";
import Productrouter from "./routes/product.routes.js";
import connectDB from "./utils/dbconnect.js";


dotenv.config();
const app = express();
connectDB();


app.use(express.json());



app.use(Productrouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});