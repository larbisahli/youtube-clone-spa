import React from "react";
import "./svg_style_sci.scss";

// SVG path COPIED FROM YOUTUBE

const ShuffleSvg = React.memo(({ Theme }) => {
  return (
    <div className="icon_container_y">
      <svg className="icon_y_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={Theme ? "#aaa" : "#6e6e6e"}
            d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default ShuffleSvg;
