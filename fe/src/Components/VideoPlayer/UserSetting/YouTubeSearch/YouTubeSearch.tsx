import React, { useCallback, useContext, useState } from "react";
import { formatDuration } from "../../../../utils/helpers/formatDuration";
import { VideoItem } from "../../../../utils/types/video-item.type";
import toast, { Toaster } from "react-hot-toast";
import {
  AddIcon,
  StarEmptyIcon,
  StarSolidIcon,
} from "../../../../assets/svg/svg";
import { UserContext } from "../../../../context/UserContext/UserContext";
import { FavoriteContext } from "../../../../context/FavoriteContext/FavoriteContext";
import DefaultButton from "../../../UI/DefaultButton/DefaultButton";
import ParagraphTypeEnum from "@/utils/enums/paragraph-type.enum";
import Paragraph from "@/Components/UI/Paragraph/Paragraph";
import SearchInput from "@/Components/UI/SearchInput/SearchInput";
import Heading from "@/Components/UI/Heading/Heading";
import HeadingTypeEnum from "@/utils/enums/heading-type.enum";
import { UserResponse } from "@/utils/types/search-data.type";

interface YouTubeSearchProps {
  onVideoSelect: (video: VideoItem) => void;
  toggleFavorite: (video: VideoItem) => void;
}

const YouTubeSearch: React.FC<YouTubeSearchProps> = ({
  onVideoSelect,
  toggleFavorite,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<VideoItem[]>([]);

  const userContext = useContext(UserContext);
  const favoriteContext = useContext(FavoriteContext);

  if (!userContext || !favoriteContext) {
    throw new Error("Header must be used within a UserProvider");
  }

  const { user } = userContext;
  const { favoriteUserList } = favoriteContext;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchYouTube = useCallback(
    async (e: React.FormEvent<HTMLFormElement> | undefined) => {
      e?.preventDefault();

      try {
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=${process.env.REACT_APP_API_KEY}&type=video&maxResults=10`;
        const searchResponse = await fetch(searchUrl);
        const searchData: UserResponse = await searchResponse.json();

        const videoIds = searchData.items.map((item) => item.id.videoId);

        const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(
          ","
        )}&key=${process.env.REACT_APP_API_KEY}`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();

        if (detailsData.error) {
          throw new Error(detailsData.error.message);
        }

        const resultsWithDetails = searchData.items.map((item) => {
          const details = detailsData.items.find(
            (detail: {
              id: string;
              title: string;
              duration: string;
              views: any;
            }) => detail.id === item.id.videoId
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
    <div className="p-6 md:p-8 flex gap-2 flex-col">
      {user ? (
        <>
          <form onSubmit={searchYouTube} className="flex gap-2 flex-col">
            <SearchInput
              searchTerm={searchTerm}
              handleChange={handleChange}
              placeholder={"Search music ..."}
            />
            <DefaultButton>SEARCH</DefaultButton>
          </form>
          <div>
            {results.map((result, index) => (
              <div
                key={result.id}
                className={`flex flex-col-reverse md:flex-row-reverse gap-4 md:items-center md:justify-between md:gap-8 py-6 ${
                  results.length - 1 !== index
                    ? "border-b border-accent-gray300"
                    : ""
                }`}
              >
                <div className="flex gap-4 items-center">
                  <span
                    className="cursor-pointer"
                    onClick={() => toggleFavorite(result)}
                  >
                    {isVideoFavorite(result) ? (
                      <StarSolidIcon />
                    ) : (
                      <StarEmptyIcon />
                    )}
                  </span>
                  <span
                    className="cursor-pointer"
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
                </div>

                <div>
                  <Heading type={HeadingTypeEnum.h3_Default}>
                    {result.title.length > 50
                      ? result.title.slice(0, 40) + "..."
                      : result.title}
                  </Heading>
                  <Paragraph
                    type={ParagraphTypeEnum.p2_Default}
                    className="result-duration"
                  >
                    Length: {result.duration}
                  </Paragraph>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Paragraph type={ParagraphTypeEnum.p1_Small}>
          Log in to access all the features.
        </Paragraph>
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default YouTubeSearch;
