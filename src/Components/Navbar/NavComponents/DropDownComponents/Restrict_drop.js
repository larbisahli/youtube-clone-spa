import React, { useState, useCallback, useContext } from "react";
import "./SA.scss";
import { BackArrow } from "../Icons";
import { NavContext } from "../../../../Context/NavContext";
import { ThemeContext } from "../../../../Context/ThemeContext";

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
      className={
        "semiDrop_container" +
        (Theme ? " semiDrop_container-dark" : " semiDrop_container-light")
      }
    >
      <div className="sa_wrapper">
        <button onClick={handleGoBackDrop} className="sa_arrow">
          <BackArrow isCurrent={isCurrent} />
        </button>
        <div className="sa_text">Restricted Mode</div>
      </div>
      <div className={"line" + (Theme ? " line-dark" : " line-light")}></div>
      <div className="main_wrapper">
        <div className="th_text">
          This helps hide potentially mature videos. No filter is 100% accurate.
        </div>
        <div className="th_text">
          This setting only applies to this browser.
        </div>
        <div
          className={
            "th_container" +
            (Theme ? " th_container-dark" : " th_container-light")
          }
        >
          <div className="tc_text">ACTIVATE RESTRICTED MODE</div>

          <label
            className={
              "switch-wrap" +
              (Theme ? " switch-wrap-dark" : " switch-wrap-light")
            }
          >
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
