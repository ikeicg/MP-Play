import React from "react";
import Home from "./Home/Home";
import Library from "./Library/Library";
import Search from "./Search/Search";
import { Routes, Route } from "react-router-dom";

const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="library" element={<Library />} />
      <Route path="search" element={<Search />} />
    </Routes>
  );
};

export default Body;
