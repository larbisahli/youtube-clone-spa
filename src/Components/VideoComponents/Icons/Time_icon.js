import React from "react";
import "./app_icon_x.scss";

// SVG path COPIED FROM YOUTUBE

const TimeIcon = React.memo(() => {
  return (
    <div style={{ width: "20px", height: "20px" }} className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill="#fff"
            d="M9,10 L18,10 L18,12 L9,12 L9,10 Z M6,6 L18,6 L18,8 L6,8 L6,6 Z M12,14 L18,14 L18,16 L12,16 L12,14 Z M6,12 L6,18 L10,15 L6,12 Z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default TimeIcon;
