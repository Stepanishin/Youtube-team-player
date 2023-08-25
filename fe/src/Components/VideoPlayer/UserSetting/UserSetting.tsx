import React, { FC, useState } from "react";
import YouTubeSearch from "./YouTubeSearch/YouTubeSearch";
import FavoritePlayList from "./FavoritePlayList/FavoritePlayList";
import "./UserSetting.css";

const UserSetting: FC<any> = ({
  onVideoSelect,
  toggleFavorite,
  isFavoriteToggled,
}) => {
  const [activeTab, setActiveTab] = useState("YouTubeSearch");
  return (
    <div className="VideoPlayer__wrapper right-side">
      <div className="tabs">
        <button
          className={
            activeTab === "YouTubeSearch" ? "tabs-btn active" : "tabs-btn"
          }
          onClick={() => setActiveTab("YouTubeSearch")}
        >
          YouTube Search
        </button>
        <button
          className={
            activeTab === "FavoritePlayList" ? "tabs-btn active" : "tabs-btn"
          }
          onClick={() => setActiveTab("FavoritePlayList")}
        >
          Favorite PlayList
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "YouTubeSearch" && (
          <YouTubeSearch
            onVideoSelect={onVideoSelect}
            toggleFavorite={toggleFavorite}
          />
        )}
        {activeTab === "FavoritePlayList" && (
          <FavoritePlayList
            onVideoSelect={onVideoSelect}
            toggleFavorite={toggleFavorite}
            isFavoriteToggled={isFavoriteToggled}
          />
        )}
      </div>
    </div>
  );
};

export default UserSetting;
