/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useContext } from "react";
import { YouTubeProps } from "react-youtube";
import socketIOClient, { Socket } from "socket.io-client";
import Queue from "./Queue/Queue";
import UserSetting from "./UserSetting/UserSetting";
import { VideoItem } from "../../utils/types/video-item.type";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext/UserContext";

const serverEndpoint: string | undefined =
  process.env.REACT_APP_SERVER_ENDPOINT;

const VideoPlayer = () => {
  const [videoQueue, setVideoQueue] = useState<VideoItem[]>([]);
  const [recentlyPlayedQueue, setRecentlyPlayedQueue] = useState<VideoItem[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [endTriggered, setEndTriggered] = useState(false);
  const [volume, setVolume] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavoriteToggled, setIsFavoriteToggled] = useState(false);
  const [userCount, setUserCount] = useState(0);

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("VideoPlayer must be used within a UserProvider");
  }

  const { user } = userContext;

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!serverEndpoint) {
      console.error("SERVER_ENDPOINT is not defined");
      return;
    }
    socketRef.current = socketIOClient(serverEndpoint);
    socketRef.current.on("updateQueue", (queue) => {
      setVideoQueue(queue);
      if (currentVideo === null && queue.length > 0) {
        setCurrentVideo(queue[0]);
      }
    });

    socketRef.current.on("updateRecentlyPlayedQueue", (queue) => {
      setRecentlyPlayedQueue(queue);
    });

    socketRef.current.on("setPlayPause", (isPlayingFromServer) => {
      setIsPlaying(isPlayingFromServer);
      if (isPlayingFromServer) {
        playerRef.current?.internalPlayer.playVideo();
      } else {
        playerRef.current?.internalPlayer.pauseVideo();
      }
    });

    socketRef.current.on("videoExists", () => {
      toast.error("This video is already in the queue!");
    });

    socketRef.current.on("videoAdded", () => {
      toast.success("Video was added!");
    });

    socketRef.current.on("getUsersCount", (count) => {
      setUserCount(count);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const onEnd = () => {
    if (endTriggered) return;
    setEndTriggered(true);

    const videoToRemove = currentVideo ? currentVideo : null;

    if (videoToRemove && serverEndpoint) {
      if (socketRef.current) {
        socketRef.current.emit("removeVideoBySwitching", videoToRemove);
      }
    }
  };

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const onVideoSelect = (video: VideoItem) => {
    if (!serverEndpoint) {
      console.error("SERVER_ENDPOINT is not defined");
      return;
    }

    if (socketRef.current) {
      socketRef.current.emit("addVideo", video);
    }
  };

  const playerRef = useRef<{
    internalPlayer: {
      playVideo: () => void;
      pauseVideo: () => void;
      setVolume: (value: number) => void;
      getPlayerState: () => Promise<number>;
    };
  } | null>(null);

  useEffect(() => {
    let videoStarted = false;
    if (playerRef.current && playerRef.current.internalPlayer) {
      playerRef.current.internalPlayer
        .getPlayerState()
        .then((result) => {
          if (result === 3) {
            playerRef?.current?.internalPlayer.playVideo();
          }
          if (result === 1) {
            videoStarted = true; // Видео начало воспроизводиться
          }
          if ((result === -1 || result === 0) && videoStarted) {
            onEnd();
          }
        })
        .catch((error) => {
          console.log("Error getting player state", error);
        });
    }
    if (currentVideo) {
      setEndTriggered(false); // Сбрасываем флаг, когда начинает воспроизводиться новое видео
    }
  }, [currentVideo]);

  const removeVideoFromQueue = (deletedVideo: VideoItem) => {
    if (!serverEndpoint) {
      console.error("SERVER_ENDPOINT is not defined");
      return;
    }
    if (socketRef.current) {
      socketRef.current.emit("removeVideo", deletedVideo);
    }

    setVideoQueue(videoQueue.filter((video) => video.id !== deletedVideo.id));
    toast.success("Video was deleted!");
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);

    if (playerRef.current && playerRef.current.internalPlayer) {
      playerRef.current.internalPlayer.setVolume(value);
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
        if (socketRef.current) {
          socketRef.current.emit("togglePlayPause", !isPlaying);
        }
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

  const shuffleVideoListHandler = () => {
    if (!serverEndpoint) {
      console.error("SERVER_ENDPOINT is not defined");
      return;
    }
    if (socketRef.current) {
      socketRef.current.emit("shuffleVideoList");
    }
  };

  const updateVideoQueueByDragAndDrop = (
    newQueue: VideoItem[],
    isEnd: boolean = false
  ) => {
    setVideoQueue([videoQueue[0], ...newQueue]);
    if (socketRef.current && isEnd === true) {
      socketRef.current.emit("updateQueueByDragAndDrop", videoQueue);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row justify-center p-6 sm:p-8 gap-6 sm:gap-8 scrollbar-none">
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
        userCount={userCount}
        shuffleVideoListHandler={shuffleVideoListHandler}
        updateVideoQueue={updateVideoQueueByDragAndDrop}
        recentlyPlayedQueue={recentlyPlayedQueue}
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
