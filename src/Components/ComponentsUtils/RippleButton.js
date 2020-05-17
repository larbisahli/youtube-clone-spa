import React, { useCallback, useState, memo } from "react";
import style from "./sass/ripplebutton.module.scss";
import { GetClassName } from "../../utils";
import { useSelector } from "react-redux";

const RippleButton = memo(({ children, onclick, classname }) => {
  // Coordinates State
  const [{ y, x, show }, setRipple] = useState({
    y: 0,
    x: 0,
    show: false,
  });

  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  // ====================
  //    Handle Ripple
  // ====================

  const HandleRipple = useCallback((e) => {
    var rect = e.target.getBoundingClientRect();

    var offset = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };

    setRipple({
      y: e.pageY - offset.top,
      x: e.pageX - offset.left,
      show: true,
    });

    setTimeout(() => {
      setRipple({
        y: 0,
        x: 0,
        show: false,
      });
    }, 500);
  }, []);

  return (
    <button
      onMouseDown={HandleRipple}
      onClick={onclick}
      className={`${classname} ${style.container}`}
    >
      <div className={style.wrap}>
        {show && (
          <div
            className={GetClassName(style, "circle", Theme)}
            style={{ top: `${y}px`, left: `${x}px` }}
          ></div>
        )}
      </div>
      {React.Children.map(children, (child) => React.cloneElement(child))}
    </button>
  );
});

export default RippleButton;
