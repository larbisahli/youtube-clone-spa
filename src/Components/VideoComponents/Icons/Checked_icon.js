import React from "react";
import "./app_icon_x.scss";

// SVG path COPIED FROM YOUTUBE

const CheckedVIcon = React.memo(() => {
  return (
    <button className="icon_container_x">
      <svg className="icon_x_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill="#3ea6ff"
            d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
          ></path>
        </g>
      </svg>
    </button>
  );
});

export default CheckedVIcon;
