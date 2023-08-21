import React, { FC } from "react";
import "./PlayerList.css";
import { VideoItem } from "../../../../types/VideoItem";

const PlayerList: FC<any> = ({ videoQueue, removeVideoFromQueue }) => {
  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <div className="queue">
        {videoQueue.map((video: VideoItem, index: any) => (
          <div className="video__container" key={video.id}>
            <p>
              {index + 1}: {video.title}
            </p>
            <p className="video__container_duration">{video.duration}</p>
            <button
              className="video__container_result-button"
              onClick={() => removeVideoFromQueue(video.id)}
            >
              -
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
