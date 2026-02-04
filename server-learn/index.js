import express from "express";
import router from "./routes/index.routes.js";
import connectToDatabse from "./utils/databaseconnect.js";

const app = express();

app.use(express.json());

connectToDatabse();

console.log("after database conection")
app.use(router);


app.listen(4000);