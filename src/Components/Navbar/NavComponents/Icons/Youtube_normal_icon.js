import React from "react";
import "./app_icon.scss";

// SVG COPIED FROM YOUTUBE

const YouTubeNormalIcon = React.memo(() => {
  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            className="fill"
            fill="#F00"
            d="M23.8,17.1c0,0.9-0.7,1.6-1.6,1.6H1.9c-0.9,0-1.6-0.7-1.6-1.6V4.8c0-0.9,0.7-1.6,1.6-1.6 h20.3c0.9,0,1.6,0.7,1.6,1.6V17.1z"
          ></path>
          <polygon fill="#FFFFFF" points="9.6,14.4 15.7,10.9 9.6,7.5"></polygon>
        </g>
      </svg>
    </div>
  );
});

export default YouTubeNormalIcon;
