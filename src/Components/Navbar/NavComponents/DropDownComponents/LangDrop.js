import React, { memo } from "react";
import style from "./sass/semidrop.module.scss";
import { BackArrowSvg, CheckedSvg } from "../Svg";
import { ReturnTheme, GetClassName } from "../../../../utils";
import { LazyLoad } from "../../../ComponentsUtils";
import { useSelector, useDispatch } from "react-redux";
import { SwitchLangAction } from "../../../../redux";

// Using Memo to prevent unnecessary re-renders

const LangDrop = memo(({ handleGoBackDrop, show }) => {
  // lang
  const lang = useSelector((state) => state.Navbar.language);

  //  dispatch
  const dispatch = useDispatch();

  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  const HandleClick = (id) => {
    dispatch(SwitchLangAction(id));
  };

  return (
    <div
      id="lang_drop"
      style={{ display: show ? "" : "none" }}
      className={GetClassName(style, "container", Theme)}
    >
      <LazyLoad render={show}>
        <div className={style.header}>
          <button onClick={handleGoBackDrop} className={style.header__arrow}>
            <BackArrowSvg />
          </button>
          <div className={style.header__text}>Choose your language</div>
        </div>
        <div className={`line line--${ReturnTheme(Theme)}`}></div>
        <div className={style.mainbody}>
          {lang.map((lang, index) => {
            return (
              <div
                key={index}
                onClick={() => HandleClick(lang.id)}
                className={GetClassName(style, "lang", Theme)}
              >
                <div className={style.lang__check}>
                  <CheckedSvg
                    color={
                      lang.checked ? (Theme ? "#fff" : "#333") : "transparent"
                    }
                  />
                </div>
                <span>{lang.lang}</span>
              </div>
            );
          })}
        </div>
      </LazyLoad>
    </div>
  );
});

export default LangDrop;
