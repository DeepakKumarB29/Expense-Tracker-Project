import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Details from "./Details";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ name: "", email: "", password: "" });
      navigate("/");
    } else {
      setError("User Already Exists");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <p style={{ color: "red" }}>{error}</p>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Details
          formData={formData}
          onChange={handleChange}
          buttonText="Sign Up"
        />

        <p>
          Have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
