import express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../model/user.js";
import { expenseModel } from "../model/expenses.js";

const router = express.Router();

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new userModel({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  return res.status(201).json({ message: "User registered successfully" });
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not registered" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Wrong password" });
  }

  return res.status(200).json({
    message: "Login successfully",
    userId: user._id, // ✅ IMPORTANT
  });
});

// ================= ADD EXPENSE =================
router.post("/home", async (req, res) => {
  const { userId, name, price, description } = req.body;

  const expense = new expenseModel({
    userId,
    name,
    price,
    description,
  });

  await expense.save();

  return res.status(201).json({ message: "Expense added successfully" });
});

// ================= GET USER EXPENSES =================
router.get("/home/:userId", async (req, res) => {
  try {
    const expenses = await expenseModel.find({
      userId: req.params.userId,
    });

    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching expenses" });
  }
});

// ================= DELETE EXPENSE =================
router.delete("/home/:id/:userId", async (req, res) => {
  try {
    await expenseModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.params.userId,
    });

    return res.status(200).json({ message: "Expense deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Delete failed" });
  }
});

export { router as userRouter };
