import { FC, useContext } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import PlayerController from "./PlayerController/PlayerController";
import PlayerList from "./PlayerList/PlayerList";
import { CurrentyPlaying } from "@/assets/svg/svg";
import { ThemeContext } from "@/context/ThemeContext/ThemeContext";
import Paragraph from "@/Components/UI/Paragraph/Paragraph";
import ParagraphTypeEnum from "@/utils/enums/paragraph-type.enum";
import HeadingTypeEnum from "@/utils/enums/heading-type.enum";
import Heading from "@/Components/UI/Heading/Heading";

const Queue: FC<any> = ({
  currentVideo,
  opts,
  playerRef,
  onEnd,
  handleVolumeChange,
  handlePlayPause,
  isPlaying,
  volume,
  videoQueue,
  removeVideoFromQueue,
  toggleFavorite,
  userCount,
  shuffleVideoListHandler,
  updateVideoQueue,
}) => {
  const { mode } = useContext(ThemeContext);

  const onReady = (event: YouTubeEvent<any>) => {
    event.target.setVolume(volume);
  };

  return (
    <div
      className={`${
        mode === "dark"
          ? "bg-background-bgDark100"
          : "bg-background-bgLight200 border-solid border-accent-gray200 border"
      } p-6 md:p-8 flex flex-col rounded-md w-full`}
    >
      <div className="flex flex-col md:flex-row items-start gap-4 md:items-start md:gap-9">
        {currentVideo && (
          <div className="w-[224px] md:w-[280px]">
            <YouTube
              videoId={currentVideo.id}
              opts={opts}
              onEnd={onEnd}
              ref={playerRef}
              onReady={onReady}
            />
          </div>
        )}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex gap-2 items-center">
              <CurrentyPlaying />
              <Paragraph type={ParagraphTypeEnum.p3_Default}>
                CURRENTLY PLAYING
              </Paragraph>
            </div>
            <div className="flex flex-col gap-2">
              <Heading type={HeadingTypeEnum.h1_Small}>
                {currentVideo?.title}
              </Heading>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-2">
                <Paragraph type={ParagraphTypeEnum.p1_Small}>
                  {currentVideo?.duration}
                </Paragraph>
                <div
                  className={`${
                    mode === "dark"
                      ? "bg-neutral-white"
                      : "bg-primary-blackPetrol"
                  } hidden md:block w-2 h-2  rounded-full`}
                ></div>
                <Paragraph type={ParagraphTypeEnum.p1_Small}>
                  Added by {currentVideo?.added}
                </Paragraph>
              </div>
            </div>
          </div>
          <PlayerController
            volume={volume}
            handleVolumeChange={handleVolumeChange}
            handlePlayPause={handlePlayPause}
            isPlaying={isPlaying}
            shuffleVideoListHandler={shuffleVideoListHandler}
            toggleFavorite={toggleFavorite}
            currentVideo={videoQueue[0]}
          />
        </div>
      </div>

      <PlayerList
        videoQueue={videoQueue.slice(1)}
        removeVideoFromQueue={removeVideoFromQueue}
        toggleFavorite={toggleFavorite}
        updateVideoQueue={updateVideoQueue}
      />
    </div>
  );
};

export default Queue;
