import React from "react";
import "../../Navbar/NavComponents/Svg/sass/svg_style_scnni.scss";

// SVG path COPIED FROM YOUTUBE

const NextBtnSvg = React.memo(() => {
  return (
    <div className="ytb_svg">
      <svg className="ytb_svg__wrapper" viewBox="0 0 36 36" focusable={false}>
        <g>
          <path
            fill="#fff"
            d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default NextBtnSvg;
