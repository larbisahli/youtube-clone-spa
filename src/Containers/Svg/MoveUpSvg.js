import React, { memo } from "react";
import "./sass/svg_style_sci.scss";

// SVG path COPIED FROM YOUTUBE

const MoveUpSvg = memo(({ color = "#909090" }) => {
  return (
    <div className="ytb_svg_y">
      <svg className="ytb_svg_y__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            fill={color}
            d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default MoveUpSvg;
