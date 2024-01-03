import React, { useContext } from "react";
import "./songcard.css";
import { PlayerContext } from "../../../App";

const Songcard = (props) => {
  const { song, ind, playlist } = props;

  const { setAppState } = useContext(PlayerContext);

  const handleClick = () => {
    setAppState((prev) => ({
      ...prev,
      playlist,
      playbar: true,
      songIndex: ind,
      playing: true,
    }));
  };

  return (
    <div onClick={handleClick} className="songcard">
      <div className="songcard-img">
        <img src={song.image} alt="" />
      </div>
      <div className="songcard-details">
        <h4 className="songname">{song.name}</h4>
        <h5 className="artistename">{song.artiste}</h5>
      </div>
    </div>
  );
};

export default Songcard;
