import React, { FC, useEffect, useRef, useState } from "react";
import {
  PauseIcon,
  PlayIcon,
  ShuffleIcon,
  VolumeIcon,
  VolumeXIcon,
} from "../../../../assets/svg/svg";
import "./PlayerController.css";
import Tooltip from "../../../UI/Tooltip/Tooltip";

const PlayerController: FC<any> = ({
  volume,
  handleVolumeChange,
  handlePlayPause,
  isPlaying,
  shuffleVideoListHandler,
}) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const prevVolume = useRef(volume);

  useEffect(() => {
    if (volume > 0) {
      prevVolume.current = volume;
    }
  }, [volume]);

  const muteVolume = () => {
    const event = {
      target: { value: "0" },
    } as React.ChangeEvent<HTMLInputElement>;
    handleVolumeChange(event);
  };

  const restoreVolume = () => {
    const event = {
      target: { value: prevVolume.current.toString() },
    } as React.ChangeEvent<HTMLInputElement>;
    handleVolumeChange(event);
  };
  return (
    <div className="playerController">
      {volume === 0 ? (
        <span style={{ cursor: "pointer" }} onClick={restoreVolume}>
          <VolumeXIcon />
          {/* {showTooltip && <Tooltip>UnMute</Tooltip>} */}
        </span>
      ) : (
        <span style={{ cursor: "pointer" }} onClick={muteVolume}>
          <VolumeIcon />
          {/* {showTooltip && <Tooltip>Mute</Tooltip>} */}
        </span>
      )}

      <input
        type="range"
        id="volume"
        name="volume"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        className="range-input"
      />
      <span
        style={{ cursor: "pointer" }}
        onClick={handlePlayPause}
        onMouseEnter={() => setHoveredIcon("playpause")}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
        {hoveredIcon === "playpause" && <Tooltip>Play/Pause</Tooltip>}
      </span>

      <span
        style={{ cursor: "pointer" }}
        onClick={shuffleVideoListHandler}
        onMouseEnter={() => setHoveredIcon("shuffle")}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <ShuffleIcon />
        {hoveredIcon === "shuffle" && <Tooltip>Shuffle</Tooltip>}
      </span>
    </div>
  );
};

export default PlayerController;
