import React from "react";
import "../../Navbar/NavComponents/Icons/app_icon.scss";

// SVG path COPIED FROM YOUTUBE

const FlagIcon = React.memo(() => {
  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            className="fill"
            fill="#909090"
            d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default FlagIcon;
