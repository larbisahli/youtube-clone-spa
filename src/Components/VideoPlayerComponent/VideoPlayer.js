import React, { useEffect } from "react";

let player;
let currentVideoId = null;

const loadVideo = (PlayerId, onPlayerStateChange, onPlayerError) => {
  // the Player object is created uniquely based on the PlayerId

  player = new window.YT.Player(PlayerId, {
    //videoId: videoId,
    height: "100%",
    width: "100%",
    playerVars: {
      controls: 1,
      enablejsapi: 1,
      showinfo: 0,
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onError: onPlayerError,
    },
  });
};

// - The API will call this function when the video player is ready.
const onPlayerReady = (event) => {
  try {
    event.target.playVideo();
  } catch (error) {
    console.log("onPlayerReady error :", error);
  }
};

export const StopVideo = () => {
  try {
    player.stopVideo();
  } catch (error) {
    console.log("StopVideo error :", error);
  }
};

export const PauseVideo = () => {
  try {
    player.pauseVideo();
  } catch (error) {
    console.log("PauseVideo error :", error);
  }
};
export const PlayVideo = () => {
  try {
    player.playVideo();
  } catch (error) {
    console.log("PlayVideo error :", error);
  }
};

export const getCurrentTime = () => {
  if (player !== undefined) {
    try {
      return player.getCurrentTime();
    } catch (error) {
      return 0;
    }
  } else {
    return 0;
  }
};

const VideoPlayer = React.memo(
  ({
    check,
    HandlePlayingVideo,
    PlayerId,
    onPlayerStateChange,
    onPlayerError,
  }) => {
    console.log("<::-VideoPlayer-::>");

    useEffect(() => {
      console.log("Up useEffect :");

      // - This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement("script");

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }, []);

    useEffect(() => {
      // - This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      window.onYouTubeIframeAPIReady = () => {
        console.log("------------APIReady------------");
        loadVideo(
          // HandlePlayingVideo(),
          PlayerId,
          onPlayerStateChange,
          onPlayerError
        );
      };

      if (check) {
        if (
          currentVideoId === null ||
          currentVideoId !== HandlePlayingVideo()
        ) {
          try {
            currentVideoId = HandlePlayingVideo();
            player.loadVideoById(HandlePlayingVideo());
          } catch (error) {
            console.log("error :", error);
          }
        }
      }
    }, [
      check,
      HandlePlayingVideo,
      PlayerId,
      onPlayerStateChange,
      onPlayerError,
    ]);

    return <div id={PlayerId}></div>;
  }
);

export default VideoPlayer;
