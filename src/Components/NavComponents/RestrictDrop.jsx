import React, { useState, memo } from "react";
import styles from "./scss/semidrop.module.scss";
import { BackArrowSvg } from "../CompSvg";
import { LazyRender } from "../CompUtils";
import { useSelector, useDispatch } from "react-redux";
import { RestrictModeAction } from "../../redux";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const RestrictDrop = ({ handleGoBackDrop, show }) => {
  //
  const [effect, setEffect] = useState(false);
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  const restrict = useSelector((state) => state.Navbar.restrictMode);
  const dispatch = useDispatch();

  const HundleClick = () => {
    setEffect(true);
    setTimeout(() => {
      setEffect(false);
    }, 300);
  };

  const handleCheckboxChange = (event) => {
    dispatch(RestrictModeAction(event.target.checked));
  };

  return (
    <div
      id="restrictmode_drop"
      style={{ display: show ? "" : "none" }}
      className={styles.container}
    >
      <LazyRender render={show}>
        <div className={styles.header}>
          <button onClick={handleGoBackDrop} className={styles.header__arrow}>
            <BackArrowSvg Theme={Theme} />
          </button>
          <div className={styles.header__text}>Restricted Mode</div>
        </div>
        <div className="line"></div>
        <div className={styles.mainbody}>
          <div className={styles.textarea}>
            This helps hide potentially mature videos. No filter is 100%
            accurate.
          </div>
          <div className={styles.textarea}>
            This setting only applies to this browser.
          </div>
          <div className={styles.tr_container}>
            <span>ACTIVATE RESTRICTED MODE</span>

            <label className={styles.switch}>
              <input
                type="checkbox"
                className={styles.switch__toggle}
                checked={restrict.isRestrict}
                onChange={handleCheckboxChange}
              />
              <span className={styles.switch__btn} onClick={HundleClick}>
                <div
                  className={cx("circle", {
                    "circle--on": effect && restrict.isRestrict,
                    "circle--off": effect && !restrict.isRestrict,
                  })}
                ></div>
              </span>
            </label>
          </div>
        </div>
      </LazyRender>
    </div>
  );
};

export default memo(RestrictDrop);
