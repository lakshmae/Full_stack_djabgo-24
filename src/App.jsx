// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// // import Login from "./components/Login";
// // import Dashboard from "./components/Dashboard";
// export function LoginPage(){
// }
  
// export function HomePage(){
//   const [products, setProducts] = useState([]);

//   const getProducts = async () => {
//     axios.get('https://localhost:8000/api/products').then(res => {
//       let products = res.data;
//       setProducts(products);
//     }).catch(err => {
//       console.log(err);

//     });
//   }

// }

// <tbody>
//   {
//     products.map(product => (
//       <tr key={product.id}>
//         <td>{product.productName}</td>
//         <td>{product.price}</td>
//         <td>{product.address}</td>
//       </tr>
//     ));
//   }
// </tbody>
// </table>

// // Wrapper to inject navigation into Dashboard
// // function DashboardWrapper() {
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     navigate("/"); // redirect to login page
// //   };

// //   return <Dashboard onLogout={handleLogout} />;
// // }

// // export default function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<Login />} />
// //         <Route path="/dashboard" element={<DashboardWrapper />} />
// //       </Routes>
// //     </Router>
// //   );
// // }




// //  function LoginPage(){
// //   const navigate= useNavigate();
// //   const handleLogin = () =>{
// //     navigate('/dashboard'); // Navigate to the dashboard page
// //   }
// //   return (
// //     <div className="login-page">
// //       <h1>Login Page</h1>
// //       <input type="text" placeholder="Username" />
// //       <input type="password" placeholder="Password" />
// //       <button onClick={handleLogin}>Login</button>
// //     </div>
// //   );

// // }
 
// // function DashboardPage() {
// //   return (
// //     <div className="dashboard-page">
// //       <h1>Dashboard</h1>
// //       <p>Welcome to your dashboard!</p>
// //       <button>View Profile</button>
// //       <button>Settings</button>
// //     </div>
// //   );
// // }

// // function AppNavigator(){
// //   return <Routes>
// //     <Route path="/" element={<LoginPage />} />
// //     <Route path="/dashboard" element={<DashboardPage />} />
// //   </Routes>;
// // }

// // export function Ecommerce(){
// //   return <AppNavigator> </AppNavigator>
// // }import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import UpdateProduct from "./pages/UpdateProduct";
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";
import { SearchProvider } from "./components/SearchContext";
export default function App() {
  return (
    <SearchProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </Router>
    </SearchProvider>
  );
}


