// src/components/Sidebar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

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
    </div>
  );
}
