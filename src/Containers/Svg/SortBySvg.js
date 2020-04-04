import React from "react";
import "./svg_style_sci.scss";

// SVG path COPIED FROM YOUTUBE

const SortBySvg = React.memo(({ Theme }) => {
  return (
    <div className="icon_container_y">
      <svg className="icon_y_" viewBox="0 0 24 24" focusable={false}>
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
});

export default SortBySvg;
