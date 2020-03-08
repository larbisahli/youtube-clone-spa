import React, { useContext } from "react";
import "./drop.scss";
import { UploadIcon, GoLiveIcon } from "../Icons";
import { ThemeContext } from "../../../../Context/ThemeContext";

// Using Memo to prevent unnecessary re-renders

const CamDrop = React.memo(() => {
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const app_text = "app_text" + (Theme ? " app_text-dark" : " app_text-light");

  return (
    <div
      className={
        "app_container cam-position" +
        (Theme ? " app_container-dark" : " app_container-light")
      }
    >
      <a
        href="https://studio.youtube.com/channel/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icon_">
          <UploadIcon />
        </div>
        <div className="text_">Upload video</div>
      </a>
      <a
        href="https://studio.youtube.com/channel/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icon_">
          <GoLiveIcon />
        </div>
        <div className="text_">Go live</div>
      </a>
    </div>
  );
});

export default CamDrop;
