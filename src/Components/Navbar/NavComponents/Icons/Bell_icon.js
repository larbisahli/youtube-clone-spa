import React, { useState } from "react";
import "./bell-icon.scss";

// SVG COPIED FROM YOUTUBE

const Bell = () => {
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
    <button className="bell_btn" onClick={HundleClick}>
      <svg className="bell-icon" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill="#fff"
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
          ></path>
        </g>
      </svg>
      <div className={"effect" + (fade ? " action" : "")}></div>
    </button>
  );
};

export default Bell;
