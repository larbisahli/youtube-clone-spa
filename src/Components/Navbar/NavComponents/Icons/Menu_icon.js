import React, { useState } from "react";
import "./menu_icon.scss";

// SVG COPIED FROM YOUTUBE

const Menu_icon = () => {
  const [fade, setFade] = useState(false);

  const HundleClick = e => {
    e.preventDefault();

    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 300);
  };

  const createRipple = e => {
    let circle = "ripple";
  };

  return (
    <button className="menu_btn" onClick={HundleClick}>
      <svg className="menu-icon" viewBox="0 0 24 24" focusable={false}>
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
};

export default Menu_icon;
