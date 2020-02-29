import React, { useState } from "react";
import "./app_icon.scss";

// SVG COPIED FROM YOUTUBE

const AppIcon = React.memo(() => {
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
            d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"
          ></path>
        </g>
      </svg>
      <div className={"effect" + (fade ? " action" : "")}></div>
    </button>
  );
});

export default AppIcon;
