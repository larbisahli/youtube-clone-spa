import React from "react";
import "../../Navbar/NavComponents/Svg/svg_style_scnni.scss";

// SVG path COPIED FROM YOUTUBE

const PlayListSvg = React.memo(({ color = "#909090" }) => {
  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            className="fill"
            fill={color}
            d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default PlayListSvg;
