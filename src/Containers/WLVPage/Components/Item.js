import React, { memo, useCallback, useState, useEffect } from "react";
import styles from "./scss/item.module.scss";
import DropMenu from "./DropMenu";
import { Link } from "react-router-dom";
import { HandleDuration, TextReducer, GetClassName } from "../../../utils";
import { DRSvg } from "../../Svg";
import { DotsSvg } from "../../../Components/Navbar/NavComponents/Svg";
import { useFetch } from "../../../Components/hooks/useFetch";

const Item = ({
  index,
  HandleLink,
  SearchValue,
  Theme,
  HandleQueueClick,
  wl,
}) => {
  // menu drop state
  const [showMenudrop, setShowMenudrop] = useState(false);

  // current clicked menu index drop
  const [CurrentMenuIndex, setCurrentMenuIndex] = useState(0);

  // ===================
  // Close menu dropdown
  // ===================
  const HandleCloseMenudrop = useCallback(() => {
    setShowMenudrop(() => false);
    const Menu = document.getElementById(`wl-mn-${CurrentMenuIndex}`);
    if (Menu != null) {
      Menu.style.display = "none";
    }
    document.removeEventListener("click", HandleCloseMenudrop);
  }, [setShowMenudrop, CurrentMenuIndex]);

  // ===================
  // Show menu dropdown
  // ===================
  const HandleShowMenudrop = useCallback(
    (e) => {
      let index = CurrentMenuIndex;
      // responsive dropdown
      // 213px is the menu height + 68px img height + 16 padding

      if (e.clientY > window.innerHeight - 297) {
        document.getElementById(`wl-mn-${index}`).style.top = "-95%";
        document.getElementById(`wl-mn-${index}`).style.right = "10%";
      }

      if (!showMenudrop) {
        document.addEventListener("click", HandleCloseMenudrop);
        document.getElementById(`wl-mn-${index}`).style.display = "";
      } else {
        document.removeEventListener("click", HandleCloseMenudrop);
        document.getElementById(`wl-mn-${index}`).style.display = "none";
      }
      setShowMenudrop(() => !showMenudrop);
    },
    [setShowMenudrop, showMenudrop, HandleCloseMenudrop, CurrentMenuIndex]
  );

  // =========================
  //  FETCH VIDEOS DETAILS
  // =========================

  const [VidId, setVidId] = useState(false);

  useEffect(() => {
    if (SearchValue !== "WL" && SearchValue !== "LV") {
      setVidId(wl.videoId);
    }
  }, [SearchValue, wl.videoId]);

  // false means don't make an api call
  const VideoDetails = useFetch(VidId, "videos", "contentDetails,statistics");

  console.log("VideoDetails :>> ", VideoDetails);

  const FetchStat = (id, index) => {
    if (Object.keys(VideoDetails).length !== 0) {
      const durationIdElement = document.getElementById(
        `wl-${id}-${index}-duration`
      );

      if (durationIdElement) {
        durationIdElement.textContent = HandleDuration(
          VideoDetails.contentDetails.duration
        );
      }
    }
  };

  return (
    <div className={GetClassName(styles, "container", Theme)}>
      <div className={styles.drag_area}>
        <DRSvg />
      </div>
      <div className={GetClassName(styles, "wrap", Theme)}>
        <div className={styles.wrap__thumb} onClick={() => HandleLink(wl)}>
          <img
            width="120"
            className={styles.wrap__img}
            src={wl.thumbnail}
            alt=""
          />

          <div
            id={`wl-${wl.videoId}-${index}-duration`}
            className={styles.inner}
          >
            {VidId ? FetchStat(wl.videoId, index) : HandleDuration(wl.duration)}
          </div>
        </div>

        <div className={styles.wrap__textarea}>
          <div className={styles.details}>
            <div
              className={styles.details__title}
              onClick={() => HandleLink(wl)}
            >
              <span>{TextReducer(wl.title, 56)}</span>
            </div>

            <Link to={`/channel/${wl.channelId}`}>
              <div
                className={GetClassName(
                  styles,
                  "details__channel_title",
                  Theme
                )}
              >
                {wl.channelTitle}
              </div>
            </Link>
          </div>
          <div
            // id={`${index}`}
            onMouseEnter={() => setCurrentMenuIndex(() => index)}
            onClick={HandleShowMenudrop}
            className={GetClassName(styles, "dots", Theme)}
          >
            <DotsSvg />
          </div>
          {/* Drop */}
          <DropMenu
            index={index}
            Theme={Theme}
            HandleQueueClick={HandleQueueClick}
            wl={wl}
            SearchValue={SearchValue}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
