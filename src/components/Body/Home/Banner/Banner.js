import React, { useState, useEffect } from "react";
import { genreImg, bannerGradients } from "./data";

const Banner = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [gradIndex, setGradIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((imgIndex) =>
        imgIndex + 1 >= genreImg.length ? 0 : imgIndex + 1
      );
      setGradIndex((gradIndex) =>
        Math.floor(Math.random() * bannerGradients.length)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [genreImg.length]);

  return (
    <div id="banner">
      <div className="banner-head">What's the mood ?</div>
      <div
        style={{ background: bannerGradients[gradIndex] }}
        className="banner-slide"
      >
        <div className="banner-img">
          <img src={genreImg[imgIndex][0]} alt="theme" />
        </div>
        <div className="banner-text">{genreImg[imgIndex][1]}</div>
      </div>
    </div>
  );
};

export default Banner;
