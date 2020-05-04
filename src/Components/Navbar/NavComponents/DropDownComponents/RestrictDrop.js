import React, { useState, useCallback, useContext } from "react";
import "./sass/semidrop_style.scss";
import { BackArrowSvg } from "../Svg";
import { ThemeContext, NavContext } from "../../../../Context";
import { ReturnTheme } from "../../../../utils";
import { LazyLoad } from "../../../ComponentsUtils";

// Using Memo to prevent unnecessary re-renders

const RestrictDrop = React.memo(({ handleGoBackDrop, isCurrent, show }) => {
  const [fade, setFade] = useState(false);
  // Navbar context
  const { restrictState } = useContext(NavContext);
  const [restrict, setRestrict] = restrictState;
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
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
      setRestrict({
        isRestrict: event.target.checked,
      });
    },
    [setRestrict]
  );

  return (
    <div
      id="restrictmode_drop"
      style={{ display: show ? "" : "none" }}
      className={`semiDrop semiDrop--${ReturnTheme(Theme)}`}
    >
      <LazyLoad render={show}>
        <div className="semiDrop__header">
          <button
            onClick={handleGoBackDrop}
            className="semiDrop__header__arrow"
          >
            <BackArrowSvg isCurrent={isCurrent} />
          </button>
          <div className="semiDrop__header__text">Restricted Mode</div>
        </div>
        <div className={`line line--${ReturnTheme(Theme)}`}></div>
        <div className="semiDrop__main_wrapper">
          <div className="theme_text">
            This helps hide potentially mature videos. No filter is 100%
            accurate.
          </div>
          <div className="theme_text">
            This setting only applies to this browser.
          </div>
          <div
            className={`theme_container theme_container--${ReturnTheme(Theme)}`}
          >
            <div className="tc_text">ACTIVATE RESTRICTED MODE</div>

            <label className={`switch switch--${ReturnTheme(Theme)}`}>
              <input
                type="checkbox"
                className="switch__toggle"
                checked={restrict.isRestrict}
                onChange={handleCheckboxChange}
              />
              <span className="switch__switch_btn" onClick={HundleClick}>
                <div
                  className={
                    "circle" +
                    (fade
                      ? restrict.isRestrict
                        ? " circle--on"
                        : " circle--off"
                      : "")
                  }
                ></div>
              </span>
            </label>
          </div>
        </div>
      </LazyLoad>
    </div>
  );
});

export default RestrictDrop;
