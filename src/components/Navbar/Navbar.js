import React from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <nav id="navbar">
      <div className="nav-item-l">Music</div>
      <div className="nav-item-l">
        <Link
          to="/"
          className={`navLink ${pathname === "/" ? "selected" : ""}`}
        >
          Home
        </Link>
        <Link
          to="library"
          className={`navLink ${pathname === "/library" ? "selected" : ""}`}
        >
          Library
        </Link>
        <Link
          to="search"
          className={`navLink ${pathname === "/search" ? "selected" : ""}`}
        >
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
