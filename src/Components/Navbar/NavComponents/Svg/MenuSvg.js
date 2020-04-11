import React, { useState, useContext } from "react";
import "./svg_style_scnni.scss";
import { ThemeContext } from "../../../../Context";

// SVG path COPIED FROM YOUTUBE

const MenuSvg = React.memo(() => {
  const [fade, setFade] = useState(false);

  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const HundleClick = (e) => {
    e.preventDefault();
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 300);
  };

  return (
    <button className="icon_container" onClick={HundleClick}>
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={Theme ? "#fff" : "#606060"}
            d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
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

export default MenuSvg;
