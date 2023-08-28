/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useContext } from "react";
import { YouTubeProps } from "react-youtube";
import "./VideoPlayer.css";
import socketIOClient, { Socket } from "socket.io-client";
import Queue from "./Queue/Queue";
import UserSetting from "./UserSetting/UserSetting";
import { VideoItem } from "../../types/VideoItem";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext/UserContext";
import { VideoListContext } from "../../context/VideoListContext/VideoListContext";

const serverEndpoint: string | undefined =
  process.env.REACT_APP_SERVER_ENDPOINT;

const VideoPlayer = () => {
  const [videoQueue, setVideoQueue] = useState<VideoItem[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [endTriggered, setEndTriggered] = useState(false);
  const [volume, setVolume] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavoriteToggled, setIsFavoriteToggled] = useState(false);
  const [userCount, setUserCount] = useState(0);

  const currentVideoRef = useRef(currentVideo);

  useEffect(() => {
    currentVideoRef.current = currentVideo;
  }, [currentVideo]);

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("Header must be used within a UserProvider");
  }

  const { user } = userContext;

  const videoListContext = useContext(VideoListContext);

  const { videoList, setVideoList } = videoListContext;

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!serverEndpoint) {
      console.error("SERVER_ENDPOINT is not defined");
      return;
    }
    socketRef.current = socketIOClient(serverEndpoint);

    socketRef.current.on("setPlayPause", (isPlayingFromServer) => {
      setIsPlaying(isPlayingFromServer);
      if (isPlayingFromServer) {
        playerRef.current.internalPlayer.playVideo();
      } else {
        playerRef.current.internalPlayer.pauseVideo();
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

  useEffect(() => {
    if (!serverEndpoint) {
      console.error("SERVER_ENDPOINT is not defined");
      return;
    }
    // socketRef.current = socketIOClient(serverEndpoint);

    socketRef?.current?.on("updateQueue", (queue) => {
      if (videoList!.length > 0) {
        // Фильтруем видео, которых ещё нет в videoList
        const newVideos = queue.filter(
          (queueVideo: VideoItem) =>
            !videoList!.some(
              (listVideo: VideoItem) => listVideo.id === queueVideo.id
            )
        );

        // Добавляем новые видео к videoList
        if (newVideos.length > 0) {
          setVideoList!([...videoList!, ...newVideos]);
        }
      } else {
        // Если videoList пуст, просто устанавливаем его в значение queue
        setVideoList!(queue);
      }

      setVideoQueue(queue);

      if (currentVideoRef.current === null && queue.length > 0) {
        setCurrentVideo(queue[0]);
      }
    });
  }, [serverEndpoint, videoList]);

  const onEnd = () => {
    if (endTriggered) return;
    setEndTriggered(true);

    const currentIndex = videoList!.findIndex(
      (video) => video.id === currentVideo?.id
    );

    if (currentIndex !== -1 && currentIndex < videoList!.length - 1) {
      // Если текущее видео не последнее в очереди, переключаемся на следующее
      setCurrentVideo(videoList![currentIndex + 1]);
    } else if (currentIndex === videoList!.length - 1) {
      // Если текущее видео последнее в очереди, делаем что-то еще (например, переключаемся на первое видео или ставим текущее видео в null)
      setCurrentVideo(videoList![0]);
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

    if (socketRef.current) {
      socketRef.current.emit("addVideo", video);
    }
  };

  const playerRef = useRef<any>(null);

  useEffect(() => {
    let videoStarted = false;
    if (playerRef.current && playerRef.current.internalPlayer) {
      playerRef.current.internalPlayer
        .getPlayerState()
        .then((result: any) => {
          if (result === 3) {
            playerRef.current.internalPlayer.playVideo();
          }
          if (result === 1) {
            videoStarted = true; // Видео начало воспроизводиться
          }
          if ((result === -1 || result === 0) && videoStarted) {
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
    if (socketRef.current) {
      socketRef.current.emit("removeVideo", videoId);
    }

    // Удаление из videoQueue
    setVideoQueue(videoQueue.filter((video) => video.id !== videoId));

    // Удаление из videoList
    if (videoList) {
      const newVideoList = videoList.filter((video) => video.id !== videoId);
      setVideoList!(newVideoList);
    }

    toast.success("Video was deleted!");
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
    const shuffledQueue = [...videoList!];
    // Перемешивание массива (здесь можно использовать ваш алгоритм для перемешивания)
    shuffledQueue.sort(() => Math.random() - 0.5);

    if (currentVideo) {
      const currentIndex = shuffledQueue.findIndex(
        (video) => video.id === currentVideo.id
      );
      if (currentIndex !== -1) {
        const [removed] = shuffledQueue.splice(currentIndex, 1);
        shuffledQueue.unshift(removed);
      }
    }

    setVideoQueue(shuffledQueue);
    setVideoList!(shuffledQueue);
  };

  const switchToVideo = (videoId: string) => {
    const videoToSwitch = videoList!.find((video) => video.id === videoId);
    if (videoToSwitch) {
      setCurrentVideo(videoToSwitch);
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
        videoQueue={videoList}
        removeVideoFromQueue={removeVideoFromQueue}
        toggleFavorite={toggleFavorite}
        userCount={userCount}
        shuffleVideoListHandler={shuffleVideoListHandler}
        switchToVideo={switchToVideo}
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
