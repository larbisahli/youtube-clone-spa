import React, { memo } from "react";
import styles from "./scss/semidrop.module.scss";
import { BackArrowSvg, CheckedSvg } from "../Svg";
import { ReturnTheme, GetClassName } from "../../../../utils";
import { LazyLoad } from "../../../ComponentsUtils";
import { useSelector, useDispatch } from "react-redux";
import { SwitchLangAction } from "../../../../redux";

// Using Memo to prevent unnecessary re-renders

const LangDrop = ({ handleGoBackDrop, show }) => {
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
      className={GetClassName(styles, "container", Theme)}
    >
      <LazyLoad render={show}>
        <div className={styles.header}>
          <button onClick={handleGoBackDrop} className={styles.header__arrow}>
            <BackArrowSvg />
          </button>
          <div className={styles.header__text}>Choose your language</div>
        </div>
        <div className={`line line--${ReturnTheme(Theme)}`}></div>
        <div className={styles.mainbody}>
          {lang.map((lang, index) => {
            return (
              <div
                key={index}
                onClick={() => HandleClick(lang.id)}
                className={GetClassName(styles, "lang", Theme)}
              >
                <div className={styles.lang__check}>
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
};

export default memo(LangDrop);
