import React, { useState } from "react";
import { VideoItem } from "../VideoPlayer/VideoPlayer";
import "./YouTubeSearch.css";

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
      console.error("SERVER_ENDPOINT is not defined");
      return;
    }
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=${apiKey}&type=video&maxResults=10`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setResults(data.items);
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
            <div
              key={result.id.videoId}
              onClick={() =>
                onVideoSelect({
                  id: result.id.videoId,
                  title: result.snippet.title,
                  duration: "N/A",
                })
              }
              className="result-item"
            >
              <img
                src={result.snippet.thumbnails.default.url}
                alt={result.snippet.title}
                className="result-image"
              />
              <p className="result-title">{result.snippet.title}</p>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default YouTubeSearch;
