import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const TrashSvg = ({ color = "#909090" }) => {
  return (
    <div className="ytb_svg_y">
      <svg className="ytb_svg_y__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={color}
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(TrashSvg);
