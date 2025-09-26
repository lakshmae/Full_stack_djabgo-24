// src/components/AdminLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../pages/Dashboard.css";  // Dashboard CSS is in pages folder
import "./Sidebar.css";            // Sidebar CSS is in same folder
import "./Navbar.css";             // Navbar CSS is in same folder

export default function AdminLayout({ children }) {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="dashboard-container">{children}</div>
      </div>
    </div>
  );
}
