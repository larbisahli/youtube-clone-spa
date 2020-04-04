import React from "react";
import "../../Navbar/NavComponents/Svg/svg_style_scnni.scss";

// SVG path COPIED FROM YOUTUBE

const PlayBtnSvg = React.memo(() => {
  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 36 36" focusable={false}>
        <g>
          <path
            className="fill"
            fill="#fff"
            d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default PlayBtnSvg;
