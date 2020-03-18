import React from "react";
import "./app_icon_x.scss";

// SVG path COPIED FROM YOUTUBE

const QueueIcon = React.memo(() => {
  return (
    <div style={{ width: "20px", height: "20px" }} className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill="#fff"
            d="M12 3.67c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33S16.58 3.67 12 3.67zm3.5 11.83l-4.33-2.67v-5h1.25v4.34l3.75 2.25-.67 1.08z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default QueueIcon;
