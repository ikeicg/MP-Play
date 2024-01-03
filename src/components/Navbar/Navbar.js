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
          to={`${process.env.PUBLIC_URL}/`}
          className={`navLink ${
            pathname === process.env.PUBLIC_URL + "/" ? "selected" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to={`${process.env.PUBLIC_URL}/favorites`}
          className={`navLink ${
            pathname === process.env.PUBLIC_URL + "/favorites" ? "selected" : ""
          }`}
        >
          Favorites
        </Link>
      </div>
      <div className="nav-item nav-item-s">
        <Link
          to={`${process.env.PUBLIC_URL}/`}
          className={`navLink ${
            pathname === process.env.PUBLIC_URL + "/" ? "selected" : ""
          }`}
        >
          <i className="material-icons">home</i>
        </Link>
        <Link
          to={`${process.env.PUBLIC_URL}/favorites`}
          className={`navLink ${
            pathname === process.env.PUBLIC_URL + "/favorites" ? "selected" : ""
          }`}
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
