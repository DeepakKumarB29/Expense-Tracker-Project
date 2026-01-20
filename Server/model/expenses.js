import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
});

const expense = mongoose.model("Expense", expenseSchema);
export { expense as expenseModel };
