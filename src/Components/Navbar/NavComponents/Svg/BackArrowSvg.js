import React, { useContext } from "react";
import "./sass/svg_style_scnni.scss";
import { ThemeContext } from "../../../../Context";

// SVG path COPIED FROM YOUTUBE

const BackArrowSvg = React.memo(() => {
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  return (
    <div className="ytb_svg">
      <svg className="ytb_svg__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={Theme ? "#fff" : "#606060"}
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default BackArrowSvg;
