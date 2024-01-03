import React from "react";
import Home from "./Home/Home";
import Favorites from "./Favorites/Favorites";
import { Routes, Route } from "react-router-dom";

const Body = () => {
  return (
    <Routes>
      <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
      <Route
        path={`${process.env.PUBLIC_URL}/favorites`}
        element={<Favorites />}
      />
    </Routes>
  );
};

export default Body;
