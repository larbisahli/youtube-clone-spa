import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const SortBySvg = ({ Theme }) => {
  return (
    <div className="ytb_svg_y">
      <svg className="ytb_svg_y__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill={Theme ? "#aaa" : "#6e6e6e"}
            d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(SortBySvg);
