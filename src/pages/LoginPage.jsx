// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./LoginPage.css";

// export default function LoginSignup() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState(""); // for signup
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!username || !password || (!isLogin && !email)) {
//       setError("Please fill all required fields");
//       return;
//     }

//     try {
//       const url = isLogin
//         ? "https://django8-zvkr.onrender.com/api/login/"
//         : "https://django8-zvkr.onrender.com/api/signup/";

//       const res = await axios.post(url, 
//         isLogin ? { username, password } : { username, email, password },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (isLogin) {
//         alert(res.data.message);
//         navigate("/dashboard");
//       } else {
//         setSuccess("Signup successful! You can now login.");
//         setIsLogin(true);
//         setUsername("");
//         setEmail("");
//         setPassword("");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="body">
//       <h1>{isLogin ? "Login" : "Sign Up"}</h1>
//       <form onSubmit={handleSubmit}>
//         <label>Username</label>
//         <input
//           type="text"
//           placeholder="Enter your username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />

//         {!isLogin && (
//           <>
//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </>
//         )}

//         <label>Password</label>
//         <input
//           type="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {success && <p style={{ color: "green" }}>{success}</p>}

//         <p>
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <span
//             onClick={() => {
//               setIsLogin(!isLogin);
//               setError("");
//               setSuccess("");
//             }}
//             style={{ cursor: "pointer", color: "blue", marginLeft: "5px" }}
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }



// src/pages/LoginSignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api/auth";
import "./LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      navigate("/dashboard"); // redirect on success
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="body">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
