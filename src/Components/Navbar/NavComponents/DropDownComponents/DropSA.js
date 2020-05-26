import React, { memo } from "react";
import styles from "./sass/semidrop.module.scss";
import { BackArrowSvg, CheckedSvg, AddAccSvg, SOSvg } from "../Svg";
import { ReturnTheme, GetClassName } from "../../../../utils";
import { LazyLoad } from "../../../ComponentsUtils";
import { useSelector, useDispatch } from "react-redux";
import { SwitchAccAction } from "../../../../redux";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

// Using memo to prevent unnecessary re-renders

const SADrop = ({ handleGoBackDrop, show }) => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  // accounts
  const accounts = useSelector((state) => state.Navbar.accounts);

  // select the current active account
  const IsCurrentAccount = accounts.filter((acc) => acc.isCurrent)[0];

  // ==========
  //  dispatch
  // ==========
  const dispatch = useDispatch();

  const HandleProChange = (id) => {
    dispatch(SwitchAccAction(id));
  };

  const acc_wrap = GetClassName(styles, "acc_wrap", Theme);

  return (
    <div
      id="switch_acc_drop"
      style={{ display: show ? "" : "none" }}
      className={GetClassName(styles, "container", Theme)}
    >
      <LazyLoad render={show}>
        <div className={styles.header}>
          <button onClick={handleGoBackDrop} className={styles.header__arrow}>
            <BackArrowSvg />
          </button>
          <div className={styles.header__text}>Accounts</div>
        </div>
        <div className={`line line--${ReturnTheme(Theme)}`}></div>
        <div className={styles.mainbody}>
          <div className={styles.email_area}>{IsCurrentAccount.email}</div>
          {accounts.map((acc, index) => {
            return (
              <div
                onClick={() => HandleProChange(acc.accId)}
                key={index}
                className={acc_wrap}
              >
                <div className={styles.pronail}>
                  <img
                    className={styles.pronail__img}
                    height="40"
                    width="40"
                    src={acc.img}
                    alt="_avatar_"
                  />
                </div>
                <div className={styles.sa_body}>
                  <div className={styles.sa_wrap}>
                    <div className={styles.sa_wrap__name}>{acc.name}</div>
                    <div
                      className={GetClassName(styles, "sa_wrap__subs", Theme)}
                    >
                      {acc.subs} subscribers
                    </div>
                  </div>
                  <div
                    className={styles.check_area}
                    style={{ display: acc.isCurrent ? "" : "none" }}
                  >
                    <CheckedSvg />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{ margin: "5px 0" }}
          className={`line line--${ReturnTheme(Theme)}`}
        ></div>
        <div className={cx("mainbody", "btmpad")}>
          <div className={acc_wrap}>
            <div className={styles.btmpad_icon}>
              <AddAccSvg />
            </div>
            <div className={styles.btmpad_text}>Add account</div>
          </div>
          <div className={acc_wrap}>
            <div className={styles.btmpad_icon}>
              <SOSvg />
            </div>
            <div className={styles.btmpad_text}>Sign out</div>
          </div>
        </div>
      </LazyLoad>
    </div>
  );
};

export default memo(SADrop);
