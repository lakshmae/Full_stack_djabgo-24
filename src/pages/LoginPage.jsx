import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginSignup() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    // Basic validation
    if (!credentials.username || !credentials.password || (!isLogin && !credentials.email)) {
      setError("Please fill all required fields");
      return;
    }

    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post(
          "https://django8-zvkr.onrender.com/api/login/",
          { username: credentials.username, password: credentials.password },
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );
        console.log(res.data);
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        // SIGNUP
        const res = await axios.post(
          "https://django8-zvkr.onrender.com/api/signup/",
          credentials,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(res.data);
        setSuccess("Signup successful! You can now login.");
        setCredentials({ username: "", email: "", password: "" });
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      // Handle different error formats from Django
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="login-container">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />

        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
        )}

        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />

        <button onClick={handleSubmit}>{isLogin ? "Login" : "Sign Up"}</button>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setSuccess("");
            }}
          >
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
