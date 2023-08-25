import React, { FC, useEffect, useRef } from "react";
import {
  PauseIcon,
  PlayIcon,
  ShuffleIcon,
  VolumeIcon,
  VolumeXIcon,
} from "../../../../assets/svg/svg";
import "./PlayerController.css";

const PlayerController: FC<any> = ({
  volume,
  handleVolumeChange,
  handlePlayPause,
  isPlaying,
  shuffleVideoListHandler,
}) => {
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
        </span>
      ) : (
        <span style={{ cursor: "pointer" }} onClick={muteVolume}>
          <VolumeIcon />
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
      <span style={{ cursor: "pointer" }} onClick={handlePlayPause}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </span>
      <span style={{ cursor: "pointer" }} onClick={shuffleVideoListHandler}>
        <ShuffleIcon />
      </span>
    </div>
  );
};

export default PlayerController;
