import React, { useState, useEffect, memo } from "react";
import style from "./sass/notification.module.scss";
import { SettingsSvg, DotsSvg } from "../Svg";
import { useSelector } from "react-redux";
import { ReturnTheme, GetClassName } from "../../../../utils";
import { fake_notifications } from "./dummyData";
import { LazyLoad, Spinner } from "../../../ComponentsUtils";

// Using Memo to prevent unnecessary re-renders

const Notification = memo(({ show }) => {
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
      className={GetClassName(style, "container", Theme)}
    >
      <LazyLoad render={show}>
        <div className={style.header}>
          <div className={style.header__text}>Notifications</div>
          <a
            href="https://www.youtube.com/account_notifications"
            target="_blank"
            rel="noopener noreferrer"
            className={style.header__icon}
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
        <div className={style.body + (!isLoading ? ` ${style.spinner}` : "")}>
          {!isLoading ? (
            <Spinner />
          ) : (
            notifications.map((noti, index) => {
              return (
                <div
                  key={index}
                  className={GetClassName(style, "block", Theme)}
                >
                  <div className={style.unread}>
                    <div
                      className={`${style.dot} ${
                        style[
                          `dot--${
                            noti.seen ? "transparent" : ReturnTheme(Theme)
                          }`
                        ]
                      }`}
                    ></div>
                  </div>
                  <div className={GetClassName(style, "pronail", Theme)}>
                    <img
                      className={style.pronail__img}
                      src={noti.proImage}
                      alt=""
                    />
                  </div>
                  <div className={style.textcon}>
                    <div className={style.textcon__title}>{noti.text}</div>
                    <div className={style.textcon__date}>{noti.time}</div>
                  </div>
                  <div className={style.thumbnail}>
                    <div className={style.wrapper}>
                      <div
                        className={`${style.cover} ${style["cover--top"]} ${
                          style[`cover--top--${ReturnTheme(Theme)}`]
                        }`}
                      ></div>
                      <img
                        className={style.thumb_img}
                        width="90"
                        src={noti.thumbnail}
                        alt="thumbnail"
                      />
                      <div
                        className={`${style.cover} ${style["cover--bottom"]} ${
                          style[`cover--bottom--${ReturnTheme(Theme)}`]
                        }`}
                      ></div>
                    </div>
                  </div>
                  <div className={style.btn}>
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
});

export default Notification;
