import React, { memo } from "react";

// SVG path COPIED FROM YOUTUBE

const LiveSvg = ({ isLive, notiExist, Theme }) => {
  return (
    <div className="ytb_svg">
      <svg className="ytb_svg__wrapper" viewBox="-5 -5 35 35" focusable={false}>
        <g>
          <path
            fill={isLive ? "#f00" : "transparent"}
            d="M16.94 6.91l-1.41 1.45c.9.94 1.46 2.22 1.46 3.64s-.56 2.71-1.46 3.64l1.41 1.45c1.27-1.31 2.05-3.11 2.05-5.09s-.78-3.79-2.05-5.09zM19.77 4l-1.41 1.45C19.98 7.13 21 9.44 21 12.01c0 2.57-1.01 4.88-2.64 6.54l1.4 1.45c2.01-2.04 3.24-4.87 3.24-7.99 0-3.13-1.23-5.96-3.23-8.01zM7.06 6.91c-1.27 1.3-2.05 3.1-2.05 5.09s.78 3.79 2.05 5.09l1.41-1.45c-.9-.94-1.46-2.22-1.46-3.64s.56-2.71 1.46-3.64L7.06 6.91zM5.64 5.45L4.24 4C2.23 6.04 1 8.87 1 11.99c0 3.13 1.23 5.96 3.23 8.01l1.41-1.45C4.02 16.87 3 14.56 3 11.99s1.01-4.88 2.64-6.54z"
          ></path>
          <circle
            fill={
              isLive
                ? "#f00"
                : notiExist
                ? Theme
                  ? "#3ea6ff"
                  : "#065fd4"
                : "transparent"
            }
            cx="12"
            cy="12"
            r="3"
          ></circle>
        </g>
      </svg>
    </div>
  );
};

export default memo(LiveSvg);
