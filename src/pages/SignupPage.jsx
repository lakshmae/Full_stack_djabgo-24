// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./LoginPage.css"; // Reuse the same CSS

// export default function SignupPage() {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSignup = async () => {
//     if (!credentials.username || !credentials.password || !credentials.email) {
//       setError("Please fill all fields");
//       setSuccess("");
//       return;
//     }

//     try {
//       // Send POST request to Django signup API
//       const res = await axios.post("https://django8-zvkr.onrender.com/api/signup/", credentials);
//       console.log(res.data);
//       setSuccess("Signup successful! Redirecting to login...");
//       setError("");

//       // Redirect to login after 1.5 seconds
//       setTimeout(() => {
//         navigate("/");
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//       setSuccess("");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Signup</h1>
//       <div className="login-form">
//         <input
//           placeholder="Username"
//           value={credentials.username}
//           onChange={(e) =>
//             setCredentials({ ...credentials, username: e.target.value })
//           }
//         />
//         <input
//           placeholder="Email"
//           type="email"
//           value={credentials.email}
//           onChange={(e) =>
//             setCredentials({ ...credentials, email: e.target.value })
//           }
//         />
//         <input
//           placeholder="Password"
//           type="password"
//           value={credentials.password}
//           onChange={(e) =>
//             setCredentials({ ...credentials, password: e.target.value })
//           }
//         />
//         <button className="signup-btn" onClick={handleSignup}>
//           Signup
//         </button>
//         {error && <p className="error-msg">{error}</p>}
//         {success && (
//           <p
//             style={{
//               color: "green",
//               fontWeight: "bold",
//               textAlign: "center",
//             }}
//           >
//             {success}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api/auth";
import "./LoginPage.css";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    try {
      await signup(username, email, password);
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="body">
      <h1>Sign Up</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
