import React from "react";
import "../../Navbar/NavComponents/Icons/app_icon.scss";

// SVG path COPIED FROM YOUTUBE

const LibraryIcon = React.memo(() => {
  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            className="fill"
            fill="#909090"
            d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"
          ></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
      </svg>
    </div>
  );
});

export default LibraryIcon;
