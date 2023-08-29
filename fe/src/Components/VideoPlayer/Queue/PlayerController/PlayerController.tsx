import React, { FC, useContext, useEffect, useRef, useState } from "react";
import {
  PauseIcon,
  PlayIcon,
  ShuffleIcon,
  VolumeIcon,
  VolumeXIcon,
} from "../../../../assets/svg/svg";
import "./PlayerController.css";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { UserContext } from "../../../../context/UserContext/UserContext";

const PlayerController: FC<any> = ({
  volume,
  handleVolumeChange,
  handlePlayPause,
  isPlaying,
  shuffleVideoListHandler,
}) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error(
      "Component must be used within a UserProvider and FavoriteProvider"
    );
  }

  const { user, role } = userContext;

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

      {user && role === "admin" && (
        <span style={{ cursor: "pointer" }} onClick={shuffleVideoListHandler}>
          <ShuffleIcon />
        </span>
      )}
    </div>
  );
};

export default PlayerController;
