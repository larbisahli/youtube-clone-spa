import React, { useState, memo } from "react";
import styles from "./sass/semidrop.module.scss";
import { BackArrowSvg } from "../Svg";
import { useSelector, useDispatch } from "react-redux";
import { darken, lighten } from "../../../../redux";
import { ReturnTheme, GetClassName } from "../../../../utils";
import { LazyLoad } from "../../../ComponentsUtils";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

// Using Memo to prevent unnecessary re-renders

const ThemeDrop = ({ handleGoBackDrop, isCurrent, show }) => {
  const [effect, setEffect] = useState(false);
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

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
    // app update this slow so we have to put it on top.
    const generalBackgroundDark = "#1f1f1f";
    const generalBackgroundLight = "#f9f9f9";

    if (event.target.checked) {
      dispatch(darken());
      document.body.style.backgroundColor = generalBackgroundDark;
    } else {
      dispatch(lighten());
      document.body.style.backgroundColor = generalBackgroundLight;
    }
  };

  return (
    <div
      id="theme_drop"
      style={{ display: show ? "" : "none" }}
      className={GetClassName(styles, "container", Theme)}
    >
      <LazyLoad render={show}>
        <div className={styles.header}>
          <button onClick={handleGoBackDrop} className={styles.header__arrow}>
            <BackArrowSvg isCurrent={isCurrent} />
          </button>
          <div className={styles.header__text}>Dark theme</div>
        </div>
        <div className={`line line--${ReturnTheme(Theme)}`}></div>
        <div className={styles.mainbody}>
          <div className={styles.textarea}>
            Dark theme turns the light surfaces of the page dark, creating an
            experience ideal for night.
          </div>
          <div className={styles.textarea}>It's Working try it out!</div>
          <div className={GetClassName(styles, "tr_container", Theme)}>
            <span>DARK THEME</span>

            <label className={GetClassName(styles, "switch", Theme)}>
              <input
                type="checkbox"
                className={styles.switch__toggle}
                checked={Theme}
                onChange={handleCheckboxChange}
              />
              <span className={styles.switch__btn} onClick={HundleClick}>
                <div
                  className={cx("circle", {
                    "circle--on": effect && Theme,
                    "circle--off": effect && !Theme,
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

export default memo(ThemeDrop);
