/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useContext } from "react";
import { YouTubeProps } from "react-youtube";
import "./VideoPlayer.css";
import socketIOClient from "socket.io-client";
import Queue from "./Queue/Queue";
import UserSetting from "./UserSetting/UserSetting";
import { VideoItem } from "../../types/VideoItem";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../store/UserContext/UserContext";

const serverEndpoint: string | undefined =
  process.env.REACT_APP_SERVER_ENDPOINT;

const VideoPlayer = () => {
  const [videoQueue, setVideoQueue] = useState<VideoItem[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [endTriggered, setEndTriggered] = useState(false);
  const [volume, setVolume] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavoriteToggled, setIsFavoriteToggled] = useState(false);

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("Header must be used within a UserProvider");
  }

  const { user } = userContext;

  useEffect(() => {
    if (!serverEndpoint) {
      console.error("SERVER_ENDPOINT is not defined");
      return;
    }
    const socket = socketIOClient(serverEndpoint);
    socket.on("updateQueue", (queue) => {
      setVideoQueue(queue);
      if (currentVideo === null && queue.length > 0) {
        setCurrentVideo(queue[0]);
      }
    });

    socket.on("setPlayPause", (isPlayingFromServer) => {
      setIsPlaying(isPlayingFromServer);
      if (isPlayingFromServer) {
        playerRef.current.internalPlayer.playVideo();
      } else {
        playerRef.current.internalPlayer.pauseVideo();
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
    if (!serverEndpoint) {
      console.error("SERVER_ENDPOINT is not defined");
      return;
    }
    const socket = socketIOClient(serverEndpoint);

    socket.emit("addVideo", video);

    socket.on("videoExists", () => {
      toast.error("This video is already in the queue!");
      return;
    });

    socket.on("videoAdded", () => {
      toast.success("Video was added!");
    });
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
    toast.success("Video was deleted!");
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    setVolume(newVolume);
    console.log("newVolume", newVolume);

    if (playerRef.current && playerRef.current.internalPlayer) {
      playerRef.current.internalPlayer.setVolume(newVolume);
    }
  };

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.internalPlayer.pauseVideo();
      } else {
        playerRef.current.internalPlayer.playVideo();
      }
      setIsPlaying(!isPlaying);

      // Отправляем текущее состояние воспроизведения на сервер
      if (serverEndpoint) {
        const socket = socketIOClient(serverEndpoint);
        socket.emit("togglePlayPause", !isPlaying);
      }
    }
  };

  const toggleFavorite = (video: VideoItem) => {
    if (!user) {
      toast.error(`You are not authorized!`);
      return;
    }
    fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/favorite/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user, video }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message.includes("added")) {
          toast.success("Video was added to favorite!");
          setIsFavoriteToggled((prevState) => !prevState);
        } else {
          toast.success("Video was deleted from favorite!");
          setIsFavoriteToggled((prevState) => !prevState);
        }
      })
      .catch((error) => {
        toast.error(`There was an error toggling the favorite video:${error}`);
      });
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
        toggleFavorite={toggleFavorite}
      />
      <UserSetting
        onVideoSelect={onVideoSelect}
        toggleFavorite={toggleFavorite}
        isFavoriteToggled={isFavoriteToggled}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default VideoPlayer;
