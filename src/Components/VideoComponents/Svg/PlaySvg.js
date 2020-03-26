import React from "react";
import "./svg_style_scvi.scss";

// SVG path COPIED FROM YOUTUBE

const PlaySvg = React.memo(() => {
  return (
    <div className="icon_container_x">
      <svg className="icon_x_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path fill="#fff" d="M8 5v14l11-7z"></path>
        </g>
      </svg>
    </div>
  );
});

export default PlaySvg;
