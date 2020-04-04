import React from "react";
import "../../Navbar/NavComponents/Svg/svg_style_scnni.scss";

// SVG path COPIED FROM YOUTUBE

const PauseBtnSvg = React.memo(() => {
  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 36 36" focusable={false}>
        <g>
          <path
            className="fill"
            fill="#fff"
            d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default PauseBtnSvg;
