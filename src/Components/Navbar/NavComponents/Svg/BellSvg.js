import React, { memo } from "react";
import "./sass/svg_style_scnni.scss";
import { useSelector } from "react-redux";
import { ReturnTheme } from "../../../../utils";

// SVG path COPIED FROM YOUTUBE

const BellSvg = () => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  return (
    <div id="bex" className={`ytb_svg titleB titleB--${ReturnTheme(Theme)}`}>
      <svg className="ytb_svg__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={Theme ? "#fff" : "#606060"}
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(BellSvg);
