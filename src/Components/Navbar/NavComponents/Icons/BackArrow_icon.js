import React, { useState } from "react";
import "./app_icon.scss";

// SVG COPIED FROM YOUTUBE

const BackArrow = React.memo(({ isCurrent }) => {
  const [fade, setFade] = useState(false);

  // isCurrent is to prevent React state update on an unmounted component

  const HundleClick = e => {
    e.preventDefault();

    if (!isCurrent) {
      setFade(true);
      setTimeout(() => {
        setFade(false);
      }, 300);
    }
  };

  return (
    <div className="icon_container" onClick={HundleClick}>
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill="#fff"
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          ></path>
        </g>
      </svg>
      <div className={"effect" + (fade ? " action" : "")}></div>
    </div>
  );
});

export default BackArrow;
