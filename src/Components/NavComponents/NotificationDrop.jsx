import React, { useState, useEffect, memo } from "react";
import styles from "./scss/notification.module.scss";
import { SettingsSvg, DotsSvg } from "../CompSvg";
import { fake_notifications } from "./dummyData";
import { useSelector } from "react-redux";
import { LazyRender, Spinner, ProfileImg } from "../CompUtils";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const Notification = ({ show }) => {
  const [notifications, setNotifictions] = useState([]);
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  const [{ isLoading }, setIsLoading] = useState({ isLoading: false });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading({ isLoading: true });
    }, 1500);

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
      className={styles.container}
    >
      <LazyRender render={show}>
        <div className={styles.header}>
          <div className={styles.header__text}>Notifications</div>
          <a
            href="https://www.youtube.com/account_notifications"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.header__icon}
            // _SS
          >
            <SettingsSvg Theme={Theme} />
          </a>
        </div>
        <div style={{ margin: "5px 0" }} className="line"></div>

        <div className={cx("body", { spinner: !isLoading })}>
          {!isLoading ? (
            <Spinner />
          ) : (
            notifications.map((noti, index) => {
              return <NotiItem noti={noti} Theme={Theme} />;
            })
          )}
        </div>
      </LazyRender>
    </div>
  );
};

const NotiItem = ({ noti, Theme }) => {
  return (
    <div className={styles.block}>
      <div className={styles.unread}>
        <div
          className={cx("dot", {
            [`dot--transparent`]: noti.seen,
          })}
        ></div>
      </div>

      <div className={styles.pronail}>
        <ProfileImg width={"48"} height={"48"} src={noti.proImage} />
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
            })}
          ></div>
        </div>
      </div>
      <div className={styles.btn}>
        <DotsSvg Theme={Theme} />
      </div>
    </div>
  );
};

export default memo(Notification);
