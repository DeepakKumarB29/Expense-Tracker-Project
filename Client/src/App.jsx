import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
