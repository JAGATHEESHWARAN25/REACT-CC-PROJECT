import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/Header.css"; 

const Header = () => {
  const location = useLocation();

  // Hide Header for Login and Register Pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <div className="below">
    <header className="header">
      {/* Left section: Icon and title */}
      <div className="header-left">
        <img 
          src="https://cdn-icons-png.flaticon.com/128/864/864685.png" 
          alt="Book Icon" 
          className="header-icon" 
        />
        <span className="header-title">e-Book Store</span>
      </div>

      {/* Right section: Search bar and navigation links */}
      <div className="header-right">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for books..."
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </nav>
      </div>
    </header>

    </div>
  );
};

export default Header;
