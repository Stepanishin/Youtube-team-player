import React, { FC, useState } from "react";
import YouTubeSearch from "./YouTubeSearch/YouTubeSearch";
import FavoritePlayList from "./FavoritePlayList/FavoritePlayList";
import ReadMe from "./ReadMe/ReadMe";
import UserSettingsTabTypeEnum from "../../../utils/enums/user-settings-tab-type.enum";
import "./UserSetting.css";
import { VideoItem } from "../../../utils/types/video-item.type";

interface UserSettingProps {
  onVideoSelect: (video: VideoItem) => void;
  toggleFavorite: (video: VideoItem) => void;
  isFavoriteToggled: boolean;
}

const TAB_CONFIG = [
  {
    id: UserSettingsTabTypeEnum.YouTubeSearch,
    title: "YouTube Search",
    component: (props: UserSettingProps) => <YouTubeSearch {...props} />,
  },
  {
    id: UserSettingsTabTypeEnum.FavoritePlayList,
    title: "Favorite PlayList",
    component: (props: UserSettingProps) => <FavoritePlayList {...props} />,
  },
  {
    id: UserSettingsTabTypeEnum.ReadMe,
    title: "Read.me",
    component: () => <ReadMe />,
  },
];

const UserSetting: FC<UserSettingProps> = ({
  onVideoSelect,
  toggleFavorite,
  isFavoriteToggled,
}) => {
  const [activeTab, setActiveTab] = useState(
    UserSettingsTabTypeEnum.YouTubeSearch
  );

  return (
    <div className="VideoPlayer__wrapper right-side">
      <div className="tabs">
        {TAB_CONFIG.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "tabs-btn active" : "tabs-btn"}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {TAB_CONFIG.map((tab) =>
          activeTab === tab.id ? (
            <tab.component
              key={tab.id}
              onVideoSelect={onVideoSelect}
              toggleFavorite={toggleFavorite}
              isFavoriteToggled={isFavoriteToggled}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default UserSetting;
