import React, { useContext, useState, useEffect, useRef } from "react";
import Songcard from "../Songcard/Songcard";
import { PlayerContext } from "../../../App";
import "./favorites.css";

const Favorites = () => {
  const { appState, setAppState } = useContext(PlayerContext);
  const { favorites } = appState;

  const [favState, setFavState] = useState([]);
  let initialRender = useRef(true);

  useEffect(() => {
    let x = localStorage.getItem("favorites");
    x = x
      ? JSON.parse(x).sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
      : [];
    setFavState(x);

    if (!initialRender.current) {
      setAppState((prev) => ({ ...prev, playlist: x }));
    } else {
      initialRender.current = false;
    }
  }, [favorites, setAppState]);

  return (
    <div className="main">
      <h2 className="f-header">Your Favorites</h2>

      {favState && favState.length > 0 ? (
        <div className="songcards">
          {favState.map((song, index) => (
            <Songcard key={index} ind={index} song={song} playlist={favState} />
          ))}
        </div>
      ) : (
        <h3 className="nofav">You have not selected any favorite music yet!</h3>
      )}
    </div>
  );
};

export default Favorites;
