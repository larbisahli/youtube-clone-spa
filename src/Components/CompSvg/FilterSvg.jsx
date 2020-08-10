import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const FilterSvg = ({ Theme }) => {
  return (
    <div className="ytb_svg_y">
      <svg className="ytb_svg_y__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill={Theme ? "#aaa" : "#606060"}
            d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(FilterSvg);
