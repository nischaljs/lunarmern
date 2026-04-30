import express from "express";
import dotenv from "dotenv";
import Productrouter from "./routes/product.routes.js";
import connectDB from "./utils/dbconnect.js";
import authRouter from "./routes/auth.routes.js";
import Categoryrouter from "./routes/category.routes.js";


dotenv.config();
const app = express();
connectDB();


app.use(express.json());


app.use(authRouter);
app.use(Productrouter);
app.use(Categoryrouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});