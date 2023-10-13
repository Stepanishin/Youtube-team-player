import React, { FC, ReactNode, createContext, useState } from "react";
import { VideoItem } from "../../utils/types/video-item.type";

export interface IFavoriteContext {
  favoriteUserList: VideoItem[];
  setFavoriteUserList: (list: VideoItem) => void;
}

export const FavoriteContext = createContext<IFavoriteContext | null>(null);

interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteProvider: FC<FavoriteProviderProps> = ({
  children,
}: FavoriteProviderProps) => {
  const [favoriteUserList, setFavoriteUserListState] = useState<VideoItem[]>(
    []
  );

  const setFavoriteUserList = (list: any) => {
    setFavoriteUserListState([...list]);
  };

  return (
    <FavoriteContext.Provider value={{ favoriteUserList, setFavoriteUserList }}>
      {children}
    </FavoriteContext.Provider>
  );
};
