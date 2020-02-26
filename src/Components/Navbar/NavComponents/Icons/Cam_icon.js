import React, { useState } from "react";
import "./cam_icon.scss";

// SVG COPIED FROM YOUTUBE

const Cam_icon = () => {
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
    <button className="cam_btn" onClick={HundleClick}>
      <svg className="cam-icon" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill="#fff"
            d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"
          ></path>
        </g>
      </svg>
      <div className={"effect" + (fade ? " action" : "")}></div>
    </button>
  );
};

export default Cam_icon;
