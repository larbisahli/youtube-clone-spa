import React from "react";
import "./drop.scss";
import { UploadIcon, GoLiveIcon } from "../Icons";

// Useing Memo to prevent unnecessary re-render

const CamDrop = React.memo(() => {
  return (
    <div className="app_container cam-position">
      <a
        href="https://studio.youtube.com/channel/"
        target="_blank"
        rel="noopener noreferrer"
        className="app_text"
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
        className="app_text"
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
