import React from "react";
import "../../Navbar/NavComponents/Icons/app_icon.scss";

// SVG path COPIED FROM YOUTUBE

const UpArrowIcon = React.memo(() => {
  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            className="fill"
            fill="#909090"
            d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default UpArrowIcon;
