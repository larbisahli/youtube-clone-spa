import React, { useState, useCallback, useContext } from "react";
import "./sa_style.scss";
import { BackArrowSvg } from "../Svg";
import { NavContext } from "../../../../Context/NavContext";
import { ThemeContext } from "../../../../Context/ThemeContext";
import { ReturnTheme } from "../../../../config";

// Using Memo to prevent unnecessary re-renders

const RestrictDrop = React.memo(({ handleGoBackDrop, isCurrent }) => {
  const [fade, setFade] = useState(false);
  // Navbar context
  const { restrictState } = useContext(NavContext);
  const [restrict, setRestrict] = restrictState;
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const HundleClick = useCallback(() => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 300);
  }, [setFade]);

  const handleCheckboxChange = useCallback(
    event => {
      setRestrict({
        isRestrict: event.target.checked
      });
    },
    [setRestrict]
  );

  return (
    <div
      id="restrictmode_drop"
      className={`semiDrop_container semiDrop_container-${ReturnTheme(Theme)}`}
    >
      <div className="sa_wrapper">
        <button onClick={handleGoBackDrop} className="sa_arrow">
          <BackArrowSvg isCurrent={isCurrent} />
        </button>
        <div className="sa_text">Restricted Mode</div>
      </div>
      <div className={`line line-${ReturnTheme(Theme)}`}></div>
      <div className="main_wrapper">
        <div className="th_text">
          This helps hide potentially mature videos. No filter is 100% accurate.
        </div>
        <div className="th_text">
          This setting only applies to this browser.
        </div>
        <div className={`th_container th_container-${ReturnTheme(Theme)}`}>
          <div className="tc_text">ACTIVATE RESTRICTED MODE</div>

          <label className={`switch-wrap switch-wrap-${ReturnTheme(Theme)}`}>
            <input
              type="checkbox"
              className="toggle"
              checked={restrict.isRestrict}
              onChange={handleCheckboxChange}
            />
            <span className="switch" onClick={HundleClick}>
              <div
                className={
                  "circle" +
                  (fade
                    ? restrict.isRestrict
                      ? " circle-on"
                      : " circle-off"
                    : "")
                }
              ></div>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
});

export default RestrictDrop;
