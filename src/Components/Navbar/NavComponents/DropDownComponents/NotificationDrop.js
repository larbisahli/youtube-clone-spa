import React, { useState, useEffect, useContext } from "react";
import "./sass/notificationdrop_style.scss";
import { SettingsSvg, DotsSvg } from "../Svg";
import { ThemeContext } from "../../../../Context";
import { ReturnTheme } from "../../../../utils";
import { fake_notifications } from "./dummyData";
import { LazyLoad, Spinner } from "../../../ComponentsUtils";

// Using Memo to prevent unnecessary re-renders

const Notification = React.memo(({ show }) => {
  // Notification State
  const [notifications, setNotifictions] = useState([]);
  const [{ isLoading }, setIsLoading] = useState({ isLoading: false });
  // Theme constext
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

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
      className={`notification notification--${ReturnTheme(Theme)}`}
    >
      <LazyLoad render={show}>
        <div className="notification__header">
          <div className="notification__header__text">Notifications</div>
          <a
            href="https://www.youtube.com/account_notifications"
            target="_blank"
            rel="noopener noreferrer"
            className="notification__header__setting_icon"
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
        <div
          className={"notification__body" + (!isLoading ? " noti_spinner" : "")}
        >
          {!isLoading ? (
            <Spinner />
          ) : (
            notifications.map((noti, index) => {
              return (
                <div
                  key={index}
                  className={`noti_block noti_block--${ReturnTheme(Theme)}`}
                >
                  <div className="noti_block__dot">
                    <div
                      className={`dot dot--${
                        noti.seen ? "transparent" : ReturnTheme(Theme)
                      }`}
                    ></div>
                  </div>
                  <div
                    className={`noti_block__thumb noti_block__thumb--${ReturnTheme(
                      Theme
                    )}`}
                  >
                    <img
                      className="noti_block__thumb__img"
                      src={noti.proImage}
                      alt=""
                    />
                  </div>
                  <div className="noti_block__text_wrap">
                    <div className="noti_block__text_wrap__title">
                      {noti.text}
                    </div>
                    <div className="noti_block__text_wrap__date">
                      {noti.time}
                    </div>
                  </div>
                  <div className="noti_block__thumbnail">
                    <div className="noti_block__thumbnail__wrapper">
                      <div
                        className={`noti_bg_cover noti_bg_cover--top noti_bg_cover--top--${ReturnTheme(
                          Theme
                        )}`}
                      ></div>
                      <img
                        className="noti_thumb_img"
                        width="90"
                        src={noti.thumbnail}
                        alt="thumbnail"
                      />
                      <div
                        className={`noti_bg_cover noti_bg_cover--bottom noti_bg_cover--bottom--${ReturnTheme(
                          Theme
                        )}`}
                      ></div>
                    </div>
                  </div>
                  <div className="noti_block__btn">
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
