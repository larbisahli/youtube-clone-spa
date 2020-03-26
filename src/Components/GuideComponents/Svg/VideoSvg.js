import React from "react";
import "../../Navbar/NavComponents/Svg/svg_style_scnni.scss";

// SVG path COPIED FROM YOUTUBE

const VideoSvg = React.memo(() => {
  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            className="fill"
            fill="#909090"
            d="M18.4 5.6v12.8H5.6V5.6h12.8zm0-1.8H5.6a1.8 1.8 0 0 0-1.8 1.8v12.8a1.8 1.8 0 0 0 1.8 1.9h12.8a1.8 1.8 0 0 0 1.9-1.9V5.6a1.8 1.8 0 0 0-1.9-1.8z"
          ></path>
          <path fill="#909090" d="M10.2 9v6.5l5-3.2-5-3.2z"></path>
        </g>
      </svg>
    </div>
  );
});

export default VideoSvg;
