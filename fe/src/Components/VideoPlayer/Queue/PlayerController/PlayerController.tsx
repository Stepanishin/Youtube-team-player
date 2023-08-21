import React, { FC } from "react";
import { PauseIcon, PlayIcon, VolumeIcon } from "../../../../assets/svg/svg";
import "./PlayerController.css";

const PlayerController: FC<any> = ({
  volume,
  handleVolumeChange,
  handlePlayPause,
  isPlaying,
}) => {
  return (
    <div className="playerController">
      <VolumeIcon />
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
      <button onClick={handlePlayPause}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
};

export default PlayerController;
