import React from "react";
import "./app_icon.scss";

// SVG COPIED FROM YOUTUBE

const ArrowIcon = React.memo(() => {
  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            className="fill"
            fill="#909090"
            d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default ArrowIcon;
