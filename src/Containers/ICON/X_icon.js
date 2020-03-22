import React from "react";
import "./app_icon_y.scss";

// SVG path COPIED FROM YOUTUBE

const XIcon = React.memo(() => {
  return (
    <div className="icon_container_y">
      <svg className="icon_y_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill="#fff"
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default XIcon;
