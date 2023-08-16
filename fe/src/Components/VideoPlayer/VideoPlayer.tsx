import React, { useState, useEffect, useRef } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import YouTubeSearch from "../YouTubeSearch/YouTubeSearch";
import "./VideoPlayer.css";
import socketIOClient from "socket.io-client";

export interface VideoItem {
  id: string;
  title: string;
  duration?: string;
}

const serverEndpoint: string | undefined =
  process.env.REACT_APP_SERVER_ENDPOINT;
const apiKey: string | undefined = process.env.REACT_APP_API_KEY;

const VideoPlayer = () => {
  const [videoQueue, setVideoQueue] = useState<VideoItem[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [endTriggered, setEndTriggered] = useState(false); // Флаг для блокировки повторного вызова onEnd

  useEffect(() => {
    if (!serverEndpoint) {
      console.error("SERVER_ENDPOINT is not defined");
      return;
    }
    const socket = socketIOClient(serverEndpoint);
    socket.on("updateQueue", (queue) => {
      setVideoQueue(queue);
      if (currentVideo === null && queue.length > 0) {
        console.log("currentVideo", queue[0]);
        setCurrentVideo(queue[0]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [currentVideo]);

  const onEnd = () => {
    if (endTriggered) return; // Если флаг уже установлен, не делаем ничего
    setEndTriggered(true); // Устанавливаем флаг

    const nextVideo = videoQueue.length > 1 ? videoQueue[1] : null;
    const videoIdToRemove = currentVideo ? currentVideo.id : null; // Получаем ID текущего видео для удаления

    if (videoIdToRemove) {
      if (!serverEndpoint) {
        console.error("SERVER_ENDPOINT is not defined");
        return;
      }
      const socket = socketIOClient(serverEndpoint);
      socket.emit("removeVideo", videoIdToRemove); // Отправляем ID видео на сервер для удаления
    }

    setVideoQueue(videoQueue.slice(1));
    setCurrentVideo(nextVideo);
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const onVideoSelect = (video: VideoItem) => {
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
      <div className="left-side">
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
        <p>Queue:</p>
        <div className="queue">
          {videoQueue.map((video, index) => (
            <div key={video.id}>
              <p>
                {index + 1}: {video.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="right-side">
        <YouTubeSearch onVideoSelect={onVideoSelect} apiKey={apiKey} />
      </div>
    </div>
  );
};

export default VideoPlayer;
