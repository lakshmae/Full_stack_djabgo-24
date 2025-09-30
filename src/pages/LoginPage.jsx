import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginSignup() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true); // toggle login/signup
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!credentials.username || !credentials.password || (!isLogin && !credentials.email)) {
      setError("Please fill all required fields");
      return;
    }

    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post("https://django8-zvkr.onrender.com/api/login/", {
          username: credentials.username,
          password: credentials.password,
        });
        console.log(res.data);
        navigate("/dashboard");
      } else {
        // SIGNUP
        const res = await axios.post("https://django8-zvkr.onrender.com/api/signup/", credentials);
        console.log(res.data);
        setSuccess("Signup successful! You can now login.");
        setIsLogin(true);
        setCredentials({ username: "", email: "", password: "" });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

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

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}>
          {isLogin ? " Sign Up" : " Login"}
        </span>
      </p>
    </div>
  );
}
// src/pages/LoginPage.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../services/api/auth";
// import { AuthContext } from "../services/context/AuthContext";
// import { useContext } from "react";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { setUser, setLoggedIn } = useContext(AuthContext); // ✅ Get context updater functions

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await login({ username, password });
//       // ✅ Update context with REAL username from Django
//       setUser(data.username);   // ← This is critical!
//       setLoggedIn(true);
//       navigate("/"); // Redirect to home
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
//       <h2>Login</h2>
//       {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
//         />
//         <button
//           type="submit"
//           style={{
//             width: '100%',
//             padding: '10px',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             cursor: 'pointer'
//           }}
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }