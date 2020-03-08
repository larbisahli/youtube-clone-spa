import React, { useState, useCallback, useContext } from "react";
import "./SA.scss";
import { BackArrow } from "../Icons";
import { ThemeContext } from "../../../../Context/ThemeContext";

// Using Memo to prevent unnecessary re-renders

const ThemeDrop = React.memo(({ handleGoBackDrop, isCurrent }) => {
  const [fade, setFade] = useState(false);
  // Theme context
  const [YtTheme, setYtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const HundleClick = useCallback(() => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 300);
  }, [setFade]);

  const handleCheckboxChange = useCallback(
    event => {
      setYtTheme({
        isDarkTheme: event.target.checked
      });
    },
    [setYtTheme]
  );

  return (
    <div
      id="theme_drop"
      className={
        "semiDrop_container" +
        (Theme ? " semiDrop_container-dark" : " semiDrop_container-light")
      }
    >
      <div className="sa_wrapper">
        <button onClick={handleGoBackDrop} className="sa_arrow">
          <BackArrow isCurrent={isCurrent} />
        </button>
        <div className="sa_text">Dark theme</div>
      </div>
      <div className={"line" + (Theme ? " line-dark" : " line-light")}></div>
      <div className="main_wrapper">
        <div className="th_text">
          Dark theme turns the light surfaces of the page dark, creating an
          experience ideal for night. Try it out!
        </div>
        <div className="th_text">It's Working try it out!</div>
        <div
          className={
            "th_container" +
            (Theme ? " th_container-dark" : " th_container-light")
          }
        >
          <div className="tc_text">DARK THEME</div>

          <label
            className={
              "switch-wrap" +
              (Theme ? " switch-wrap-dark" : " switch-wrap-light")
            }
          >
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
