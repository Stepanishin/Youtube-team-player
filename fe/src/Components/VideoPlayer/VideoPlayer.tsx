import React, { useState, useEffect, useRef } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import YouTubeSearch from "../YouTubeSearch/YouTubeSearch";
import "./VideoPlayer.css";
import socketIOClient from "socket.io-client";

export interface VideoItem {
  id: string;
  title: string;
  duration?: string;
  views?: string;
}

const serverEndpoint: string | undefined =
  process.env.REACT_APP_SERVER_ENDPOINT;
const apiKey: string | undefined = process.env.REACT_APP_API_KEY;

const VideoPlayer = () => {
  const [videoQueue, setVideoQueue] = useState<VideoItem[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [endTriggered, setEndTriggered] = useState(false);

  useEffect(() => {
    if (!serverEndpoint) {
      console.error("SERVER_ENDPOINT is not defined");
      return;
    }
    const socket = socketIOClient(serverEndpoint);
    socket.on("updateQueue", (queue) => {
      setVideoQueue(queue);
      console.log("queue", queue);
      if (currentVideo === null && queue.length > 0) {
        console.log("currentVideo", queue[0]);
        setCurrentVideo(queue[0]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onEnd = () => {
    if (endTriggered) return;
    setEndTriggered(true);

    const videoIdToRemove = currentVideo ? currentVideo.id : null;

    if (videoIdToRemove && serverEndpoint) {
      const socket = socketIOClient(serverEndpoint);
      socket.emit("removeVideo", videoIdToRemove);
    }
  };

  const opts: YouTubeProps["opts"] = {
    height: "120px",
    width: "200px",
    playerVars: {
      autoplay: 1,
    },
  };

  const onVideoSelect = (video: VideoItem) => {
    console.log(video);
    if (!serverEndpoint) {
      console.error("SERVER_ENDPOINT is not defined");
      return;
    }
    const socket = socketIOClient(serverEndpoint);
    socket.emit("addVideo", video);
  };

  const playerRef = useRef<any>(null);

  const onPause = () => {
    if (playerRef.current && playerRef.current.internalPlayer && currentVideo) {
      const currentTime = playerRef.current.internalPlayer
        .getCurrentTime()
        .then((result: any) => {
          playerRef.current.internalPlayer.loadVideoById({
            videoId: currentVideo.id,
            startSeconds: result,
          });
        })
        .catch((error: any) => {
          console.log("Error getting player state", error);
        });
      playerRef.current.internalPlayer.loadVideoById({
        videoId: currentVideo.id,
        startSeconds: currentTime,
      });
    }
  };

  useEffect(() => {
    if (playerRef.current && playerRef.current.internalPlayer) {
      playerRef.current.internalPlayer
        .getPlayerState()
        .then((result: any) => {
          if (result === 3) {
            playerRef.current.internalPlayer.playVideo();
          }
          if (result === -1 || result === 0) {
            onEnd();
          }
        })
        .catch((error: any) => {
          console.log("Error getting player state", error);
        });
    }
    if (currentVideo) {
      setEndTriggered(false); // Сбрасываем флаг, когда начинает воспроизводиться новое видео
    }
  }, [currentVideo]);

  return (
    <div className="video-container">
      <div className="VideoPlayer__wrapper left-side">
        <div className="VideoPlayer__left-side_wrapper">
          {currentVideo && (
            <YouTube
              videoId={currentVideo.id}
              opts={opts}
              onEnd={onEnd}
              ref={playerRef}
              onPause={onPause}
            />
          )}
          <p>
            Current video:{" "}
            <span className="current_title">{currentVideo?.title}</span>
          </p>
        </div>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <div className="queue">
            {videoQueue.map((video, index) => (
              <div className="video__container" key={video.id}>
                <p>
                  {index + 1}: {video.title}
                </p>
                <p className="video__container_duration">{video.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="VideoPlayer__wrapper right-side">
        <YouTubeSearch onVideoSelect={onVideoSelect} apiKey={apiKey} />
      </div>
    </div>
  );
};

export default VideoPlayer;
