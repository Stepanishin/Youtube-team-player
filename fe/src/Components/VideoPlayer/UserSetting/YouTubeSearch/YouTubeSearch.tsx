import React, { useCallback, useContext, useState } from "react";
import "./YouTubeSearch.css";
import { formatDuration } from "../../../../helpers/formatDuration";
import { VideoItem } from "../../../../types/VideoItem";
import toast, { Toaster } from "react-hot-toast";
import {
  AddIcon,
  StarEmptyIcon,
  StarSolidIcon,
} from "../../../../assets/svg/svg";
import { UserContext } from "../../../../context/UserContext/UserContext";
import { FavoriteContext } from "../../../../context/FavoriteContext/FavoriteContext";

interface YouTubeSearchProps {
  onVideoSelect: (video: VideoItem) => void;
  toggleFavorite: (video: VideoItem) => void;
}

const YouTubeSearch: React.FC<YouTubeSearchProps> = ({
  onVideoSelect,
  toggleFavorite,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);

  const userContext = useContext(UserContext);
  const favoriteContext = useContext(FavoriteContext);

  if (!userContext || !favoriteContext) {
    throw new Error("Header must be used within a UserProvider");
  }

  const { user, role } = userContext;
  const { favoriteUserList, setFavoriteUserList } = favoriteContext;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchYouTube = useCallback(
    async (e: any) => {
      e.preventDefault();

      try {
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=${process.env.REACT_APP_API_KEY}&type=video&maxResults=10`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (searchData.error) {
          throw new Error(searchData.error.message);
        }

        const videoIds = searchData.items.map((item: any) => item.id.videoId);

        const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(
          ","
        )}&key=${process.env.REACT_APP_API_KEY}`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();

        if (detailsData.error) {
          throw new Error(detailsData.error.message);
        }

        const resultsWithDetails = searchData.items.map((item: any) => {
          const details = detailsData.items.find(
            (detail: any) => detail.id === item.id.videoId
          );
          const duration = formatDuration(details?.contentDetails?.duration);
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            duration,
            views: details?.statistics?.viewCount,
          };
        });

        setResults(resultsWithDetails);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
        toast.error(
          "The request cannot be completed because you have exceeded your quota"
        );
      }
    },
    [searchTerm]
  );

  const isVideoFavorite = (video: VideoItem) => {
    return favoriteUserList.some(
      (favoriteVideo) => favoriteVideo.id === video.id
    );
  };

  return (
    <div className="search-container">
      {user ? (
        <>
          <form onSubmit={searchYouTube}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
          <div className="results-container">
            {results.map((result) => (
              <div key={result.id} className="result-item">
                <div className="result__icon-wrapper">
                  <span
                    className="result-button"
                    onClick={() =>
                      onVideoSelect({
                        id: result.id,
                        title: result.title,
                        duration: result.duration,
                        ...(user ? { added: user } : {}),
                      })
                    }
                  >
                    <AddIcon />
                  </span>
                  <span
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    onClick={() => toggleFavorite(result)}
                  >
                    {isVideoFavorite(result) ? (
                      <StarSolidIcon />
                    ) : (
                      <StarEmptyIcon />
                    )}
                  </span>
                </div>

                <p className="result-title">
                  {result.title.length > 50
                    ? result.title.slice(0, 40) + "..."
                    : result.title}
                </p>
                <p className="result-duration">{result.duration}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ marginTop: "20px  " }}>You must log in</div>
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default YouTubeSearch;
