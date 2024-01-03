import React from "react";
import Home from "./Home/Home";
import Favorites from "./Favorites/Favorites";
import { Routes, Route } from "react-router-dom";

const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="favorites" element={<Favorites />} />
    </Routes>
  );
};

export default Body;
