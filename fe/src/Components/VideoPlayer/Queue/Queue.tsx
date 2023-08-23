import { FC } from "react";
import YouTube from "react-youtube";
import "./Queue.css";
import PlayerController from "./PlayerController/PlayerController";
import PlayerList from "./PlayerList/PlayerList";

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
}) => {
  const onReady = (event: any) => {
    event.target.setVolume(volume);
  };

  return (
    <div className="VideoPlayer__wrapper left-side">
      <div className="VideoPlayer__left-side_wrapper">
        {currentVideo && (
          <YouTube
            videoId={currentVideo.id}
            opts={opts}
            onEnd={onEnd}
            ref={playerRef}
            onReady={onReady}
          />
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
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
