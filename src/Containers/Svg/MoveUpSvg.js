import React from "react";
import "./svg_style_sci.scss";

// SVG path COPIED FROM YOUTUBE

const MoveUpSvg = React.memo(({ color = "#909090" }) => {
  return (
    <div className="icon_container_y">
      <svg className="icon_y_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            className="fill"
            fill={color}
            d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default MoveUpSvg;
