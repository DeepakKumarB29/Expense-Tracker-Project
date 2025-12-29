import express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../model/user.js";

const router = express.Router();
//SIGN-UP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = new userModel({
    name,
    email,
    password: encryptedPassword,
  });

  await user.save();

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

  const encryptedPassword = await bcrypt.hash(password, 10);

  const isPasswordMatch = await bcrypt.compare(password, encryptedPassword);

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Wrong password" });
  }

  return res.status(200).json({ message: "Login Successfully" });
});

export { router as userRouter };
