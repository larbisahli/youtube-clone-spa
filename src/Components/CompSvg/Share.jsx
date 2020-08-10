import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const Share = ({ color = "#909090" }) => {
  return (
    <div className="ytb_svg_y">
      <svg className="ytb_svg_y__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={color}
            d="M11.7333 8.26667V4L19.2 11.4667L11.7333 18.9333V14.56C6.4 14.56 2.66667 16.2667 0 20C1.06667 14.6667 4.26667 9.33333 11.7333 8.26667Z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(Share);
