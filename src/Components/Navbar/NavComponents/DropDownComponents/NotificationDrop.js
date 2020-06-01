import React, { useState, useEffect, memo } from "react";
import styles from "./scss/notification.module.scss";
import { SettingsSvg, DotsSvg } from "../Svg";
import { useSelector } from "react-redux";
import { ReturnTheme, GetClassName } from "../../../../utils";
import { fake_notifications } from "./dummyData";
import { LazyLoad, Spinner, ProfileImg } from "../../../ComponentsUtils";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

// Using Memo to prevent unnecessary re-renders

const Notification = ({ show }) => {
  // Notification State
  const [notifications, setNotifictions] = useState([]);
  const [{ isLoading }, setIsLoading] = useState({ isLoading: false });
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  useEffect(() => {
    // Simulating loading time

    setTimeout(() => {
      setIsLoading({ isLoading: true });
    }, 1500);

    // Only load if the component is mounted
    if (show) {
      setNotifictions(fake_notifications);
    }

    return () => {
      // Cleaning up
      setNotifictions([]);
      setIsLoading({ isLoading: false });
    };
  }, [show]);

  return (
    <div
      id="noti_drop"
      style={{ display: show ? "" : "none" }}
      className={GetClassName(styles, "container", Theme)}
    >
      <LazyLoad render={show}>
        <div className={styles.header}>
          <div className={styles.header__text}>Notifications</div>
          <a
            href="https://www.youtube.com/account_notifications"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.header__icon}
            // _SS
          >
            <SettingsSvg />
          </a>
        </div>
        <div
          style={{ margin: "5px 0" }}
          className={`line line--${ReturnTheme(Theme)}`}
        ></div>
        {/*------------ Mapping ------------*/}
        <div className={cx("body", { spinner: !isLoading })}>
          {!isLoading ? (
            <Spinner />
          ) : (
            notifications.map((noti, index) => {
              return (
                <div
                  key={index}
                  className={GetClassName(styles, "block", Theme)}
                >
                  <div className={styles.unread}>
                    <div
                      className={cx("dot", {
                        [`dot--${ReturnTheme(Theme)}`]: !noti.seen,
                        [`dot--transparent`]: noti.seen,
                      })}
                    ></div>
                  </div>

                  <div className={styles.pronail}>
                    <ProfileImg
                      width={"48"}
                      height={"48"}
                      src={noti.proImage}
                    />
                  </div>

                  <div className={styles.textcon}>
                    <div className={styles.textcon__title}>{noti.text}</div>
                    <div className={styles.textcon__date}>{noti.time}</div>
                  </div>
                  <div className={styles.thumbnail}>
                    <div className={styles.wrapper}>
                      <div
                        className={cx("cover", {
                          "cover--top": true,
                          [`cover--top--${ReturnTheme(Theme)}`]: true,
                        })}
                      ></div>
                      <img
                        className={styles.thumb_img}
                        width="90"
                        src={noti.thumbnail}
                        alt="thumbnail"
                      />
                      <div
                        className={cx("cover", {
                          "cover--bottom": true,
                          [`cover--bottom--${ReturnTheme(Theme)}`]: true,
                        })}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.btn}>
                    <DotsSvg />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </LazyLoad>
    </div>
  );
};

export default memo(Notification);
