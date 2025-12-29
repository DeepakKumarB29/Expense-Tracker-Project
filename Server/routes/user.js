import express from "express";
import { userModel } from "../model/user.js";

const router = express.Router();
//SIGN-UP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }

  await new userModel({
    name,
    email,
    password,
  }).save();

  return res.status(200).json({
    message: "User registered successfully",
  });
});

//LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not registered" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Wrong password" });
  }

  return res.status(200).json({ message: "Login Successfully" });
});

export { router as userRouter };
