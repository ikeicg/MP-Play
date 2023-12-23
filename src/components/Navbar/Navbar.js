import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="navbar">
      <div className="nav-item-l">Music</div>
      <div className="nav-item-l">
        <Link to="/" className="navLink">
          Home
        </Link>
        <Link to="library" className="navLink">
          Library
        </Link>
        <Link to="search" className="navLink">
          Search
        </Link>
      </div>
      <div className="nav-item-l p-icon">
        <i className="material-icons">person</i>
      </div>
    </nav>
  );
};

export default Navbar;
