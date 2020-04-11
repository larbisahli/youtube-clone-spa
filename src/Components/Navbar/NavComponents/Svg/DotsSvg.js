import React, { useContext } from "react";
import "./svg_style_scnni.scss";
import { ThemeContext } from "../../../../Context";

// SVG path COPIED FROM YOUTUBE

const DotsSvg = React.memo(() => {
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={Theme ? "#ffffff80" : "#606060"}
            d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default DotsSvg;
