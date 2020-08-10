import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const FlagSvg = ({ Theme }) => {
  return (
    <div className="ytb_svg">
      <svg className="ytb_svg__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={Theme ? "#909090" : "#606060"}
            d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(FlagSvg);
