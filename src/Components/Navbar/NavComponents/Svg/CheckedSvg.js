import React, { memo } from "react";
import "./sass/svg_style_scnni.scss";
import { useSelector } from "react-redux";

// SVG path COPIED FROM YOUTUBE

const CheckedSvg = ({ color = false }) => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  return (
    <div data-id="apx" className="ytb_svg">
      <svg
        data-id="apx"
        className="ytb_svg__wrapper"
        viewBox="0 0 24 24"
        focusable={false}
      >
        <g>
          <path
            data-id="apx"
            fill={!color ? (Theme ? "#3ea6ff" : "#065fd4") : color}
            d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(CheckedSvg);
