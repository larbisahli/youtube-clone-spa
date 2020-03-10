import React, { useState, useCallback, useContext } from "react";
import "./app_icon.scss";
import { ThemeContext } from "../../../../Context/ThemeContext";

// SVG path COPIED FROM YOUTUBE

const Dots = React.memo(() => {
  const [fade, setFade] = useState(false);

  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const HundleClick = useCallback(
    e => {
      e.preventDefault();
      setFade(true);
      setTimeout(() => {
        setFade(false);
      }, 300);
    },
    [setFade]
  );

  return (
    <button className="icon_container" onClick={HundleClick}>
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={Theme ? "#ffffff80" : "#606060"}
            d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
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

export default Dots;
