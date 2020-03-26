import React from "react";
import "../../Navbar/NavComponents/Svg/svg_style_scnni.scss";

// SVG path COPIED FROM YOUTUBE

const DownArrowSvg = React.memo(() => {
  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            className="fill"
            fill="#909090"
            d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default DownArrowSvg;
