import React, { createContext, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Body from "./components/Body/Body";
import Playbar from "./components/Playbar/Playbar";
import { allSongs } from "./db";

export const PlayerContext = createContext();
const state = {
  playlist: allSongs,
  songIndex: 0,
  playbar: false,
  playing: false,
  favorites: []
};

export const App = () => {
  const [appState, setAppState] = useState(state);

  return (
    <>
  <Navbar />
      <PlayerContext.Provider value={{ appState, setAppState }}>
        <Body />
        {appState.playbar && <Playbar />}
      </PlayerContext.Provider>
    </>
  );
};
