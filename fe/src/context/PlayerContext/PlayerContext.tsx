import { FC, ReactNode, createContext, useEffect, useState } from "react";

export interface IPlayerContext {
  isPlayerVisible: boolean;
  setPlayer: () => void;
}

export const PlayerContext = createContext<IPlayerContext | null>(null);

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: FC<PlayerProviderProps> = ({
  children,
}: PlayerProviderProps) => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(
    JSON.parse(localStorage.getItem("isPlayerVisible") || "false")
  );

  useEffect(() => {
    localStorage.setItem("isPlayerVisible", JSON.stringify(isPlayerVisible));
  }, [isPlayerVisible]);

  const setPlayer = () => {
    setIsPlayerVisible((prevState: boolean) => !prevState);
    window.location.reload();
  };

  return (
    <PlayerContext.Provider value={{ isPlayerVisible, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
