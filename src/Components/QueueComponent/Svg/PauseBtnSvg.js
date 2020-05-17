import React, { memo } from "react";
import "../../Navbar/NavComponents/Svg/sass/svg_style_scnni.scss";

// SVG path COPIED FROM YOUTUBE

const PauseBtnSvg = memo(() => {
  return (
    <div className="ytb_svg">
      <svg className="ytb_svg__wrapper" viewBox="0 0 36 36" focusable={false}>
        <g>
          <path
            fill="#f1f1f1"
            d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default PauseBtnSvg;
