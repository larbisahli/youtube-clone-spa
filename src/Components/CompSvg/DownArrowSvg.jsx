import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const DownArrowSvg = ({ Theme }) => {
  return (
    <div className="ytb_svg">
      <svg className="ytb_svg__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={Theme ? "#909090" : "#606060"}
            d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(DownArrowSvg);
