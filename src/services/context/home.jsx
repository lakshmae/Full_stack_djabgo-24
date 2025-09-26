// src/services/context/home.jsx
import { AuthContext } from "./AuthContext";
import { useContext, useState } from "react";
import axios from "axios";

export function Home() {
  const { user, loggedIn, handlelogin, logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password
      });
      handlelogin(response.data.username, response.data.token);
      alert("Login successful!");
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.error || error.message));
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <h1>Home page</h1>
      <h2>User: {user || "Guest"}</h2>
      <h2>Logged In: {loggedIn.toString()}</h2>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}


// src/services/context/home.jsx
// import { useContext, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import axios from "axios";

// export function Home() {
//   const { user, loggedIn, login, logout } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:8000/api/login/", {
//         username,
//         password,
//       });
//       login(res.data.username);
//       alert("Login successful!");
//     } catch (err) {
//       alert("Login failed: " + (err.response?.data?.error || "Check credentials"));
//     }
//   };

//   return (
//     <>
//       <h1>Home Page</h1>
//       <h2>User: {user || "Guest"}</h2>
//       <h2>Logged In: {loggedIn ? "Yes" : "No"}</h2>
//       <input
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         placeholder="Password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//       <button onClick={logout}>Logout</button>
//     </>
//   );
// }