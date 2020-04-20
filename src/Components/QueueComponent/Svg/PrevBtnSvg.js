import React from "react";
import "../../Navbar/NavComponents/Svg/sass/svg_style_scnni.scss";

// SVG path COPIED FROM YOUTUBE

const PrevBtnSvg = React.memo(() => {
  return (
    <div className="ytb_svg">
      <svg className="ytb_svg__wrapper" viewBox="0 0 36 36" focusable={false}>
        <g>
          <path
            fill="#fff"
            d="m 12,12 h 2 v 12 h -2 z m 3.5,6 8.5,6 V 12 z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default PrevBtnSvg;
