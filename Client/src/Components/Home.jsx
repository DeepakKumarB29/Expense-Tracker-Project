import React, { useState, useEffect } from "react";

const Home = () => {
  const userId = localStorage.getItem("userId");

  const [expenseData, setExpenseData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [expenses, setExpenses] = useState([]);

  // ---------------- FETCH USER EXPENSES ----------------
  const fetchExpenses = () => {
    if (!userId) return;

    fetch(`http://localhost:3000/home/${userId}`)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error("Error fetching expenses:", error));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ---------------- HANDLE INPUT ----------------
  const handleChange = (e) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- ADD EXPENSE ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/home", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...expenseData, userId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add expense");
        setExpenseData({ name: "", price: "", description: "" });
        fetchExpenses();
      })
      .catch((error) => console.error("Error adding expense:", error));
  };

  // ---------------- DELETE EXPENSE ----------------
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/home/${id}/${userId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete expense");
        fetchExpenses();
      })
      .catch((error) => console.error("Error deleting expense:", error));
  };

  // ---------------- TOTAL AMOUNT ----------------
  const totalAmount = expenses.reduce((sum, exp) => sum + Number(exp.price), 0);

  return (
    <div>
      <h3>Expense Tracker</h3>

      {/* -------- ADD EXPENSE FORM -------- */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Title"
          value={expenseData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={expenseData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={expenseData.description}
          onChange={handleChange}
        />

        <button type="submit">Add</button>
      </form>

      <hr />

      {/* -------- EXPENSE TABLE -------- */}
      <h4>Your Expenses</h4>

      {expenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Price (₹)</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((exp, index) => (
              <tr key={exp._id}>
                <td>{index + 1}</td>
                <td>{exp.name}</td>
                <td>{exp.price}</td>
                <td>{exp.description}</td>
                <td>
                  <button onClick={() => handleDelete(exp._id)}>Delete</button>
                </td>
              </tr>
            ))}

            {/* -------- TOTAL ROW -------- */}
            <tr>
              <td colSpan="2">
                <strong>Total</strong>
              </td>
              <td>
                <strong>₹{totalAmount}</strong>
              </td>
              <td colSpan="2"></td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
