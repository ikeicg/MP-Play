import React, { useState, useEffect, useContext, useRef } from "react";
import "./Playbar.css";
import { PlayerContext } from "../../App";

const state = {
  playlistControl: "repeat",
  extendedPlaybar: false,
  songTime: 0,
  songDuration: 0,
};

const Playbar = () => {
  const { appState, setAppState } = useContext(PlayerContext);
  const [pbState, setPbState] = useState(state);
  const { playlist, songIndex, playing } = appState;
  const song = playlist[songIndex];

  const audioTrack = useRef();
  const progressbar = useRef();

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
    let index = songIndex;
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

  useEffect(() => {
    if (playing) {
      audioTrack.current.play();
    } else {
      audioTrack.current.pause();
    }
  }, [playing, song]);

  return (
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
            <i className="material-icons" id="play-pause" onClick={togglePlay}>
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
              aria-hidden={"true"}
              ref={audioTrack}
              src={song.source}
              onEnded={() => nextSong("")}
              onLoadedData={handleMeta}
              onTimeUpdate={handleTimeUpdate}
            ></audio>
          </div>
        </div>

        <div className="controls2 trackcontrols">
          <div id="timestamp" className="smhide">
            <p>
              <span id="currenttime">
                {Math.floor(pbState.songTime / 60)}:
                {Math.floor(pbState.songTime % 60)}
              </span>
              <span> / </span>
              <span id="duration">
                {Math.floor(pbState.songDuration / 60)}:
                {Math.floor(pbState.songDuration % 60)}
              </span>
            </p>
          </div>
          <i
            className="material-icons playlistcontrols"
            onClick={togglePltControl}
          >
            {pbState.playlistControl}
          </i>
        </div>
      </div>
    </div>
  );
};

export default Playbar;
