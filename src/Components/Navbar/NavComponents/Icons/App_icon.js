import React, { useState, useContext } from "react";
import "./app_icon.scss";
import { ThemeContext } from "../../../../Context/ThemeContext";

// SVG COPIED FROM YOUTUBE

const AppIcon = React.memo(() => {
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
    <button data-id="apx" className="icon_container _A" onClick={HundleClick}>
      <svg
        data-id="apx"
        className="icon_"
        viewBox="0 0 24 24"
        focusable={false}
      >
        <g>
          <path
            data-id="apx"
            fill={Theme ? "#fff" : "#606060"}
            d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"
          ></path>
        </g>
      </svg>
      <div
        data-id="apx"
        className={
          "effect" + (fade ? (Theme ? " action-dark" : " action-light") : "")
        }
      ></div>
    </button>
  );
});

export default AppIcon;
