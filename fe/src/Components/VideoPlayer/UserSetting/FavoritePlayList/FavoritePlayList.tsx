import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "../../../../context/UserContext/UserContext";
import axios from "axios";
import {
  AddIcon,
  StarEmptyIcon,
  StarSolidIcon,
} from "../../../../assets/svg/svg";
import { FavoriteContext } from "../../../../context/FavoriteContext/FavoriteContext";
import { VideoItem } from "../../../../utils/types/video-item.type";
import Paragraph from "@/Components/UI/Paragraph/Paragraph";
import ParagraphTypeEnum from "@/utils/enums/paragraph-type.enum";
import Heading from "@/Components/UI/Heading/Heading";
import HeadingTypeEnum from "@/utils/enums/heading-type.enum";
import DefaultButton from "@/Components/UI/DefaultButton/DefaultButton";

const FavoritePlayList: FC<any> = ({
  toggleFavorite,
  onVideoSelect,
  isFavoriteToggled,
}) => {
  const userContext = useContext(UserContext);
  const favoriteContext = useContext(FavoriteContext);

  if (!userContext || !favoriteContext) {
    throw new Error(
      "Component must be used within a UserProvider and FavoriteProvider"
    );
  }

  const { user } = userContext;
  const { favoriteUserList, setFavoriteUserList } = favoriteContext;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (user) {
          const response: any = await axios.get(
            `${process.env.REACT_APP_SERVER_ENDPOINT}/favoriteList`,
            {
              params: {
                email: user,
              },
            }
          );
          if (response) {
            setFavoriteUserList(response.data.favoriteVideos);
          }
        }
      } catch (error) {}
    };

    fetchFavorites();
  }, [user, isFavoriteToggled]);

  const addAllFavorite = () => {
    if (favoriteUserList && favoriteUserList.length > 0) {
      favoriteUserList.forEach((video) => {
        onVideoSelect({
          id: video.id,
          title: video.title,
          duration: video.duration,
          ...(user ? { added: user } : {}),
        });
      });
    }
  };

  const isVideoFavorite = (video: VideoItem) => {
    return favoriteUserList.some(
      (favoriteVideo) => favoriteVideo.id === video.id
    );
  };

  return (
    <div className="p-6 md:p-8 flex gap-2 flex-col">
      {favoriteUserList && user && (
        <DefaultButton onClick={addAllFavorite}>
          {"Add all to queue".toLocaleUpperCase()}
        </DefaultButton>
      )}
      <div className="FavoritePlayList__results-container">
        {favoriteUserList &&
          favoriteUserList.map((video, index) => (
            <div
              key={video.id + "favorite"}
              className={`flex flex-col-reverse md:flex-row-reverse gap-4 md:items-center md:justify-between md:gap-8 py-6 ${
                favoriteUserList.length - 1 !== index
                  ? "border-b border-accent-gray300"
                  : ""
              }`}
            >
              <div className="flex gap-4 items-center flex-row-reverse">
                <span
                  className="cursor-pointer"
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
                <span
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={() => toggleFavorite(video)}
                >
                  {isVideoFavorite(video) ? (
                    <StarSolidIcon />
                  ) : (
                    <StarEmptyIcon />
                  )}
                </span>
              </div>

              <div>
                <Heading type={HeadingTypeEnum.h3_Default}>
                  {video.title.length > 50
                    ? video.title.slice(0, 40) + "..."
                    : video.title}
                </Heading>
                <Paragraph
                  type={ParagraphTypeEnum.p2_Default}
                  className="result-duration"
                >
                  Length: {video.duration}
                </Paragraph>
              </div>
            </div>
          ))}
      </div>

      {!user && <div style={{ marginTop: "20px  " }}>You must log in</div>}
      {user && favoriteUserList && favoriteUserList.length === 0 && (
        <div style={{ marginTop: "20px  " }}>No favorite videos</div>
      )}
    </div>
  );
};

export default FavoritePlayList;
