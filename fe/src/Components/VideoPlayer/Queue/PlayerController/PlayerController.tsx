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
import { UserContext } from "../../../../context/UserContext/UserContext";
import RangeInput from "@/Components/UI/RangeInput/RangeInput";

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
    handleVolumeChange(0);
  };

  const restoreVolume = () => {
    handleVolumeChange(prevVolume.current);
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
        <RangeInput volume={volume} handleVolumeChange={handleVolumeChange} />
        <span>
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
