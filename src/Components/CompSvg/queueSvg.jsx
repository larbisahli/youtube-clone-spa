import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const QueueSvg = ({ default_color = true }) => {
  return (
    <div className="ytb_svg_x">
      <svg className="ytb_svg_x__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={default_color ? "#fff" : "#909090"}
            d="M9,10 L18,10 L18,12 L9,12 L9,10 Z M6,6 L18,6 L18,8 L6,8 L6,6 Z M12,14 L18,14 L18,16 L12,16 L12,14 Z M6,12 L6,18 L10,15 L6,12 Z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(QueueSvg);
