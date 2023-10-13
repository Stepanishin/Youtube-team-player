import React, { FC, useContext, useRef } from "react";
import "./PlayerList.css";
import { VideoItem } from "../../../../utils/types/video-item.type";
import {
  DeleteIcon,
  DragAndDropIcon,
  StarEmptyIcon,
  StarSolidIcon,
  VolumeAnimatedIcon,
} from "../../../../assets/svg/svg";
import { FavoriteContext } from "@/context/FavoriteContext/FavoriteContext";
import { UserContext } from "../../../../context/UserContext/UserContext";

const PlayerList: FC<any> = ({
  videoQueue,
  removeVideoFromQueue,
  toggleFavorite,
  updateVideoQueue,
}) => {
  const favoriteContext = useContext(FavoriteContext);
  const userContext = useContext(UserContext);

  if (!favoriteContext || !userContext) {
    throw new Error(
      "Component must be used within a UserProvider and FavoriteProvider"
    );
  }

  const { favoriteUserList } = favoriteContext;
  const { user, role } = userContext;

  const isVideoFavorite = (video: VideoItem) => {
    return favoriteUserList.some(
      (favoriteVideo) => favoriteVideo.id === video.id
    );
  };

  const dragItem = useRef<HTMLElement | null>(null);
  const dragItemIndex = useRef(null);

  const handleDragStart = (e: any, index: any) => {
    // Проверяем, является ли пользователь администратором и не является ли элемент первым в списке
    if (index !== 0) {
      dragItem.current = e.currentTarget.closest(".video__container");
      dragItemIndex.current = index;

      // Установить "призрачный" элемент для перетаскивания
      if (dragItem.current) {
        e.dataTransfer.setDragImage(dragItem.current, 0, 0);
      }
    } else {
      e.preventDefault();
    }
  };

  const handleDragEnter = (e: any, index: any) => {
    if (
      dragItemIndex.current !== null &&
      dragItemIndex.current !== index &&
      index !== 0
    ) {
      const updatedVideoQueue = [...videoQueue];
      const [removed] = updatedVideoQueue.splice(dragItemIndex.current ?? 0, 1);
      updatedVideoQueue.splice(index, 0, removed);
      dragItemIndex.current = index;

      e.target.classList.add("drag-over");

      updateVideoQueue(updatedVideoQueue, false);
    }
  };

  const handleDragEnd = (e: any) => {
    if (dragItem.current !== null) {
      dragItem.current.style.display = "flex";

      // Эта часть кода может быть перенесена из handleDragEnter
      if (dragItemIndex.current !== null) {
        const updatedVideoQueue = [...videoQueue];
        const [removed] = updatedVideoQueue.splice(
          dragItemIndex.current ?? 0,
          1
        );
        updatedVideoQueue.splice(dragItemIndex.current, 0, removed);

        // Обновляем состояние videoQueue в самом конце, после всех изменений
        updateVideoQueue(updatedVideoQueue, true);
      }

      dragItem.current = null;
      dragItemIndex.current = null;
    }
  };

  return (
    <>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <div className="queue">
          {videoQueue.map((video: VideoItem, index: any) => (
            <div
              className="video__container"
              key={video.id}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
            >
              {index === 0 && <VolumeAnimatedIcon />}
              {user && role === "admin" && index !== 0 && (
                <span
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  style={{ cursor: "grab" }}
                >
                  <DragAndDropIcon />
                </span>
              )}

              {video.title && (
                <p style={{ marginLeft: "10px" }}>
                  {index + 1}: {video.title}
                </p>
              )}

              <p className="video__container_duration">{video.duration}</p>
              {user && role === "admin" && (
                <span
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={() => removeVideoFromQueue(video.id)}
                >
                  <DeleteIcon />
                </span>
              )}

              <span
                style={{ marginLeft: "5px", cursor: "pointer" }}
                onClick={() => toggleFavorite(video)}
              >
                {isVideoFavorite(video) ? <StarSolidIcon /> : <StarEmptyIcon />}
              </span>
              {video.added ? (
                <p className="video__added">Added by {video.added}</p>
              ) : (
                <p className="video__added">Added by Anonymous</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlayerList;
