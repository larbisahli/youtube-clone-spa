import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const LikeSvg = ({ changeColor, Theme }) => {
  return (
    <div className="ytb_svg">
      <svg className="ytb_svg__wrapper" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={
              Theme
                ? changeColor
                  ? "#fff"
                  : "#909090"
                : changeColor
                ? "#f00"
                : "#606060"
            }
            d="M3.75 18.75h3v-9h-3v9zm16.5-8.25c0-.83-.68-1.5-1.5-1.5h-4.73l.7-3.43.03-.24c0-.3-.13-.6-.33-.8l-.8-.78L8.7 8.7c-.3.26-.45.64-.45 1.05v7.5c0 .82.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.9l2.27-5.3c.06-.18.1-.36.1-.55v-1.5z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default memo(LikeSvg);
