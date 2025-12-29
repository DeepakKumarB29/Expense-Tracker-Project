import React, { useState } from "react";
import { Link } from "react-router-dom";
import Details from "./Details";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ email: "", password: "" });
      setSuccess("Login Successful");
    } else {
      setError("User Not Found or Password Incorrect");
    }
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000);
  };

  return (
    <div>
      <h3>Login Page</h3>
      <p style={{ color: "red" }}>{error}</p>
      <p style={{ color: "green" }}>{success}</p>

      <form onSubmit={handleSubmit}>
        <Details
          formData={formData}
          onChange={handleChange}
          buttonText="Login"
        />
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
