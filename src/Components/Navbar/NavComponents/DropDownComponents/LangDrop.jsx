import React, { memo } from "react";
import styles from "./scss/semidrop.module.scss";
import { BackArrowSvg, CheckedSvg } from "../Svg";
import { LazyRender } from "../../../ComponentsUtils";
import { useSelector, useDispatch } from "react-redux";
import { SwitchLangAction } from "../../../../redux";

const LangDrop = ({ handleGoBackDrop, show }) => {
  const lang = useSelector((state) => state.Navbar.language);
  const dispatch = useDispatch();
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  const HandleClick = (id) => {
    dispatch(SwitchLangAction(id));
  };

  return (
    <div
      id="lang_drop"
      style={{ display: show ? "" : "none" }}
      className={styles.container}
    >
      <LazyRender render={show}>
        <div className={styles.header}>
          <button onClick={handleGoBackDrop} className={styles.header__arrow}>
            <BackArrowSvg Theme={Theme} />
          </button>
          <div className={styles.header__text}>Choose your language</div>
        </div>
        <div className="line"></div>
        <div className={styles.mainbody}>
          {lang.map((lang, index) => {
            return (
              <div
                key={index}
                onClick={() => HandleClick(lang.id)}
                className={styles.lang}
              >
                <div className={styles.lang__check}>
                  <CheckedSvg
                    Theme={Theme}
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
      </LazyRender>
    </div>
  );
};

export default memo(LangDrop);
