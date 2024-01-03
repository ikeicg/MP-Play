import React from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <nav id="navbar">
      <div className="nav-item nav-item-l">MP-PLAY</div>
      <div className="nav-item nav-item-l">
        <Link
          to="/"
          className={`navLink ${pathname === "/" ? "selected" : ""}`}
        >
          Home
        </Link>
        <Link
          to="favorites"
          className={`navLink ${pathname === "/favorites" ? "selected" : ""}`}
        >
          Favorites
        </Link>
      </div>
      <div className="nav-item nav-item-s">
        <Link
          to="/"
          className={`navLink ${pathname === "/" ? "selected" : ""}`}
        >
          <i className="material-icons">home</i>
        </Link>
        <Link
          to="favorites"
          className={`navLink ${pathname === "/favorites" ? "selected" : ""}`}
        >
          <i className="material-icons">library_music</i>
        </Link>
      </div>
      <div className="nav-item p-icon">
        <i className="material-icons">person</i>
      </div>
    </nav>
  );
};

export default Navbar;
