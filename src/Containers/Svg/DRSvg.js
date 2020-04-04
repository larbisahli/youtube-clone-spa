import React from "react";
import "./svg_style_sci.scss";

// SVG path COPIED FROM YOUTUBE

const DRSvg = React.memo(({ Theme }) => {
  return (
    <div className="icon_container_y">
      <svg className="icon_y_" viewBox="0 0 48 48" focusable={false}>
        <g>
          <path
            fill={Theme ? "#aaa" : "#6e6e6e"}
            d="M0 18H10v4h24v-4zM8 30h26v-4H10v4z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default DRSvg;
