import React, { useState, useContext } from "react";
import "./svg_style_scnni.scss";
import { ThemeContext } from "../../../../Context";
import { ReturnTheme } from "../../../../config";

// SVG path COPIED FROM YOUTUBE

const BellSvg = React.memo(() => {
  const [fade, setFade] = useState(false);

  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const HundleClick = () => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 300);
  };

  return (
    <button
      id="bex"
      className={`icon_container titleB titleB-${ReturnTheme(Theme)}`}
      onClick={HundleClick}
    >
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={Theme ? "#fff" : "#606060"}
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
          ></path>
        </g>
      </svg>
      <div
        className={
          "effect" + (fade ? (Theme ? " action-dark" : " action-light") : "")
        }
      ></div>
    </button>
  );
});

export default BellSvg;
