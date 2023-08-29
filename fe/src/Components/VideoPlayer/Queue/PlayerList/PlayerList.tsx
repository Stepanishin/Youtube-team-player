import React, { FC, useContext } from "react";
import "./PlayerList.css";
import { VideoItem } from "../../../../types/VideoItem";
import {
  DeleteIcon,
  StarEmptyIcon,
  StarSolidIcon,
  VolumeAnimatedIcon,
} from "../../../../assets/svg/svg";
import { FavoriteContext } from "../../../../context/FavoriteContext/FavoriteContext";

const PlayerList: FC<any> = ({
  videoQueue,
  removeVideoFromQueue,
  toggleFavorite,
}) => {
  const favoriteContext = useContext(FavoriteContext);

  if (!favoriteContext) {
    throw new Error(
      "Component must be used within a UserProvider and FavoriteProvider"
    );
  }

  const { favoriteUserList, setFavoriteUserList } = favoriteContext;

  const isVideoFavorite = (video: VideoItem) => {
    return favoriteUserList.some(
      (favoriteVideo) => favoriteVideo.id === video.id
    );
  };
  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <div className="queue">
        {videoQueue.map((video: VideoItem, index: any) => (
          <div className="video__container" key={video.id}>
            {index === 0 && <VolumeAnimatedIcon />}
            {video.title && (
              <p style={{ marginLeft: "10px" }}>
                {index + 1}: {video.title}
              </p>
            )}

            <p className="video__container_duration">{video.duration}</p>
            <span
              style={{ marginLeft: "5px", cursor: "pointer" }}
              onClick={() => removeVideoFromQueue(video.id)}
            >
              <DeleteIcon />
            </span>
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
  );
};

export default PlayerList;
