// // src/components/Sidebar.jsx
// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./Sidebar.css";

// export default function Sidebar({ onLogout }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Helper to check active link
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="sidebar">
//       <ul>
//         <li
//           className={isActive("/dashboard") ? "active" : ""}
//           onClick={() => navigate("/dashboard")}
//         >
//           Dashboard
//         </li>
//         <li
//           className={isActive("/users") ? "active" : ""}
//           onClick={() => navigate("/users")}
//         >
//           Users
//         </li>
//         <li
//           className={isActive("/products") ? "active" : ""}
//           onClick={() => navigate("/dashboard")}
//         >
//           Products
//         </li>
//         <li
//           className={isActive("/add-user") ? "active" : ""}
//           onClick={() => navigate("/add-user")}
//         >
//           Add User
//         </li>
//       </ul>
//     </div>
//   );
// }


import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "./CartContext"; // ✅ Import CartContext
import "./Sidebar.css";

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, removeFromCart } = useContext(CartContext); // ✅ Access cart

  // Helper to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <ul>
        <li
          className={isActive("/dashboard") ? "active" : ""}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </li>
        <li
          className={isActive("/users") ? "active" : ""}
          onClick={() => navigate("/users")}
        >
          Users
        </li>
        <li
          className={isActive("/products") ? "active" : ""}
          onClick={() => navigate("/dashboard")}
        >
          Products
        </li>
        <li
          className={isActive("/add-user") ? "active" : ""}
          onClick={() => navigate("/add-user")}
        >
          Add User
        </li>
      </ul>

      {/* ✅ Cart Section */}
      <div className="cart-section">
        <h4>🛒 Cart Items</h4>
        {cartItems.length === 0 ? (
          <p className="empty-cart">No items in cart</p>
        ) : (
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.productname}</span>
                <button
                  className="remove-cart-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
