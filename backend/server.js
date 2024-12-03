import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import router from "./router/productROuter.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use("/api/product", router);

app.listen(PORT, () => {
  connectDB();
  console.log(`SERVER IS RUNNING in ${PORT}`);
});