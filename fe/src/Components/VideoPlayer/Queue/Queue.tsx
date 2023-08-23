import { FC } from "react";
import YouTube from "react-youtube";
import "./Queue.css";
import PlayerController from "./PlayerController/PlayerController";
import PlayerList from "./PlayerList/PlayerList";
import { UsersIcon } from "../../../assets/svg/svg";

const Queue: FC<any> = ({
  currentVideo,
  opts,
  playerRef,
  onEnd,
  handleVolumeChange,
  handlePlayPause,
  isPlaying,
  volume,
  videoQueue,
  removeVideoFromQueue,
  toggleFavorite,
  userCount,
}) => {
  const onReady = (event: any) => {
    event.target.setVolume(volume);
  };

  return (
    <div className="VideoPlayer__wrapper left-side">
      <div className="VideoPlayer__left-side_wrapper">
        <p className="userCount_wrapper">
          <UsersIcon /> <span>{userCount}</span>
        </p>
        {currentVideo && (
          <YouTube
            videoId={currentVideo.id}
            opts={opts}
            onEnd={onEnd}
            ref={playerRef}
            onReady={onReady}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <p>
            Current video:{" "}
            <span className="current_title">{currentVideo?.title}</span>
          </p>
          <PlayerController
            volume={volume}
            handleVolumeChange={handleVolumeChange}
            handlePlayPause={handlePlayPause}
            isPlaying={isPlaying}
          />
        </div>
      </div>

      <PlayerList
        videoQueue={videoQueue}
        removeVideoFromQueue={removeVideoFromQueue}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default Queue;
