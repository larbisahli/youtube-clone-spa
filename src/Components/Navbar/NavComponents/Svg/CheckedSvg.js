import React, { useContext } from "react";
import "./svg_style_scnni.scss";
import { ThemeContext } from "../../../../Context";

// SVG path COPIED FROM YOUTUBE

const CheckedSvg = React.memo(({ color = false }) => {
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  return (
    <div data-id="apx" className="icon_container">
      <svg
        data-id="apx"
        className="icon_"
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
});

export default CheckedSvg;
