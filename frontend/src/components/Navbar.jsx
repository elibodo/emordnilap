import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-links">
          <Link to="/emordnilap" className="nav-link">
            Emordnilaps
          </Link>
          <Link to="/" className="nav-link">
            Search
          </Link>
          <Link to="/palindrome" className="nav-link">
            Palindromes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
