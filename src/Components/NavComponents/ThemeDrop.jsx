import React, { useState, memo } from "react";
import styles from "./scss/semidrop.module.scss";
import { BackArrowSvg } from "../CompSvg";
import { useSelector, useDispatch } from "react-redux";
import { darken, lighten } from "../../redux";
import { LazyRender } from "../CompUtils";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const generalBackgroundDark = "#1f1f1f";
const generalBackgroundLight = "#f9f9f9";

const ThemeDrop = ({ handleGoBackDrop, show }) => {
  const [effect, setEffect] = useState(false);
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  const dispatch = useDispatch();

  const HundleDarken = () => {
    const body = document.body;

    if (!Theme) {
      document.body.style.backgroundColor = generalBackgroundDark;

      dispatch(darken());

      try {
        localStorage.setItem("isDarkMode", JSON.stringify(true));
      } catch (err) {
        console.log("localStorage: ", err);
      }

      if (body) {
        body.classList.add("dark");
      }
    }
  };

  const HundleLighten = () => {
    const body = document.body;

    if (Theme) {
      document.body.style.backgroundColor = generalBackgroundLight;

      dispatch(lighten());

      try {
        localStorage.setItem("isDarkMode", JSON.stringify(false));
      } catch (err) {
        console.log("localStorage: ", err);
      }

      if (body) {
        body.classList.remove("dark");
      }
    }
  };

  const HundleEffect = () => {
    setEffect(true);
    setTimeout(() => {
      setEffect(false);
    }, 300);
  };

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      HundleDarken();
    } else {
      HundleLighten();
    }
  };

  return (
    <div
      id="theme_drop"
      style={{ display: show ? "" : "none" }}
      className={styles.container}
    >
      <LazyRender render={show}>
        <div className={styles.header}>
          <button onClick={handleGoBackDrop} className={styles.header__arrow}>
            <BackArrowSvg Theme={Theme} />
          </button>
          <div className={styles.header__text}>Dark theme</div>
        </div>
        <div className="line"></div>
        <div className={styles.mainbody}>
          <div className={styles.textarea}>
            Dark theme turns the light surfaces of the page dark, creating an
            experience ideal for night.
          </div>
          <div className={styles.textarea}>It's Working try it out!</div>
          <div className={styles.tr_container}>
            <span>DARK THEME</span>

            <label className={styles.switch}>
              <input
                type="checkbox"
                className={styles.switch__toggle}
                checked={Theme}
                onChange={handleCheckboxChange}
              />
              <span className={styles.switch__btn} onClick={HundleEffect}>
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
      </LazyRender>
    </div>
  );
};

export default memo(ThemeDrop);
