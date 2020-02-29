import React, { useState } from "react";
import "./app_icon.scss";

// SVG COPIED FROM YOUTUBE

const MenuIcon = React.memo(() => {
  const [fade, setFade] = useState(false);

  const HundleClick = e => {
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
            fill="#fff"
            d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
          ></path>
        </g>
      </svg>
      <div className={"effect" + (fade ? " action" : "")}></div>
    </button>
  );
});

export default MenuIcon;
