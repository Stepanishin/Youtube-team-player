import React, { FC, useContext, useEffect, useRef } from "react";
import {
  NextAudioIcon,
  PauseIcon,
  PlayIcon,
  PrevioustAudioIcon,
  ShuffleIcon,
  VolumeDecreaseIcon,
  VolumeIncreaseIcon,
  VolumeXIcon,
} from "../../../../assets/svg/svg";
import "./PlayerController.css";
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
    <div className="flex flex-col gap-5">
      {user && role === "admin" && (
        <div className="flex gap-8 items-center">
          <span className="cursor-pointer">
            <PrevioustAudioIcon />
          </span>
          <span className="cursor-pointer">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </span>
          <span className="cursor-pointer">
            <NextAudioIcon />
          </span>
          <span className="cursor-pointer" onClick={shuffleVideoListHandler}>
            <ShuffleIcon />
          </span>
        </div>
      )}
      <div className="flex gap-4 items-center">
        {volume === 0 ? (
          <span className="cursor-pointer" onClick={restoreVolume}>
            <VolumeXIcon />
          </span>
        ) : (
          <span className="cursor-pointer" onClick={muteVolume}>
            <VolumeDecreaseIcon />
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
        <span className="cursor-pointer">
          <VolumeIncreaseIcon />
        </span>
        <span className="cursor-pointer" onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </span>
      </div>
    </div>
  );
};

export default PlayerController;
