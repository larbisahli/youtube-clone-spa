import React, { useState, memo } from "react";
import style from "./sass/semidrop.module.scss";
import { BackArrowSvg } from "../Svg";
import { useSelector, useDispatch } from "react-redux";
import { darken, lighten } from "../../../../redux";
import { ReturnTheme, GetClassName } from "../../../../utils";
import { LazyLoad } from "../../../ComponentsUtils";

// Using Memo to prevent unnecessary re-renders

const ThemeDrop = memo(({ handleGoBackDrop, isCurrent, show }) => {
  const [fade, setFade] = useState(false);
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  const dispatch = useDispatch();
  // ================
  //   Handle Click
  // ================

  const HundleClick = () => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
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
      className={GetClassName(style, "container", Theme)}
    >
      <LazyLoad render={show}>
        <div className={style.header}>
          <button onClick={handleGoBackDrop} className={style.header__arrow}>
            <BackArrowSvg isCurrent={isCurrent} />
          </button>
          <div className={style.header__text}>Dark theme</div>
        </div>
        <div className={`line line--${ReturnTheme(Theme)}`}></div>
        <div className={style.mainbody}>
          <div className={style.textarea}>
            Dark theme turns the light surfaces of the page dark, creating an
            experience ideal for night.
          </div>
          <div className={style.textarea}>It's Working try it out!</div>
          <div className={GetClassName(style, "tr_container", Theme)}>
            <span>DARK THEME</span>

            <label className={GetClassName(style, "switch", Theme)}>
              <input
                type="checkbox"
                className={style.switch__toggle}
                checked={Theme}
                onChange={handleCheckboxChange}
              />
              <span className={style.switch__btn} onClick={HundleClick}>
                <div
                  className={
                    style.circle +
                    (fade
                      ? Theme
                        ? ` ${style["circle--on"]}`
                        : ` ${style["circle--off"]}`
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

export default ThemeDrop;
