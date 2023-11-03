import React, { FC, useContext, useRef } from "react";
import { VideoItem } from "../../../../utils/types/video-item.type";
import {
  AddIcon,
  DeleteIcon,
  DragAndDropIcon,
  StarEmptyIcon,
  StarSolidIcon,
} from "../../../../assets/svg/svg";
import { FavoriteContext } from "@/context/FavoriteContext/FavoriteContext";
import { UserContext } from "../../../../context/UserContext/UserContext";
import ParagraphTypeEnum from "@/utils/enums/paragraph-type.enum";
import Heading from "@/Components/UI/Heading/Heading";
import HeadingTypeEnum from "@/utils/enums/heading-type.enum";
import { ThemeContext } from "@/context/ThemeContext/ThemeContext";
import Paragraph from "@/Components/UI/Paragraph/Paragraph";

interface PlayerListProps {
  videoQueue: VideoItem[];
  removeVideoFromQueue: (deletedVideo: VideoItem) => void;
  toggleFavorite: (video: VideoItem) => void;
  updateVideoQueue: (newQueue: VideoItem[], isEnd?: boolean) => void;
  isRecentlyPlayed?: boolean;
  onVideoSelect?: (video: VideoItem) => void;
}

const PlayerList: FC<PlayerListProps> = ({
  videoQueue,
  removeVideoFromQueue,
  toggleFavorite,
  updateVideoQueue,
  isRecentlyPlayed,
  onVideoSelect,
}) => {
  const favoriteContext = useContext(FavoriteContext);
  const userContext = useContext(UserContext);

  const { mode } = useContext(ThemeContext);

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
  const dragItemIndex = useRef<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLSpanElement>,
    index: number
  ) => {
    dragItem.current = e.currentTarget.closest(".video__container");
    dragItemIndex.current = index;

    // Set "ghost" element for dragging
    if (dragItem.current) {
      e.dataTransfer.setDragImage(dragItem.current, 0, 0);
    }
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    if (dragItemIndex.current !== null && dragItemIndex.current !== index) {
      const updatedVideoQueue = [...videoQueue];
      const [removed] = updatedVideoQueue.splice(dragItemIndex.current ?? 0, 1);
      updatedVideoQueue.splice(index, 0, removed);
      dragItemIndex.current = index;

      (e.target as HTMLElement).classList.add("drag-over");

      updateVideoQueue(updatedVideoQueue, false);
    }
  };

  const handleDragEnd = () => {
    const updatedVideoQueue = [...videoQueue];
    const [removed] = updatedVideoQueue.splice(dragItemIndex.current ?? 0, 1);
    updatedVideoQueue.splice(dragItemIndex?.current!, 0, removed);
    updateVideoQueue(updatedVideoQueue, true);

    dragItem.current = null;
    dragItemIndex.current = null;
  };

  return (
    <div>
      <div className="queue">
        {videoQueue.map((video: VideoItem, index) => (
          <div
            className={`flex flex-col md:flex-row gap-4 md:items-center md:justify-between md:gap-8 py-6 ${
              videoQueue.length - 1 !== index
                ? "border-b border-accent-gray300"
                : ""
            }`}
            key={video.id}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragEnd={() => handleDragEnd()}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {user && role === "admin" && !isRecentlyPlayed && (
                  <span
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    style={{ cursor: "grab" }}
                  >
                    <DragAndDropIcon />
                  </span>
                )}
                {video.title && (
                  <Heading type={HeadingTypeEnum.h2_Small}>
                    {video.title}
                  </Heading>
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-1 md:gap-3 md:items-center">
                <Paragraph
                  type={ParagraphTypeEnum.p1_Small}
                  className="video__container_duration"
                >
                  Length: {video.duration}
                </Paragraph>
                <div
                  className={`${
                    mode === "dark"
                      ? "bg-neutral-white"
                      : "bg-primary-blackPetrol"
                  } hidden md:block w-2 h-2  rounded-full`}
                ></div>
                {video.added ? (
                  <Paragraph
                    type={ParagraphTypeEnum.p1_Small}
                    className="video__added"
                  >
                    Added by {video.added}
                  </Paragraph>
                ) : (
                  <Paragraph
                    type={ParagraphTypeEnum.p1_Small}
                    className="video__added"
                  >
                    Added by Anonymous
                  </Paragraph>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              {user && (
                <span
                  className="cursor-pointer"
                  onClick={() => toggleFavorite(video)}
                >
                  {isVideoFavorite(video) ? (
                    <StarSolidIcon />
                  ) : (
                    <StarEmptyIcon />
                  )}
                </span>
              )}

              {user && role === "admin" && !isRecentlyPlayed && (
                <span
                  className="cursor-pointer relative top-1"
                  onClick={() => removeVideoFromQueue(video)}
                >
                  <DeleteIcon />
                </span>
              )}

              {user &&
                onVideoSelect &&
                isRecentlyPlayed &&
                role === "admin" && (
                  <span
                    className="cursor-pointer relative top-1"
                    onClick={() =>
                      onVideoSelect({
                        id: video.id,
                        title: video.title,
                        duration: video.duration,
                        ...(user ? { added: user } : {}),
                      })
                    }
                  >
                    <AddIcon />
                  </span>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
