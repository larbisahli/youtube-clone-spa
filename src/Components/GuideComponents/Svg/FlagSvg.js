import React, { useContext } from "react";
import "../../Navbar/NavComponents/Svg/sass/svg_style_scnni.scss";
import { ThemeContext } from "../../../Context";

// SVG path COPIED FROM YOUTUBE

const FlagSvg = React.memo(() => {
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;
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
});

export default FlagSvg;
