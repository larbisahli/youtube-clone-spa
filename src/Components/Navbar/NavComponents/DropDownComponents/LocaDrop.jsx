import React, { memo } from "react";
import styles from "./scss/semidrop.module.scss";
import { BackArrowSvg, CheckedSvg } from "../Svg";
import { LazyRender } from "../../../ComponentsUtils";
import { useSelector, useDispatch } from "react-redux";
import { SwitchLocationAction } from "../../../../redux";
import classNames from "classnames/bind";

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
              <div
                key={index}
                onClick={() => HandleClick(loca.id)}
                className={styles.lang}
              >
                <div className={styles.lang__check}>
                  <CheckedSvg
                    Theme={Theme}
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
      </LazyRender>
    </div>
  );
};

export default memo(LocaDrop);
