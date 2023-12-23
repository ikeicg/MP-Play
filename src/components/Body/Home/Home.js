import React from "react";
import Banner from "./Banner/Banner";
import Quickpick from "./Quickpick/Quickpick";
import "./home.css";

const Home = () => {
  return (
    <div className="main">
      <Banner />
      <Quickpick />
    </div>
  );
};

export default Home;
