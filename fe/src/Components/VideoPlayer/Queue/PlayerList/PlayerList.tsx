import React, { FC } from "react";
import "./PlayerList.css";
import { VideoItem } from "../../../../types/VideoItem";
import {
  DeleteIcon,
  PlayIcon,
  StarEmptyIcon,
  VolumeAnimatedIcon,
} from "../../../../assets/svg/svg";

const PlayerList: FC<any> = ({
  videoQueue,
  removeVideoFromQueue,
  toggleFavorite,
  currentVideo,
  switchToVideo,
}) => {
  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <div className="queue">
        {videoQueue &&
          videoQueue.map((video: VideoItem, index: any) => {
            return (
              <div className="video__container" key={video.id}>
                {currentVideo &&
                  currentVideo.id &&
                  currentVideo.id === video.id && <VolumeAnimatedIcon />}
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
                  <StarEmptyIcon />
                </span>
                <span
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={() => switchToVideo(video.id)}
                >
                  <PlayIcon />
                </span>
                {video.added ? (
                  <p className="video__added">Added by {video.added}</p>
                ) : (
                  <p className="video__added">Added by Anonymous</p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlayerList;
