import React, { memo } from "react";
import style from "./sass/semidrop.module.scss";
import { BackArrowSvg, CheckedSvg } from "../Svg";
import { ReturnTheme, GetClassName } from "../../../../utils";
import { LazyLoad } from "../../../ComponentsUtils";
import { useSelector, useDispatch } from "react-redux";
import { SwitchLocationAction } from "../../../../redux";

// Using Memo to prevent unnecessary re-renders

const LocaDrop = memo(({ handleGoBackDrop, isCurrent, show }) => {
  // location
  const loca = useSelector((state) => state.Navbar.location);

  //  dispatch
  const dispatch = useDispatch();

  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  const HandleClick = (id) => {
    dispatch(SwitchLocationAction(id));
  };

  return (
    <div
      id="loca_drop"
      style={{ display: show ? "" : "none" }}
      className={`${GetClassName(style, "container", Theme)} ${
        style[`scroll--${ReturnTheme(Theme)}`]
      }`}
    >
      <LazyLoad render={show}>
        <div className={style.header}>
          <button onClick={handleGoBackDrop} className={style.header__arrow}>
            <BackArrowSvg isCurrent={isCurrent} />
          </button>
          <div className={style.header__text}>Choose your language</div>
        </div>
        <div className={`line line--${ReturnTheme(Theme)}`}></div>
        <div className={`${style.mainbody} ${style.overflow}`}>
          {loca.map((loca, index) => {
            return (
              <div
                key={index}
                onClick={() => HandleClick(loca.id)}
                className={GetClassName(style, "lang", Theme)}
              >
                <div className={style.lang__check}>
                  <CheckedSvg
                    color={
                      loca.checked ? (Theme ? "#fff" : "#333") : "transparent"
                    }
                  />
                </div>
                <span>{loca.loca}</span>
              </div>
            );
          })}
        </div>
      </LazyLoad>
    </div>
  );
});

export default LocaDrop;
