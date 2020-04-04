import React, { useContext } from "react";
import "../../Navbar/NavComponents/Svg/svg_style_scnni.scss";

import { ThemeContext } from "../../../Context/ThemeContext";

// SVG path COPIED FROM YOUTUBE

const WatchLaterSvg = React.memo(({ changeColor }) => {
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;
  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            className="fill"
            fill={
              Theme
                ? changeColor
                  ? "#fff"
                  : "#909090"
                : changeColor
                ? "#f00"
                : "#909090"
            }
            d="M12 3.67c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33S16.58 3.67 12 3.67zm3.5 11.83l-4.33-2.67v-5h1.25v4.34l3.75 2.25-.67 1.08z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default WatchLaterSvg;
