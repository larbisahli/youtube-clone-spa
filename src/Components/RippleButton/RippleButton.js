import React, { useCallback, useState, useContext } from "react";
import "./ripplebutton_style.scss";
import { ReturnTheme } from "../../utils/utils";
import { ThemeContext } from "../../Context";

const RippleButton = React.memo(({ children, onclick, classname }) => {
  // Coordinates State
  const [{ y, x, show }, setRipple] = useState({
    y: 0,
    x: 0,
    show: false,
  });

  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

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
    }, 900);
  }, []);

  return (
    <button
      onMouseDown={HandleRipple}
      onClick={onclick}
      className={`${classname} ripple_button`}
    >
      <div className="ripple_button__wrap">
        {show && (
          <div
            className={`circle circle--${ReturnTheme(Theme)}`}
            style={{ top: `${y}px`, left: `${x}px` }}
          ></div>
        )}
      </div>
      {React.Children.map(children, (child) => React.cloneElement(child))}
    </button>
  );
});

export default RippleButton;
