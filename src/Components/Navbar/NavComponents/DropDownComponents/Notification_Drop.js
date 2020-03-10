import React, { useState, useEffect, useContext } from "react";
import "./notification_drop.scss";
import { SettingsIcon, Dots } from "../Icons";
import "./loading_spinner.scss";
import { ThemeContext } from "../../../../Context/ThemeContext";

// Using Memo to prevent unnecessary re-renders

const fake_noti = [
  {
    seen: false,
    proImage:
      "https://lh3.googleusercontent.com/-LcNXUMfV4lY/AAAAAAAAAAI/AAAAAAAAAAA/W6OZ-aBXx9c/s96-c-mo/photo.jpg",
    text: "Ben Eater uploaded: Subroutine call, now with RAM",
    time: "23 hours ago",
    thumbnail: "https://i.ytimg.com/vi/omI0MrTWiMU/hqdefault.jpg",
    video_id: ""
  },
  {
    seen: true,
    proImage:
      "https://lh6.googleusercontent.com/-OsgBxXITFdg/AAAAAAAAAAI/AAAAAAAAAAA/gDaUV_aSb2Q/s96-c-mo/photo.jpg",
    text: "Traversy Media uploaded: Sass Crash Course",
    time: "1 day ago",
    thumbnail: "https://i.ytimg.com/vi/nu5mdN2JIwM/hqdefault.jpg",
    video_id: ""
  },
  {
    seen: false,
    proImage:
      "https://lh5.googleusercontent.com/-FQU6W_hrGWw/AAAAAAAAAAI/AAAAAAAAAAA/LplmQYovgug/s96-c-mo/photo.jpg",
    text:
      "Dapp University uploaded: How to build a dApp with ZERO gas fees (Gas Station Network Tutorial)",
    time: "2 days ago",
    thumbnail: "https://i.ytimg.com/vi/r7zOcgYul8k/hqdefault.jpg",
    video_id: ""
  },
  {
    seen: true,
    proImage:
      "https://lh5.googleusercontent.com/-bWUaHwGz7To/AAAAAAAAAAI/AAAAAAAAAAA/xEUD6X5iT2Y/s96-c-mo/photo.jpg",
    text:
      "freeCodeCamp.org uploaded: Functional Programming in Java - Full Course",
    time: "4 days ago",
    thumbnail: "https://i.ytimg.com/vi/rPSL1alFIjI/hqdefault.jpg",
    video_id: ""
  },
  {
    seen: false,
    proImage:
      "https://lh4.googleusercontent.com/-s6PgRDss0XQ/AAAAAAAAAAI/AAAAAAAAAAA/fb7pMinwZh8/s96-c-mo/photo.jpg",
    text:
      "Corey Schafer uploaded: Python Pandas Tutorial (Part 9): Cleaning Data - Casting Datatypes and Handling Missing Values",
    time: "6 days ago",
    thumbnail: "https://i.ytimg.com/vi/KdmPHEnPJPs/hqdefault.jpg",
    video_id: ""
  },
  {
    seen: false,
    proImage:
      "https://lh3.googleusercontent.com/-QGhAvSy7npM/AAAAAAAAAAI/AAAAAAAAAAA/Uom6Bs6gR9Y/s96-c-mo/photo.jpg",
    text: "Linus Tech Tips is live: I WAS RIGHT!! - WAN Show Feb 21, 2020",
    time: "1 week ago",
    thumbnail: "https://i.ytimg.com/vi/7Wm7sEn8Mc8/hqdefault_live.jpg",
    video_id: ""
  },
  {
    seen: true,
    proImage:
      "https://lh5.googleusercontent.com/-FQU6W_hrGWw/AAAAAAAAAAI/AAAAAAAAAAA/LplmQYovgug/s96-c-mo/photo.jpg",
    text: "Ben Eater uploaded: What is a stack and how does it work?",
    time: "3 weeks ago",
    thumbnail: "https://i.ytimg.com/vi/OS5hIC2Zado/hqdefault.jpg",
    video_id: ""
  },
  {
    seen: true,
    proImage:
      "https://lh3.googleusercontent.com/-LcNXUMfV4lY/AAAAAAAAAAI/AAAAAAAAAAA/W6OZ-aBXx9c/s96-c-mo/photo.jpg",
    text: "Ben Eater uploaded: Subroutine call, now with RAM",
    time: "1 month ago",
    thumbnail: "https://i.ytimg.com/vi/xBjQVxVxOxc/hqdefault.jpg",
    video_id: ""
  }
];

const Notification = React.memo(({ show }) => {
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
      setNotifictions(fake_noti);
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
      className={
        "noti_Container" +
        (Theme ? " noti_Container-dark" : " noti_Container-light")
      }
    >
      <div className="noti_title_holder">
        <div className="noti_text">Notifications</div>
        <a
          href="https://www.youtube.com/account_notifications"
          target="_blank"
          rel="noopener noreferrer"
          className="noti_setting_icon _SS"
        >
          <SettingsIcon />
        </a>
      </div>
      <div
        className={"nt_line" + (Theme ? " nt_line-dark" : " nt_line-light")}
      ></div>
      {/*------------ Mapping ------------*/}
      <div
        className={
          "notifications_container" + (!isLoading ? " noti_spinner" : "")
        }
      >
        {!isLoading ? (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          notifications.map((noti, index) => {
            return (
              <div
                key={index}
                className={
                  "n_wrapper" + (Theme ? " n_wrapper-dark" : " n_wrapper-light")
                }
              >
                <div className="dot_container">
                  <div
                    className={
                      "n_dot" +
                      (noti.seen
                        ? " t_dot"
                        : Theme
                        ? " f_dot_dark"
                        : " f_dot_light")
                    }
                  ></div>
                </div>
                <div className="n_propic">
                  <img className="img_n" src={noti.proImage} alt="" />
                </div>
                <div className="n_textArea">
                  <div className="text_nt">{noti.text}</div>
                  <div className="date_nt">{noti.time}</div>
                </div>
                <div className="thumbnail_container">
                  <div className="thumbnail_wrapper">
                    <img
                      className="n_img"
                      width="90"
                      src={noti.thumbnail}
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="n_sd">
                  <Dots />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
});

export default Notification;
