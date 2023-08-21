/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { YouTubeProps } from "react-youtube";
import "./VideoPlayer.css";
import socketIOClient from "socket.io-client";
import Queue from "./Queue/Queue";
import UserSetting from "./UserSetting/UserSetting";
import { VideoItem } from "../../types/VideoItem";

const serverEndpoint: string | undefined =
  process.env.REACT_APP_SERVER_ENDPOINT;

const VideoPlayer = () => {
  const [videoQueue, setVideoQueue] = useState<VideoItem[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [endTriggered, setEndTriggered] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const removeVideoFromQueue = (videoId: string) => {
    if (!serverEndpoint) {
      console.error("SERVER_ENDPOINT is not defined");
      return;
    }
    const socket = socketIOClient(serverEndpoint);
    socket.emit("removeVideo", videoId);

    setVideoQueue(videoQueue.filter((video) => video.id !== videoId));
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    setVolume(newVolume);

    if (playerRef.current && playerRef.current.internalPlayer) {
      playerRef.current.internalPlayer.setVolume(newVolume);
    }
  };

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        console.log(playerRef.current);
        playerRef.current.internalPlayer.pauseVideo();
      } else {
        playerRef.current.internalPlayer.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="video-container">
      <Queue
        currentVideo={currentVideo}
        opts={opts}
        playerRef={playerRef}
        onEnd={onEnd}
        handleVolumeChange={handleVolumeChange}
        handlePlayPause={handlePlayPause}
        isPlaying={isPlaying}
        volume={volume}
        videoQueue={videoQueue}
        removeVideoFromQueue={removeVideoFromQueue}
      />
      <UserSetting onVideoSelect={onVideoSelect} />
    </div>
  );
};

export default VideoPlayer;
