import React, { useContext } from "react";
import "../../Navbar/NavComponents/Svg/sass/svg_style_scnni.scss";
import { ThemeContext } from "../../../Context";

// SVG path COPIED FROM YOUTUBE

const DownArrowSvg = React.memo(() => {
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  return (
    <div className="ytb_svg">
      <svg className="ytb_svg__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={Theme ? "#909090" : "#606060"}
            d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default DownArrowSvg;
