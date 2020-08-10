import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const LibrarySvg = ({ changeColor, Theme }) => {
  return (
    <div className="ytb_svg">
      <svg className="ytb_svg__wrapper" viewBox="0 0 24 24" focusable={false}>
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
            d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"
          ></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(LibrarySvg);
