import React from "react";
import Songcard from "../../Songcard/Songcard";
import { allSongs } from "../../../../db";

const Quickpick = () => {
  let newplaylist = allSongs.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
  return (
    <div id="quickpick">
      <div className="qp-header">
        Playlist
        <span>Start Listening</span>
      </div>
      <div className="songcards">
        {newplaylist.map((song, index) => (
          <Songcard
            key={index}
            ind={index}
            song={song}
            playlist={newplaylist}
          />
        ))}
      </div>
    </div>
  );
};

export default Quickpick;
