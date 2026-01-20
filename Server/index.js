import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/expense-tracker-app")
  .then(() => console.log("MongoDB connected"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
