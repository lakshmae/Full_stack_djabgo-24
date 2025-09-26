import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../components/SearchContext";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Just Like That</h2>
      <div className="nav-links">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
