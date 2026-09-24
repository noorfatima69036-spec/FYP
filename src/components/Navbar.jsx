import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WasteAlert from "../customer/WasteAlert"; 
import "../Style.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="dastr-navbar">
      <div className="nav-container">
        {/* Brand Logo / Name */}
        <Link to="/home" className="nav-brand">
          🍽️ Dastr-Khwan
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/home" className="nav-item">Home</Link>
          <Link to="/weekly-menu" className="nav-item">Weekly Menu</Link>
          <Link to="/membership" className="nav-item">Office Subscriptions</Link>
        </div>

        {/* User Auth Info / Actions */}
        <div className="nav-auth">
          <WasteAlert /> {/* Live surplus alert badge */}

          {isLoggedIn ? (
            <div className="user-profile-menu">
              <span className="user-welcome">Hi, {username || "Guest"}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/" className="login-nav-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}