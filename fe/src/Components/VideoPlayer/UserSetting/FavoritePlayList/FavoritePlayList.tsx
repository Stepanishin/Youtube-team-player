import React, { FC, useContext, useEffect } from "react";
import "./FavoritePlayList.css";
import { UserContext } from "../../../../context/UserContext/UserContext";
import axios from "axios";
import {
  AddIcon,
  StarEmptyIcon,
  StarSolidIcon,
} from "../../../../assets/svg/svg";
import { FavoriteContext } from "../../../../context/FavoriteContext/FavoriteContext";
import { VideoItem } from "../../../../utils/types/video-item.type";

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
    <div className="FavoritePlayList__container">
      {favoriteUserList && user && (
        <button className="button" onClick={addAllFavorite}>
          Add all to queue
        </button>
      )}
      <div className="FavoritePlayList__results-container">
        {favoriteUserList &&
          favoriteUserList.map((video) => (
            <div key={video.id + "favorite"} className="result-item">
              <div className="result__icon-wrapper">
                <span
                  className="result-button"
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

              <p className="result-title">
                {video.title.length > 50
                  ? video.title.slice(0, 40) + "..."
                  : video.title}
              </p>
              <p className="result-duration">{video.duration}</p>
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
