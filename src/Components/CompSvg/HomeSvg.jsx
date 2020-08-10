import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const HomeSvg = ({ changeColor, Theme }) => {
  return (
    <button id="cax" className="ytb_svg">
      <svg className="ytb_svg__wrapper" viewBox="0 0 25 25" focusable={false}>
        <g>
          <path
            fill={
              Theme
                ? changeColor
                  ? "#fff"
                  : "#909090"
                : changeColor
                ? "#f00"
                : "#606060"
            }
            d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8"
          ></path>
        </g>
      </svg>
    </button>
  );
};

export default memo(HomeSvg);
