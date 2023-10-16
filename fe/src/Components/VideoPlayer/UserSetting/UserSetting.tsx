import React, { FC, useState, useContext } from "react";
import YouTubeSearch from "./YouTubeSearch/YouTubeSearch";
import FavoritePlayList from "./FavoritePlayList/FavoritePlayList";
import ReadMe from "./ReadMe/ReadMe";
import UserSettingsTabTypeEnum from "../../../utils/enums/user-settings-tab-type.enum";
import { VideoItem } from "../../../utils/types/video-item.type";
import { ThemeContext } from "@/context/ThemeContext/ThemeContext";
import { LikesIcon, ReadMeIcon, SearchIcon, UsersIcon } from "@/assets/svg/svg";
import { UserContext } from "@/context/UserContext/UserContext";

interface UserSettingProps {
  onVideoSelect: (video: VideoItem) => void;
  toggleFavorite: (video: VideoItem) => void;
  isFavoriteToggled: boolean;
}

const TAB_CONFIG = [
  {
    id: UserSettingsTabTypeEnum.YouTubeSearch,
    title: "SEARCH",
    icon: <SearchIcon hover={false} />,
    component: (props: UserSettingProps) => <YouTubeSearch {...props} />,
  },
  {
    id: UserSettingsTabTypeEnum.FavoritePlayList,
    title: "LIKES",
    icon: <LikesIcon hover={false} />,
    component: (props: UserSettingProps) => <FavoritePlayList {...props} />,
    isUser: true,
  },
  {
    id: UserSettingsTabTypeEnum.ReadMe,
    title: "READ ME",
    icon: <ReadMeIcon hover={false} />,
    component: () => <ReadMe />,
  },
  {
    id: UserSettingsTabTypeEnum.Users,
    title: "USERS",
    icon: <UsersIcon hover={false} />,
    component: () => <ReadMe />,
    isUser: true,
    isAdmin: true,
  },
];

const UserSetting: FC<UserSettingProps> = ({
  onVideoSelect,
  toggleFavorite,
  isFavoriteToggled,
}) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("VideoPlayer must be used within a UserProvider");
  }
  const { user, role } = userContext;

  const [activeTab, setActiveTab] = useState(
    UserSettingsTabTypeEnum.YouTubeSearch
  );

  const [hoveredTab, setHoveredTab] = useState<UserSettingsTabTypeEnum | null>(
    null
  );

  const { mode } = useContext(ThemeContext);

  // function for touch devices to swipe between tabs
  const handleTouchMove = (e: any) => {
    e.currentTarget.scrollBy({
      top: 0,
      left: e.deltaX,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`${
        mode === "dark"
          ? "bg-background-bgDark100"
          : "bg-background-bgLight200 border-solid border-accent-gray200 border"
      } rounded-md xl:min-w-[384px] 2xl:min-w-[557px] 2xl:w-[557px]`}
    >
      <div className="flex overflow-auto scrollbar-none">
        {TAB_CONFIG.map((tab) => {
          if (
            (!tab.isUser && !tab.isAdmin) ||
            (tab.isUser && user) ||
            (tab.isAdmin && role === "admin")
          ) {
            return (
              <button
                key={tab.id}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                onTouchMove={handleTouchMove}
                className={`${
                  mode === "dark"
                    ? "text-neutral-white"
                    : "text-primary-blackPetrol border-solid border-t border-l border-b border-r"
                } ${
                  activeTab !== tab.id &&
                  mode === "dark" &&
                  "bg-background-bgDark200"
                } ${
                  activeTab === tab.id &&
                  mode !== "dark" &&
                  "bg-background-bgLight100  border-b-0"
                } px-2 py-4 border-accent-gray100 w-full font-nunitoSans font-bold hover:text-secondary-lightPetrol flex flex-col items-center justify-center gap-2 min-w-[100px]`}
                onClick={() => setActiveTab(tab.id)}
              >
                {React.cloneElement(tab.icon, { hover: hoveredTab === tab.id })}
                {tab.title}
              </button>
            );
          }
          return null;
        })}
      </div>
      <div>
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
