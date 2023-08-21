import React, { useState } from "react";
import { VideoItem } from "../VideoPlayer/VideoPlayer";
import "./YouTubeSearch.css";
import { formatDuration } from "../../helpers/formatDuration";

interface YouTubeSearchProps {
  onVideoSelect: (video: VideoItem) => void;
  apiKey: string | undefined;
}

const YouTubeSearch: React.FC<YouTubeSearchProps> = ({
  onVideoSelect,
  apiKey,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchYouTube = async (e: any) => {
    e.preventDefault();
    if (!apiKey) {
      console.error("API_KEY is not defined");
      return;
    }

    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=${apiKey}&type=video&maxResults=10`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    // Get videoIds
    const videoIds = searchData.items.map((item: any) => item.id.videoId);

    // Fetch video details
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(
      ","
    )}&key=${apiKey}`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    // Map search results with additional details
    const resultsWithDetails = searchData.items.map((item: any) => {
      const details = detailsData.items.find(
        (detail: any) => detail.id === item.id.videoId
      );
      console.log(details);
      const duration = formatDuration(details?.contentDetails?.duration);
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        duration,
        views: details?.statistics?.viewCount,
      };
    });

    setResults(resultsWithDetails);
    console.log(resultsWithDetails);
  };

  return (
    <div className="search-container">
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
        <div className="results-container">
          {results.map((result) => (
            <div key={result.id} className="result-item">
              <button
                className="result-button"
                onClick={() =>
                  onVideoSelect({
                    id: result.id,
                    title: result.title,
                    duration: result.duration,
                  })
                }
              >
                +
              </button>
              <p className="result-title">
                {result.title.length > 50
                  ? result.title.slice(0, 40) + "..."
                  : result.title}
              </p>
              <p className="result-duration">{result.duration}</p>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default YouTubeSearch;
