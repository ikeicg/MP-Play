import React, { useContext, useEffect } from "react";
import { PlayerContext } from "../../../../App";
import Songcard from "../../Songcard/Songcard";

const Quickpick = () => {
  const { appState, setAppState } = useContext(PlayerContext);

  const { allSongs, playlist } = appState;

  useEffect(() => {
    setAppState((prev) => ({ ...prev, playlist: allSongs }));
  }, []);

  return (
    <div id="quickpick">
      <div className="qp-header">
        Quickpicks
        <span>Start Listening</span>
      </div>
      <div className="songcards">
        {playlist.slice(0, 12).map((song, index) => (
          <Songcard key={index} ind={index} song={allSongs[index]} />
        ))}
      </div>
    </div>
  );
};

export default Quickpick;
