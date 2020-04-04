import React from "react";
import "./svg_style_sci.scss";

// SVG path COPIED FROM YOUTUBE

const TrashSvg = React.memo(({ color = "#909090" }) => {
  return (
    <div className="icon_container_y">
      <svg className="icon_y_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            className="fill"
            fill={color}
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default TrashSvg;
