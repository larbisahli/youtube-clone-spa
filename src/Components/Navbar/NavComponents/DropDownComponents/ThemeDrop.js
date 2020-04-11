import React, { useState, useCallback, useContext } from "react";
import "./sa_style.scss";
import { BackArrowSvg } from "../Svg";
import { ThemeContext } from "../../../../Context";
import { ReturnTheme } from "../../../../config";

// Using Memo to prevent unnecessary re-renders

const ThemeDrop = React.memo(({ handleGoBackDrop, isCurrent }) => {
  const [fade, setFade] = useState(false);
  // Theme context
  const [YtTheme, setYtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  // ================
  //   Handle Click
  // ================

  const HundleClick = useCallback(() => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 300);
  }, [setFade]);

  const handleCheckboxChange = useCallback(
    (event) => {
      setYtTheme({
        isDarkTheme: event.target.checked,
      });
    },
    [setYtTheme]
  );

  return (
    <div
      id="theme_drop"
      className={`semiDrop_container semiDrop_container-${ReturnTheme(Theme)}`}
    >
      <div className="sa_wrapper">
        <button onClick={handleGoBackDrop} className="sa_arrow">
          <BackArrowSvg isCurrent={isCurrent} />
        </button>
        <div className="sa_text">Dark theme</div>
      </div>
      <div className={`line line-${ReturnTheme(Theme)}`}></div>
      <div className="main_wrapper">
        <div className="th_text">
          Dark theme turns the light surfaces of the page dark, creating an
          experience ideal for night.
        </div>
        <div className="th_text">It's Working try it out!</div>
        <div className={`th_container th_container-${ReturnTheme(Theme)}`}>
          <div className="tc_text">DARK THEME</div>

          <label className={`switch-wrap switch-wrap-${ReturnTheme(Theme)}`}>
            <input
              type="checkbox"
              className="toggle"
              checked={Theme}
              onChange={handleCheckboxChange}
            />
            <span className="switch" onClick={HundleClick}>
              <div
                className={
                  "circle" +
                  (fade ? (Theme ? " circle-on" : " circle-off") : "")
                }
              ></div>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
});

export default ThemeDrop;
