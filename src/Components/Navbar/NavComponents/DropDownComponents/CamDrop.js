import React, { useContext } from "react";
import "./drop_style.scss";
import { UploadSvg, GoLiveSvg } from "../Svg";
import { ThemeContext } from "../../../../Context";
import { ReturnTheme } from "../../../../config";

// Using Memo to prevent unnecessary re-renders

const CamDrop = React.memo(() => {
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const app_text = `app_text app_text-${ReturnTheme(Theme)}`;

  return (
    <div
      className={`app_container cam-position app_container-${ReturnTheme(
        Theme
      )}`}
    >
      <a
        href="https://studio.youtube.com/channel/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icondr">
          <UploadSvg />
        </div>
        <div className="textdr">Upload video</div>
      </a>
      <a
        href="https://studio.youtube.com/channel/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icondr">
          <GoLiveSvg />
        </div>
        <div className="textdr">Go live</div>
      </a>
    </div>
  );
});

export default CamDrop;
