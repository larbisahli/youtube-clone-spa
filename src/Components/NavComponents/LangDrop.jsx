import React, { memo } from "react";
import styles from "./scss/semidrop.module.scss";
import { BackArrowSvg } from "../CompSvg";
import { LazyRender } from "../CompUtils";
import { useSelector, useDispatch } from "react-redux";
import { SwitchLangAction } from "../../redux";
import LangItem from "./LangItem";

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
              <LangItem
                key={index}
                onclick={() => HandleClick(lang.id)}
                loca={lang}
                L={lang.lang}
                Theme={Theme}
              />
            );
          })}
        </div>
      </LazyRender>
    </div>
  );
};

export default memo(LangDrop);
