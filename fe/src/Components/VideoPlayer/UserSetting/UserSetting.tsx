import React, { FC } from "react";
import YouTubeSearch from "./YouTubeSearch/YouTubeSearch";

const UserSetting: FC<any> = ({ onVideoSelect }) => {
  return (
    <div className="VideoPlayer__wrapper right-side">
      <YouTubeSearch onVideoSelect={onVideoSelect} />
    </div>
  );
};

export default UserSetting;
