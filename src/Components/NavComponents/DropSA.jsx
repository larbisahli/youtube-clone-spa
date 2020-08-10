import React, { memo } from "react";
import styles from "./scss/semidrop.module.scss";
import { BackArrowSvg, CheckedSvg } from "../CompSvg";
import { ReactComponent as AddAccSvg } from "../../assets/icon/AddAcc.svg";
import { ReactComponent as SOSvg } from "../../assets/icon/so.svg";
import { LazyRender, ProfileImg } from "../CompUtils";
import { useSelector, useDispatch } from "react-redux";
import { SwitchAccAction } from "../../redux";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const SADrop = ({ handleGoBackDrop, show }) => {
  const accounts = useSelector((state) => state.Navbar.accounts);
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  const IsCurrentAccount = accounts.filter((acc) => acc.isCurrent)[0];
  const dispatch = useDispatch();

  const HandleProChange = (id) => {
    dispatch(SwitchAccAction(id));
  };

  return (
    <div
      id="switch_acc_drop"
      style={{ display: show ? "" : "none" }}
      className={styles.container}
    >
      <LazyRender render={show}>
        <div className={styles.header}>
          <button onClick={handleGoBackDrop} className={styles.header__arrow}>
            <BackArrowSvg Theme={Theme} />
          </button>
          <div className={styles.header__text}>Accounts</div>
        </div>
        <div className={"line"}></div>
        <div className={styles.mainbody}>
          <div className={styles.email_area}>{IsCurrentAccount.email}</div>
          {accounts.map((acc, index) => {
            return (
              <div
                onClick={() => HandleProChange(acc.accId)}
                key={index}
                className={styles.acc_wrap}
              >
                <ProfileImg
                  width={"40"}
                  height={"40"}
                  src={acc.img}
                  classname={styles.pronail}
                />

                <div className={styles.sa_body}>
                  <div className={styles.sa_wrap}>
                    <div className={styles.sa_wrap__name}>{acc.name}</div>
                    <div className={styles.sa_wrap__subs}>
                      {acc.subs} subscribers
                    </div>
                  </div>
                  <div
                    className={styles.check_area}
                    style={{ display: acc.isCurrent ? "" : "none" }}
                  >
                    <CheckedSvg Theme={Theme} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ margin: "5px 0" }} className={"line"}></div>
        <div className={cx("mainbody", "btmpad")}>
          <div className={styles.acc_wrap}>
            <div className={styles.btmpad_icon}>
              <AddAccSvg Theme={Theme} />
            </div>
            <div className={styles.btmpad_text}>Add account</div>
          </div>
          <div className={styles.acc_wrap}>
            <div className={styles.btmpad_icon}>
              <SOSvg Theme={Theme} />
            </div>
            <div className={styles.btmpad_text}>Sign out</div>
          </div>
        </div>
      </LazyRender>
    </div>
  );
};

export default memo(SADrop);
