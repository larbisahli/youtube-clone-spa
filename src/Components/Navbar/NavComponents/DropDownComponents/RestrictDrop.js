import React, { useState, memo } from "react";
import styles from "./sass/semidrop.module.scss";
import { BackArrowSvg } from "../Svg";
import { ReturnTheme, GetClassName } from "../../../../utils";
import { LazyLoad } from "../../../ComponentsUtils";
import { useSelector, useDispatch } from "react-redux";
import { RestrictModeAction } from "../../../../redux";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

// Using Memo to prevent unnecessary re-renders

const RestrictDrop = ({ handleGoBackDrop, isCurrent, show }) => {
  //
  const [effect, setEffect] = useState(false);
  // Restrict mode
  const restrict = useSelector((state) => state.Navbar.restrictMode);
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  //  dispatch
  const dispatch = useDispatch();

  // ================
  //   Handle Click
  // ================

  const HundleClick = () => {
    setEffect(true);
    setTimeout(() => {
      setEffect(false);
    }, 300);
  };

  const handleCheckboxChange = (event) => {
    dispatch(RestrictModeAction(event.target.checked));
  };

  return (
    <div
      id="restrictmode_drop"
      style={{ display: show ? "" : "none" }}
      className={GetClassName(styles, "container", Theme)}
    >
      <LazyLoad render={show}>
        <div className={styles.header}>
          <button onClick={handleGoBackDrop} className={styles.header__arrow}>
            <BackArrowSvg isCurrent={isCurrent} />
          </button>
          <div className={styles.header__text}>Restricted Mode</div>
        </div>
        <div className={`line line--${ReturnTheme(Theme)}`}></div>
        <div className={styles.mainbody}>
          <div className={styles.textarea}>
            This helps hide potentially mature videos. No filter is 100%
            accurate.
          </div>
          <div className={styles.textarea}>
            This setting only applies to this browser.
          </div>
          <div className={GetClassName(styles, "tr_container", Theme)}>
            <span>ACTIVATE RESTRICTED MODE</span>

            <label className={GetClassName(styles, "switch", Theme)}>
              <input
                type="checkbox"
                className={styles.switch__toggle}
                checked={restrict.isRestrict}
                onChange={handleCheckboxChange}
              />
              <span className={styles.switch__btn} onClick={HundleClick}>
                <div
                  className={cx("circle", {
                    "circle--on": effect && restrict.isRestrict,
                    "circle--off": effect && !restrict.isRestrict,
                  })}
                ></div>
              </span>
            </label>
          </div>
        </div>
      </LazyLoad>
    </div>
  );
};

export default memo(RestrictDrop);
