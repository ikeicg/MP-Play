import React, { useState, useEffect, useContext, useRef } from "react";
import "./Playbar.css";
import { PlayerContext } from "../../App";

const state = {
  playlistControl: "repeat",
  extendedPlaybar: false,
  songTime: 0,
  songDuration: 0,
  favorite: false,
};

const Playbar = () => {
  const { appState, setAppState } = useContext(PlayerContext);
  const [pbState, setPbState] = useState(state);
  const { playlist, songIndex, playing } = appState;
  let song = playlist[songIndex];

  const audioTrack = useRef();
  const progressbar = useRef();

  if (!song) {
    if (!playlist) {
      setAppState((prev) => ({ ...prev, playing: false, playbar: false }));
    } else {
      song = playlist[0];
    }
  }

  const togglePlay = () => {
    setAppState((prev) => ({ ...prev, playing: !playing }));
  };

  const handleMeta = () => {
    setPbState((prev) => ({
      ...prev,
      songDuration: audioTrack.current.duration,
    }));
  };

  const handleTimeUpdate = () => {
    setPbState((prev) => ({
      ...prev,
      songTime: audioTrack.current.currentTime,
    }));
  };

  const changeTime = (e) => {
    const clickedWidth = e.clientX;
    const areaWidth = e.currentTarget.clientWidth;
    audioTrack.current.currentTime =
      (clickedWidth / areaWidth) * pbState.songDuration;
  };

  const togglePltControl = () => {
    const text = pbState.playlistControl;
    switch (text) {
      case "repeat":
        setPbState((prev) => ({ ...prev, playlistControl: "repeat_one" }));
        break;

      case "repeat_one":
        setPbState((prev) => ({ ...prev, playlistControl: "shuffle" }));
        break;

      case "shuffle":
        setPbState((prev) => ({ ...prev, playlistControl: "repeat" }));
        break;

      default:
        break;
    }
  };

  const nextSong = (type) => {
    const text = pbState.playlistControl;
    let index = songIndex >= playlist.length ? playlist.length - 1 : songIndex;

    switch (text) {
      case "repeat":
        const totalSongs = playlist.length;
        index =
          type === "prev"
            ? (songIndex - 1 + totalSongs) % totalSongs
            : (songIndex + 1) % totalSongs;

        setAppState((prev) => ({ ...prev, songIndex: index }));
        break;

      case "repeat_one":
        audioTrack.current.currentTime = 0;
        audioTrack.current.play();
        break;

      case "shuffle":
        while (songIndex === index) {
          index = Math.floor(Math.random() * playlist.length);
        }

        setAppState((prev) => ({ ...prev, songIndex: index }));
        break;

      default:
        break;
    }
  };

  const setFavorites = () => {
    let favorites = localStorage.getItem("favorites");
    favorites = favorites ? JSON.parse(favorites) : [];

    if (pbState.favorite) {
      favorites = favorites.filter(
        (i) => i.name !== song.name || i.artiste !== song.artiste
      );
    } else {
      favorites.push(song);
    }
    setAppState((prev) => ({ ...prev, favorites }));
    setPbState((prev) => ({ ...prev, favorite: !prev.favorite }));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (song) {
      if (playing) {
        audioTrack.current.play();
      } else {
        audioTrack.current.pause();
      }
    }
  }, [playing, song]);

  useEffect(() => {
    let favorites = localStorage.getItem("favorites");
    favorites = favorites ? JSON.parse(favorites) : [];

    if (favorites) {
      let exists = favorites.some(
        (i) => song.name === i.name && song.artiste === i.artiste
      );
      setPbState((prev) => ({ ...prev, favorite: exists }));
    }
  }, [song]);

  return (
    <>
      {song && (
        <div id="playbar">
          <div id="progressarea" ref={progressbar} onClick={changeTime}>
            <div
              id="progressbar"
              style={{
                width: `${(pbState.songTime / pbState.songDuration) * 100}%`,
              }}
            ></div>
          </div>

          <div id="trackmeta">
            <div id="controls">
              <div className="trackcontrols">
                <i
                  className="material-icons"
                  id="skipprev"
                  onClick={() => nextSong("prev")}
                >
                  skip_previous
                </i>
                <i
                  className="material-icons"
                  id="play-pause"
                  onClick={togglePlay}
                >
                  {playing ? "pause" : "play_arrow"}
                </i>
                <i
                  className="material-icons"
                  id="skipnext"
                  onClick={() => nextSong("")}
                >
                  skip_next
                </i>
              </div>
            </div>

            <div id="trackdata">
              <div className="trackimg smhide2">
                <img src={song.image} alt="trackimg" />
              </div>
              <div className="trackdetails">
                <p id="trackname">{song.name}</p>
                <p id="trackartiste">{song.artiste}</p>
              </div>
              <div id="trackaudio">
                <audio
                  ref={audioTrack}
                  src={song.source}
                  onEnded={() => nextSong("")}
                  onLoadedData={handleMeta}
                  onTimeUpdate={handleTimeUpdate}
                ></audio>
              </div>
            </div>

            <div id="controls2" className="trackcontrols">
              <div id="timestamp" className="smhide">
                <p>
                  <span id="currenttime">{formatTime(pbState.songTime)}</span>
                  <span> / </span>
                  <span id="duration">{formatTime(pbState.songDuration)}</span>
                </p>
              </div>
              <i
                className="material-icons playlistcontrols"
                onClick={togglePltControl}
              >
                {pbState.playlistControl}
              </i>
              <i
                className="material-icons playlistcontrols"
                onClick={setFavorites}
                style={{ color: pbState.favorite ? "red" : "grey" }}
              >
                favorite
              </i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Playbar;
