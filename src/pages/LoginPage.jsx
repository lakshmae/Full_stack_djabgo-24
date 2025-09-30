// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./LoginPage.css";

// export default function LoginSignup() {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
//   const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSubmit = async () => {
//   setError("");
//   setSuccess("");

//   if (!credentials.username || !credentials.password || (!isLogin && !credentials.email)) {
//     setError("Please fill all required fields");
//     return;
//   }

//   try {
//     const url = isLogin
//       ? "https://django8-zvkr.onrender.com/api/login/"
//       : "https://django8-zvkr.onrender.com/api/signup/";

//     const res = await axios.post(
//       url,
//       credentials,
//       {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true, // required if you want session cookies to work
//       }
//     );

//     console.log(res.data);

//     if (isLogin) {
//       navigate("/dashboard"); // redirect after login
//     } else {
//       setSuccess("Signup successful! You can now login.");
//       setIsLogin(true);
//       setCredentials({ username: "", email: "", password: "" });
//     }
//   } catch (err) {
//     console.error(err);
//     setError(err.response?.data?.message || "Something went wrong");
//   }
// };


//   return (
//     <div className="login-container">
//       <h1>{isLogin ? "Login" : "Sign Up"}</h1>

//       <div className="login-form">
//         <input
//           type="text"
//           placeholder="Username"
//           value={credentials.username}
//           onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//         />

//         {!isLogin && (
//           <input
//             type="email"
//             placeholder="Email"
//             value={credentials.email}
//             onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
//           />
//         )}

//         <input
//           type="password"
//           placeholder="Password"
//           value={credentials.password}
//           onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//         />

//         <button onClick={handleSubmit}>{isLogin ? "Login" : "Sign Up"}</button>

//         {error && <p className="error-msg">{error}</p>}
//         {success && <p className="success-msg">{success}</p>}

//         <p className="toggle-text">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <span
//             onClick={() => {
//               setIsLogin(!isLogin);
//               setError("");
//               setSuccess("");
//             }}
//           >
//             {isLogin ? " Sign Up" : " Login"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // for signup
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState("");

  // Get CSRF token when component mounts
  useEffect(() => {
    
    axios.get("https://django8-zvkr.onrender.com/api/login/", { withCredentials: true })
      .then(res => setCsrfToken(res.data.csrfToken || ""))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !password || (!isLogin && !email)) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const url = isLogin
        ? "https://django8-zvkr.onrender.com/api/login/"
        : "hhttps://django8-zvkr.onrender.com/api/signup/";

      const res = await axios.post(
        url,
        isLogin ? { username, password } : { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
            ...(csrfToken && { "X-CSRFToken": csrfToken }),
          },
          withCredentials: true,
        }
      );

      if (isLogin) {
        alert(res.data.message);
        navigate("/dashboard"); // go to dashboard on login
      } else {
        setSuccess("Signup successful! You can now login.");
        setIsLogin(true);
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="body">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {!isLogin && (
          <>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
        )}

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setSuccess("");
            }}
            style={{ cursor: "pointer", color: "blue", marginLeft: "5px" }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}
