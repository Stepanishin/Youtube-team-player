import React, { FC, useContext } from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import PlayerController from "./PlayerController/PlayerController";
import PlayerList from "./PlayerList/PlayerList";
import { CurrentyPlaying } from "@/assets/svg/svg";
import { ThemeContext } from "@/context/ThemeContext/ThemeContext";
import Paragraph from "@/Components/UI/Paragraph/Paragraph";
import ParagraphTypeEnum from "@/utils/enums/paragraph-type.enum";
import HeadingTypeEnum from "@/utils/enums/heading-type.enum";
import Heading from "@/Components/UI/Heading/Heading";
import { VideoItem } from "@/utils/types/video-item.type";
import DefaultTab from "@/Components/UI/DefaultTab/DefaultTab";
import { PlayerContext } from "@/context/PlayerContext/PlayerContext";
import QueueTabsEnum from "@/utils/enums/queue-tabs.enum";

interface QueueProps {
  currentVideo: VideoItem | null;
  opts: YouTubeProps["opts"];
  playerRef: any;
  onEnd: () => void;
  handleVolumeChange: (value: number) => void;
  handlePlayPause: () => void;
  isPlaying: boolean;
  volume: number;
  videoQueue: VideoItem[];
  recentlyPlayedQueue: VideoItem[];
  removeVideoFromQueue: (deletedVideo: VideoItem) => void;
  toggleFavorite: (video: VideoItem) => void;
  userCount: number;
  shuffleVideoListHandler: () => void;
  updateVideoQueue: (newQueue: VideoItem[], isEnd?: boolean) => void;
  onVideoSelect: (video: VideoItem) => void;
  handleNext: () => void;
}

const Queue: FC<QueueProps> = ({
  currentVideo,
  opts,
  playerRef,
  onEnd,
  handleVolumeChange,
  handlePlayPause,
  isPlaying,
  volume,
  videoQueue,
  recentlyPlayedQueue,
  removeVideoFromQueue,
  toggleFavorite,
  shuffleVideoListHandler,
  updateVideoQueue,
  onVideoSelect,
  handleNext,
}) => {
  const playerContext = useContext(PlayerContext);

  if (!playerContext) {
    throw new Error("Header must be used within a UserProvider");
  }

  const { mode } = useContext(ThemeContext);
  const { isPlayerVisible } = playerContext;

  const [activeTab, setActiveTab] = React.useState<
    QueueTabsEnum.UP_NEXT | QueueTabsEnum.RECENTLY_PLAYED
  >(QueueTabsEnum.UP_NEXT);

  const onReady = (event: YouTubeEvent) => {
    event.target.setVolume(volume);
  };

  return (
    <div
      className={`${
        mode === "dark"
          ? "bg-background-bgDark100"
          : "bg-background-bgLight200 border-solid border-accent-gray200 border"
      } p-6 md:p-8 flex flex-col rounded-md w-full scrollbar-none max-h-[1000px] md:max-h-[750px] xl:max-h-none xl:h-[calc(100vh-140px)]  xl:min-h-[1000px] overflow-y-scroll`}
    >
      {videoQueue.length !== 0 ? (
        <>
          <div
            className={`flex flex-col md:flex-row items-start gap-4 md:items-start ${
              isPlayerVisible ? "md:gap-9" : "md:gap-0"
            }`}
          >
            {currentVideo && (
              <div
                style={{
                  width: isPlayerVisible ? "w-[224px] md:w-[280px]" : "0px",
                  height: isPlayerVisible ? "w-[224px] md:w-[280px]" : "0px",
                }}
              >
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
              {videoQueue.length > 0 && (
                <PlayerController
                  volume={volume}
                  handleVolumeChange={handleVolumeChange}
                  handlePlayPause={handlePlayPause}
                  isPlaying={isPlaying}
                  shuffleVideoListHandler={shuffleVideoListHandler}
                  toggleFavorite={toggleFavorite}
                  currentVideo={videoQueue[0]}
                  handleNext={handleNext}
                />
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <DefaultTab
              onClick={() => setActiveTab(QueueTabsEnum.UP_NEXT)}
              active={activeTab === QueueTabsEnum.UP_NEXT}
            >
              UP NEXT
            </DefaultTab>
            <DefaultTab
              onClick={() => setActiveTab(QueueTabsEnum.RECENTLY_PLAYED)}
              active={activeTab === QueueTabsEnum.RECENTLY_PLAYED}
            >
              RECENTLY PLAYED
            </DefaultTab>
          </div>
          {activeTab === QueueTabsEnum.UP_NEXT && (
            <PlayerList
              videoQueue={videoQueue.slice(1)}
              removeVideoFromQueue={removeVideoFromQueue}
              toggleFavorite={toggleFavorite}
              updateVideoQueue={updateVideoQueue}
            />
          )}
          {activeTab === QueueTabsEnum.RECENTLY_PLAYED && (
            <>
              <PlayerList
                videoQueue={recentlyPlayedQueue}
                removeVideoFromQueue={removeVideoFromQueue}
                toggleFavorite={toggleFavorite}
                updateVideoQueue={updateVideoQueue}
                isRecentlyPlayed={true}
                onVideoSelect={onVideoSelect}
              />
            </>
          )}
        </>
      ) : (
        <Paragraph type={ParagraphTypeEnum.p1_Small}>
          Player is empty, add some videos!
        </Paragraph>
      )}
    </div>
  );
};

export default Queue;
