import React, { useState, useCallback, memo } from "react";
import { XSvg } from "../../Components/CompSvg";
import { useSelector } from "react-redux";
import styles from "../../pages/Results/results.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const RemoveSvg = memo(({ WhoActive, text }) => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  return WhoActive === text ? (
    <div className={styles.filter__icon}>
      <XSvg Theme={Theme} />
    </div>
  ) : (
    <div></div>
  );
});

const Filter = ({ ShowFilterDrop, setFilterState, FilterState }) => {
  const [WhoActive, setWhoActive] = useState("");

  // Handle Selection
  const HandleSelection = useCallback(
    (type, filter, active) => {
      if (FilterState !== undefined) {
        const key = Object.keys(FilterState)[0];
        const value = FilterState[Object.keys(FilterState)[0]];

        if (key === type && value === filter) {
          setFilterState({ defaultType: false });
        } else {
          setFilterState({ [type]: filter });
        }
      } else {
        setFilterState({ [type]: filter });
      }

      setWhoActive(() => (WhoActive === active ? "" : active));
    },
    [setFilterState, setWhoActive, WhoActive, FilterState]
  );

  //

  return (
    <div
      className={styles.filter}
      style={{
        maxHeight: ShowFilterDrop ? "450px" : "0px",
      }}
    >
      <div className={styles.filter__container}>
        <div className={styles.filter__text_wrapper}>
          <h4 className={styles.filter__text_header}>TYPE</h4>
          <div className="line"></div>

          <FItem
            onclick={() => {
              HandleSelection("type", "video", "video");
            }}
            title="Remove Video filter"
            label="Video"
            text="video"
            WhoActive={WhoActive}
          />

          <FItem
            onclick={() => {
              HandleSelection("type", "channel", "channel");
            }}
            title="Remove Channel filter"
            label="Channel"
            text="channel"
            WhoActive={WhoActive}
          />

          <FItem
            onclick={() => {
              HandleSelection("type", "playlist", "playlist");
            }}
            title="Remove Playlist filter"
            label="Playlist"
            text="playlist"
            WhoActive={WhoActive}
          />
        </div>
        <div className={styles.filter__text_wrapper}>
          <h4 className={styles.filter__text_header}>DURATION</h4>
          <div className="line"></div>

          <FItem
            onclick={() => {
              HandleSelection("videoDuration", "any", "vda-any");
            }}
            title="Remove Any filter"
            label="Any"
            text="vda-any"
            WhoActive={WhoActive}
          />

          <FItem
            onclick={() => {
              HandleSelection("videoDuration", "short", "s4");
            }}
            title="Remove Short (< 4 minutes) filter"
            label={"Short (< 4 minutes)"}
            text="s4"
            WhoActive={WhoActive}
          />

          <FItem
            onclick={() => {
              HandleSelection("videoDuration", "long", "l-20");
            }}
            title=""
            label={"Long > 20 minutes)"}
            text="l-20"
            WhoActive={WhoActive}
          />
        </div>
        <div className={styles.filter__text_wrapper}>
          <h4 className={styles.filter__text_header}>FEATURES</h4>
          <div className="line"></div>

          <FItem
            onclick={() => {
              HandleSelection("videoDefinition", "any", "vdf-any");
            }}
            title=""
            label="Any"
            text="vdf-any"
            WhoActive={WhoActive}
          />

          <FItem
            onclick={() => {
              HandleSelection("videoDefinition", "high", "high");
            }}
            title=""
            label="High"
            text="high"
            WhoActive={WhoActive}
          />

          <FItem
            onclick={() => {
              HandleSelection("videoDefinition", "standard", "standard");
            }}
            title=""
            label="Standard"
            text="standard"
            WhoActive={WhoActive}
          />

          <FItem
            onclick={() => {
              HandleSelection("videoDimension", "2d", "2d");
            }}
            title=""
            label="2D"
            text="2d"
            WhoActive={WhoActive}
          />

          <FItem
            onclick={() => {
              HandleSelection("videoDimension", "3d", "3d");
            }}
            title=""
            label="3D"
            text="3d"
            WhoActive={WhoActive}
          />
        </div>
        <div className={styles.filter__text_wrapper}>
          <h4 className={styles.filter__text_header}>SORT BY</h4>
          <div className="line"></div>

          <FItem
            onclick={() => {
              HandleSelection("order", "relevance", "relevance");
            }}
            title=""
            label="Relevance"
            text="relevance"
            WhoActive={WhoActive}
          />

          <FItem
            onclick={() => {
              HandleSelection("order", "date", "uploadDate");
            }}
            title=""
            label="Upload date"
            text="uploadDate"
            WhoActive={WhoActive}
          />

          <FItem
            onclick={() => {
              HandleSelection("order", "viewCount", "viewCount");
            }}
            title=""
            label="View count"
            text="viewCount"
            WhoActive={WhoActive}
          />

          <FItem
            onclick={() => {
              HandleSelection("order", "videoCount", "videoCount");
            }}
            title=""
            label="Video count"
            text="videoCount"
            WhoActive={WhoActive}
          />

          <FItem
            onclick={() => {
              HandleSelection("order", "rating", "rating");
            }}
            title=""
            label="Rating"
            text="rating"
            WhoActive={WhoActive}
          />
        </div>
      </div>
    </div>
  );
};

const FItem = ({ onclick, classtext, WhoActive, title, text, label }) => {
  const activeClass = (classtext) => {
    return cx("filter__text_area", {
      active: WhoActive === classtext,
    });
  };

  return (
    <div onClick={onclick} title={title} className={activeClass(text)}>
      <span>{label}</span>
      <RemoveSvg WhoActive={WhoActive} text={text} />
    </div>
  );
};

export default memo(Filter);
