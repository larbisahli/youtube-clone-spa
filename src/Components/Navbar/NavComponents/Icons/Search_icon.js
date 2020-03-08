import React from "react";
import "./app_icon.scss";

// SVG COPIED FROM YOUTUBE

const SearchIcon = React.memo(({ Theme }) => {
  return (
    <div
      style={{ width: "20px", height: "20px", opacity: "0.6" }}
      className="icon_container"
    >
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            className={"fill" + (Theme ? " fill-dark" : " fill-light")}
            fill={Theme ? "#ffffff80" : "#333"}
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default SearchIcon;
