import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const MoveDownSvg = ({ color = "#909090" }) => {
  return (
    <div className="ytb_svg_y">
      <svg className="ytb_svg_y__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            fill={color}
            d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(MoveDownSvg);
