// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "../index.css";

export default function Navbar({ ctfActive }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (storedUser) setLoggedInUser(storedUser);
    } catch (err) {
      console.warn("Failed to parse loggedInUser from localStorage:", err);
    }
  }, []);

  const handleLogout = () => {
    // TODO: Replace localStorage auth with backend API logout/session invalidation
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex justify-between items-center h-16 px-6">
      {/* Left: Logo + title */}
      <div className="flex items-center">
        <Link to="/" className="navbar-logo">
          <img
            src={logo}
            alt="CTF logo"
            className="w-12 h-12 rounded-full object-cover transform transition duration-200 hover:scale-110 hover:shadow-lg"
          />
        </Link>
        <span className="navbar-header ml-2 font-semibold text-white">ISEP CTF Platform</span>
      </div>

      {/* Right: navigation buttons */}
      {ctfActive && (
        <div
          className="navbar-buttons flex items-center gap-3"
          style={{ marginRight: "0.5rem" }} // moved to left a bit
        >
          {!loggedInUser ? (
            <>
              <Link to="/Register" className="fancy-btn">Register</Link>
              <Link to="/Login" className="fancy-btn">Login</Link>
              <Link to="/Teams" className="fancy-btn">Teams</Link>
              <Link to="/Rankings" className="fancy-btn">Scoreboard</Link>
              <Link to="/Contact" className="fancy-btn">Contact</Link>
            </>
          ) : (
            <>
              <Link to="/Teams" className="fancy-btn">Teams</Link>
              <Link to="/Rankings" className="fancy-btn">Scoreboard</Link>
              <Link to="/Contact" className="fancy-btn">Contact</Link>
              <Link to={`/profile/${loggedInUser.username}`} className="fancy-btn">My Profile</Link>
              <Link
                to="/"
                onClick={(e) => { e.preventDefault(); handleLogout(); }}
                className="fancy-btn logout-btn"
              >
                Logout
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

/*
==================== NOTES / TODOs ====================

1. Authentication:
   - Currently uses localStorage for demonstration.
   - In production, replace with backend API + JWT/session management.

2. Active Link Highlight:
   - wrap links in NavLink with `isActive` to highlight current page.

3. UX:
   - Logo hover animation and navbar transparency for modern feel.

4. Error Handling:
   - Wrapped localStorage parsing in try/catch.

========================================================
*/