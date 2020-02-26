import React, { useState } from "react";
import "./app-icon.scss";

// SVG COPIED FROM YOUTUBE

const App_icon = () => {
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
    <button className="app_btn" onClick={HundleClick}>
      <svg className="app-icon" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill="#fff"
            d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"
          ></path>
        </g>
      </svg>
      <div className={"effect" + (fade ? " action" : "")}></div>
    </button>
  );
};

export default App_icon;
