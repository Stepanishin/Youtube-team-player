import React, { useContext } from "react";
import audio from "@/assets/svg/audio.svg";
import video from "@/assets/svg/video.svg";
import { PlayerContext } from "@/context/PlayerContext/PlayerContext";

const PlayerToggle = () => {
  const playerContext = useContext(PlayerContext);

  if (!playerContext) {
    throw new Error("Header must be used within a UserProvider");
  }

  const { isPlayerVisible, setPlayer } = playerContext;

  return (
    <div
      className="bg-button-btnDark relative cursor-pointer flex justify-between items-center gap-4 h-8 py-[2px] pl-2 pr-3 rounded-[50px]"
      onClick={setPlayer}
    >
      <img className="w-5 h-5" src={audio} alt="" />
      <img className="w-5 h-5" src={video} alt="" />
      <div
        className="w-7 h-7 rounded-full bg-neutral-white absolute transition-all duration-300"
        style={isPlayerVisible ? { left: "2px" } : { right: "2px" }}
      />
    </div>
  );
};

export default PlayerToggle;
