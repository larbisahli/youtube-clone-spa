import React from "react";
import "./app_icon.scss";

// SVG COPIED FROM YOUTUBE

const GoLiveIcon = React.memo(() => {
  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            className="fill"
            fill="#6f6f6f"
            d="M23,12a11,11,0,0,1-3.22,7.78l-1.41-1.41a9,9,0,0,0,0-12.73l1.41-1.41A11,11,0,0,1,23,12ZM5.64,5.64,4.22,4.22a11,11,0,0,0,0,15.56l1.41-1.41a9,9,0,0,1,0-12.73ZM16.95,7.05,15.54,8.46a5,5,0,0,1,0,7.07l1.41,1.41a7,7,0,0,0,0-9.9Zm-9.9,0a7,7,0,0,0,0,9.9l1.41-1.41a5,5,0,0,1,0-7.07Z"
          ></path>
          <path d="M12,9a3,3,0,1,1-3,3,3,3,0,0,1,3-3" fill="#f80000"></path>
        </g>
      </svg>
    </div>
  );
});

export default GoLiveIcon;
