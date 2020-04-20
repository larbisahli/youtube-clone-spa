import React, { useState, useCallback, useContext } from "react";
import "./sass/semidrop_style.scss";
import { BackArrowSvg } from "../Svg";
import { ThemeContext } from "../../../../Context";
import { ReturnTheme } from "../../../../utils/utils";

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
    <div id="theme_drop" className={`semiDrop semiDrop--${ReturnTheme(Theme)}`}>
      <div className="semiDrop__header">
        <button onClick={handleGoBackDrop} className="semiDrop__header__arrow">
          <BackArrowSvg isCurrent={isCurrent} />
        </button>
        <div className="semiDrop__header__text">Dark theme</div>
      </div>
      <div className={`line line--${ReturnTheme(Theme)}`}></div>
      <div className="semiDrop__main_wrapper">
        <div className="theme_text">
          Dark theme turns the light surfaces of the page dark, creating an
          experience ideal for night.
        </div>
        <div className="theme_text">It's Working try it out!</div>
        <div
          className={`theme_container theme_container--${ReturnTheme(Theme)}`}
        >
          <span>DARK THEME</span>

          <label className={`switch switch--${ReturnTheme(Theme)}`}>
            <input
              type="checkbox"
              className="switch__toggle"
              checked={Theme}
              onChange={handleCheckboxChange}
            />
            <span className="switch__switch_btn" onClick={HundleClick}>
              <div
                className={
                  "circle" +
                  (fade ? (Theme ? " circle--on" : " circle--off") : "")
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
