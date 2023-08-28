import React, { FC, ReactNode, createContext, useState } from "react";
import { VideoItem } from "../../types/VideoItem";

interface IVideoListContext {
  videoList?: VideoItem[] | undefined;
  setVideoList?: (video: VideoItem[]) => void;
}

// Initialize with a default object that throws an error if the context is not provided
export const VideoListContext = createContext<IVideoListContext>({
  videoList: [],
});

interface VideoListProviderProps {
  children: ReactNode;
}

export const VideoListProvider: FC<VideoListProviderProps> = ({ children }) => {
  const [videoList, setVideoList] = useState<VideoItem[] | undefined>([]);

  return (
    <VideoListContext.Provider value={{ videoList, setVideoList }}>
      {children}
    </VideoListContext.Provider>
  );
};
