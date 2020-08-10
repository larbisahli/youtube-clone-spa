import React, { memo } from "react";
import styles from "./scss/semidrop.module.scss";
import { BackArrowSvg } from "../CompSvg";
import { LazyRender } from "../CompUtils";
import { useSelector, useDispatch } from "react-redux";
import { SwitchLocationAction } from "../../redux";
import classNames from "classnames/bind";
import LangItem from "./LangItem";

let cx = classNames.bind(styles);

const LocaDrop = ({ handleGoBackDrop, show }) => {
  const loca = useSelector((state) => state.Navbar.location);
  const dispatch = useDispatch();
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  const HandleClick = (id) => {
    dispatch(SwitchLocationAction(id));
  };

  return (
    <div
      id="loca_drop"
      style={{ display: show ? "" : "none" }}
      className={cx("container", "scroll")}
    >
      <LazyRender render={show}>
        <div className={styles.header}>
          <button onClick={handleGoBackDrop} className={styles.header__arrow}>
            <BackArrowSvg Theme={Theme} />
          </button>
          <div className={styles.header__text}>Choose your language</div>
        </div>
        <div className="line"></div>
        <div className={cx("mainbody", "overflow")}>
          {loca.map((loca, index) => {
            return (
              <LangItem
                key={index}
                onclick={() => HandleClick(loca.id)}
                loca={loca}
                L={loca.loca}
                Theme={Theme}
              />
            );
          })}
        </div>
      </LazyRender>
    </div>
  );
};

export default memo(LocaDrop);
