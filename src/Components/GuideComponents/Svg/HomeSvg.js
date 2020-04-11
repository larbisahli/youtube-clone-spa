import React, { useContext } from "react";
import "../../Navbar/NavComponents/Svg/svg_style_scnni.scss";
import { ThemeContext } from "../../../Context";

// SVG path COPIED FROM YOUTUBE

const HomeSvg = React.memo(({ changeColor }) => {
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  return (
    <button id="cax" className="icon_container">
      <svg className="icon_" viewBox="0 0 25 25" focusable={false}>
        <g>
          <path
            fill={
              Theme
                ? changeColor
                  ? "#fff"
                  : "#909090"
                : changeColor
                ? "#f00"
                : "#909090"
            }
            d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8"
          ></path>
        </g>
      </svg>
    </button>
  );
});

export default HomeSvg;
