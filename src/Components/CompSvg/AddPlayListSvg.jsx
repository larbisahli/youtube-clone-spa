import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const AddPlayListSvg = ({ color = "#909090" }) => {
  return (
    <div className="ytb_svg_y">
      <svg className="ytb_svg_y__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={color}
            d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(AddPlayListSvg);
