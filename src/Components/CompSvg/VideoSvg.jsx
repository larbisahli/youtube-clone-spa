import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const VideoSvg = ({ Theme }) => {
  return (
    <div className="ytb_svg">
      <svg className="ytb_svg__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={Theme ? "#909090" : "#606060"}
            d="M18.4 5.6v12.8H5.6V5.6h12.8zm0-1.8H5.6a1.8 1.8 0 0 0-1.8 1.8v12.8a1.8 1.8 0 0 0 1.8 1.9h12.8a1.8 1.8 0 0 0 1.9-1.9V5.6a1.8 1.8 0 0 0-1.9-1.8z"
          ></path>
          <path
            fill={Theme ? "#909090" : "#606060"}
            d="M10.2 9v6.5l5-3.2-5-3.2z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(VideoSvg);
