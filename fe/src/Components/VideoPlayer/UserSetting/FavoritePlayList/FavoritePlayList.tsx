import React, { FC, useContext, useEffect, useState } from "react";
import "./FavoritePlayList.css";
import { VideoItem } from "../../../../types/VideoItem";
import { UserContext } from "../../../../store/UserContext/UserContext";
import axios from "axios";
import { AddIcon, StarEmptyIcon } from "../../../../assets/svg/svg";

const FavoritePlayList: FC<any> = ({
  toggleFavorite,
  onVideoSelect,
  isFavoriteToggled,
}) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("Header must be used within a UserProvider");
  }

  const { user } = userContext;

  const [favoriteList, setFavoriteList] = useState<VideoItem[] | null>(null);

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
          console.log("response", response);
          if (response) {
            console.log("change");
            setFavoriteList(response.data.favoriteVideos);
          }
        }
      } catch (error) {}
    };

    fetchFavorites();
  }, [user, isFavoriteToggled]);

  const addAllFavorite = () => {
    if (favoriteList && favoriteList.length > 0) {
      favoriteList.forEach((video) => {
        onVideoSelect({
          id: video.id,
          title: video.title,
          duration: video.duration,
        });
      });
    }
  };

  return (
    <div>
      <div className="results-container">
        {favoriteList && (
          <button className="button" onClick={addAllFavorite}>
            Add all to queue
          </button>
        )}
        {favoriteList &&
          favoriteList.map((video) => (
            <div key={video.id + "favorite"} className="result-item">
              <div>
                <span
                  className="result-button"
                  onClick={() =>
                    onVideoSelect({
                      id: video.id,
                      title: video.title,
                      duration: video.duration,
                    })
                  }
                >
                  <AddIcon />
                </span>
                <span
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={() => toggleFavorite(video)}
                >
                  <StarEmptyIcon />
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
        {favoriteList && favoriteList.length === 0 && (
          <div style={{ marginTop: "20px  " }}>No favorite videos</div>
        )}
        {!user && <div style={{ marginTop: "20px  " }}>You must log in</div>}
      </div>
    </div>
  );
};

export default FavoritePlayList;
