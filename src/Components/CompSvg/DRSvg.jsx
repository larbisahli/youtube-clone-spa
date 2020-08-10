import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const DRSvg = ({ Theme }) => {
  return (
    <div className="ytb_svg_y">
      <svg className="ytb_svg_y__wrapper" viewBox="0 0 48 48" focusable={false}>
        <g>
          <path
            fill={Theme ? "#aaa" : "#6e6e6e"}
            d="M0 18H10v4h24v-4zM8 30h26v-4H10v4z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(DRSvg);
