import React, { useState, memo } from "react";
import style from "./sass/semidrop.module.scss";
import { BackArrowSvg } from "../Svg";
import { ReturnTheme, GetClassName } from "../../../../utils";
import { LazyLoad } from "../../../ComponentsUtils";
import { useSelector, useDispatch } from "react-redux";
import { RestrictModeAction } from "../../../../redux";

// Using Memo to prevent unnecessary re-renders

const RestrictDrop = memo(({ handleGoBackDrop, isCurrent, show }) => {
  //
  const [fade, setFade] = useState(false);
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
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 300);
  };

  const handleCheckboxChange = (event) => {
    dispatch(RestrictModeAction(event.target.checked));
  };

  return (
    <div
      id="restrictmode_drop"
      style={{ display: show ? "" : "none" }}
      className={GetClassName(style, "container", Theme)}
    >
      <LazyLoad render={show}>
        <div className={style.header}>
          <button onClick={handleGoBackDrop} className={style.header__arrow}>
            <BackArrowSvg isCurrent={isCurrent} />
          </button>
          <div className={style.header__text}>Restricted Mode</div>
        </div>
        <div className={`line line--${ReturnTheme(Theme)}`}></div>
        <div className={style.mainbody}>
          <div className={style.textarea}>
            This helps hide potentially mature videos. No filter is 100%
            accurate.
          </div>
          <div className={style.textarea}>
            This setting only applies to this browser.
          </div>
          <div className={GetClassName(style, "tr_container", Theme)}>
            <span>ACTIVATE RESTRICTED MODE</span>

            <label className={GetClassName(style, "switch", Theme)}>
              <input
                type="checkbox"
                className={style.switch__toggle}
                checked={restrict.isRestrict}
                onChange={handleCheckboxChange}
              />
              <span className={style.switch__btn} onClick={HundleClick}>
                <div
                  className={
                    style.circle +
                    (fade
                      ? restrict.isRestrict
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

export default RestrictDrop;
