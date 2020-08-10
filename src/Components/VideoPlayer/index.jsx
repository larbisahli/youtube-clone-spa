import React, { useEffect, useCallback, memo, useState } from "react";

let player;
let intervalId;
let currentVideoId = null;

const loadVideo = (YT, PlayerId, onPlayerStateChange, onPlayerError) => {
  // the Player object is created uniquely based on the PlayerId

  player = new YT.Player(PlayerId, {
    height: "100%",
    width: "100%",
    playerVars: {
      controls: 1,
      enablejsapi: 1,
      showinfo: 0,
      rel: 0,
      modestbranding: 1,
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

export const Seek = (t) => {
  try {
    player.seekTo(t);
  } catch (error) {
    console.log("Seek error :>> ", error);
  }
};

export const DestroyIframe = () => {
  try {
    // Clean up iframe
    player.stopVideo();
    player.destroy();
    // Clear out the reference to the destroyed player
    player = null;
  } catch (error) {
    console.log("Destroy Error :>> ", error);
  }
};

const VideoPlayer = ({
  check,
  HandlePlayingVideo,
  PlayerId,
  onPlayerStateChange,
  onPlayerError,
}) => {
  //
  const [CallCount, setCallCount] = useState(0);

  // -----

  useEffect(() => {
    // - This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, []);

  // waitForIframe function --->

  const waitForIframe = useCallback(() => {
    const myIframe = document.getElementById(PlayerId);

    setCallCount((prev) => {
      return prev + 1;
    });

    // <--- IF NOT --->

    try {
      myIframe.onload = function () {
        try {
          currentVideoId = HandlePlayingVideo();
          player.loadVideoById(HandlePlayingVideo());
          clearInterval(intervalId);
        } catch (error) {
          console.log("waitForIframe error :", error);
        }
      };
    } catch (error) {
      console.log("myIframe.onload Error :>> ", error);
    }

    // <--- DO --->

    if (myIframe) {
      if (player) {
        try {
          currentVideoId = HandlePlayingVideo();
          player.loadVideoById(HandlePlayingVideo());
          clearInterval(intervalId);
        } catch (error) {}
      }
    }
  }, [HandlePlayingVideo, PlayerId]);

  // creates an <iframe> --->

  const youtubeReady = useCallback(() => {
    const youtubeReady = new Promise((resolve) => {
      if (window.YT) {
        resolve(window.YT);
      } else {
        window.onYouTubeIframeAPIReady = () => {
          resolve(window.YT);
        };
      }
    });

    return youtubeReady;
  }, []);

  useEffect(() => {
    // - This function creates an <iframe> (and YouTube player) after the API code downloads.

    youtubeReady().then((YT) => {
      //
      const iframe_ = document.getElementById(PlayerId);

      // I used if(iframe.offsetHeight === 0) to find if the iframe loaded or not.
      // we can't use (iframe.contentDocument) If the iframe is cross-domain,
      // we will be blocked by the same-origin policy.

      if (iframe_ && YT.loaded) {
        if (iframe_.offsetHeight === 0 && check) {
          loadVideo(YT, PlayerId, onPlayerStateChange, onPlayerError);
        }

        if (check) {
          if (iframe_.offsetHeight === 0) {
            intervalId = setInterval(waitForIframe, 500);
          } else {
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
        }
      }
    });
  }, [
    check,
    HandlePlayingVideo,
    PlayerId,
    onPlayerStateChange,
    onPlayerError,
    waitForIframe,
    youtubeReady,
  ]);

  if (CallCount > 30) {
    // Clear and wait in case slow connection
    clearInterval(intervalId);
    setCallCount(() => {
      return 0;
    });
  }

  return <div id={PlayerId}></div>;
};

export default memo(VideoPlayer);
