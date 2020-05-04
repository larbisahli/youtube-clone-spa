import React, { useState, useCallback, useContext } from "react";
import { XSvg } from "../../Containers/Svg";
import { ReturnTheme } from "../../utils";
import { ThemeContext } from "../../Context";

const RemoveSvg = React.memo(({ WhoActive, text }) => {
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  return WhoActive === text ? (
    <div className="filter__x_icon">
      <XSvg Theme={Theme} />
    </div>
  ) : (
    <div></div>
  );
});

const activeClass = (WhoActive, classtext, Theme) => {
  return (
    `filter__text_area filter__text_area--${ReturnTheme(Theme)}` +
    (WhoActive === classtext ? ` active--${ReturnTheme(Theme)}` : "")
  );
};

const Filter = React.memo(({ ShowFilterDrop, setFilterState, FilterState }) => {
  // Active btn State
  const [WhoActive, setWhoActive] = useState("");

  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

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

  const filterTxTHeader = `filter__text_header filter__text_header--${ReturnTheme(
    Theme
  )}`;

  const filterLine = `line line--${ReturnTheme(Theme)}`;

  return (
    <div
      className="filter"
      style={{
        maxHeight: ShowFilterDrop ? "450px" : "0px",
      }}
    >
      <div className="filter__container">
        <div className="filter__text_wrapper">
          <h4 className={filterTxTHeader}>TYPE</h4>
          <div className={filterLine}></div>
          <div
            onClick={() => {
              HandleSelection("type", "video", "video");
            }}
            title="Remove Video filter"
            className={activeClass(WhoActive, "video", Theme)}
          >
            <span>Video</span>
            <RemoveSvg WhoActive={WhoActive} text="video" />
          </div>

          <div
            onClick={() => {
              HandleSelection("type", "channel", "channel");
            }}
            title="Remove Channel filter"
            className={activeClass(WhoActive, "channel", Theme)}
          >
            <span>Channel</span>
            <RemoveSvg WhoActive={WhoActive} text="channel" />
          </div>
          <div
            onClick={() => {
              HandleSelection("type", "playlist", "playlist");
            }}
            title="Remove Playlist filter"
            className={activeClass(WhoActive, "playlist", Theme)}
          >
            <span>Playlist</span>
            <RemoveSvg WhoActive={WhoActive} text="playlist" />
          </div>
        </div>
        <div className="filter__text_wrapper">
          <h4 className={filterTxTHeader}>DURATION</h4>
          <div className={filterLine}></div>
          <div
            onClick={() => {
              HandleSelection("videoDuration", "any", "vda-any");
            }}
            title="Remove Any filter"
            className={activeClass(WhoActive, "vda-any", Theme)}
          >
            <span>Any</span>
            <RemoveSvg WhoActive={WhoActive} text="vda-any" />
          </div>
          <div
            onClick={() => {
              HandleSelection("videoDuration", "short", "s4");
            }}
            title="Remove Short (< 4 minutes) filter"
            className={activeClass(WhoActive, "s4", Theme)}
          >
            <span>{"Short (< 4 minutes)"}</span>
            <RemoveSvg WhoActive={WhoActive} text="s4" />
          </div>
          <div
            onClick={() => {
              HandleSelection("videoDuration", "long", "l-20");
            }}
            className={activeClass(WhoActive, "l-20", Theme)}
          >
            <span>{"Long (> 20 minutes)"}</span>
            <RemoveSvg WhoActive={WhoActive} text="l-20" />
          </div>
        </div>
        <div className="filter__text_wrapper">
          <h4 className={filterTxTHeader}>FEATURES</h4>
          <div className={filterLine}></div>
          <div
            onClick={() => {
              HandleSelection("videoDefinition", "any", "vdf-any");
            }}
            className={activeClass(WhoActive, "vdf-any", Theme)}
          >
            Any
            <span>Any</span>
            <RemoveSvg WhoActive={WhoActive} text="vdf-any" />
          </div>
          <div
            onClick={() => {
              HandleSelection("videoDefinition", "high", "high");
            }}
            className={activeClass(WhoActive, "high", Theme)}
          >
            <span>High</span>
            <RemoveSvg WhoActive={WhoActive} text="high" />
          </div>
          <div
            onClick={() => {
              HandleSelection("videoDefinition", "standard", "standard");
            }}
            className={activeClass(WhoActive, "standard", Theme)}
          >
            <span>Standard</span>
            <RemoveSvg WhoActive={WhoActive} text="standard" />
          </div>
          <div
            onClick={() => {
              HandleSelection("videoDimension", "2d", "2d");
            }}
            className={activeClass(WhoActive, "2d", Theme)}
          >
            <span>2D</span>
            <RemoveSvg WhoActive={WhoActive} text="2d" />
          </div>
          <div
            onClick={() => {
              HandleSelection("videoDimension", "3d", "3d");
            }}
            className={activeClass(WhoActive, "3d", Theme)}
          >
            <span>3D</span>
            <RemoveSvg WhoActive={WhoActive} text="3d" />
          </div>
        </div>
        <div className="filter__text_wrapper">
          <h4 className={filterTxTHeader}>SORT BY</h4>
          <div className={filterLine}></div>
          <div
            onClick={() => {
              HandleSelection("order", "relevance", "relevance");
            }}
            className={activeClass(WhoActive, "relevance", Theme)}
          >
            <span>Relevance</span>
            <RemoveSvg WhoActive={WhoActive} text="relevance" />
          </div>
          <div
            onClick={() => {
              HandleSelection("order", "date", "uploadDate");
            }}
            className={activeClass(WhoActive, "uploadDate", Theme)}
          >
            <span>Upload date</span>
            <RemoveSvg WhoActive={WhoActive} text="uploadDate" />
          </div>
          <div
            onClick={() => {
              HandleSelection("order", "viewCount", "viewCount");
            }}
            className={activeClass(WhoActive, "viewCount", Theme)}
          >
            <span>View count</span>
            <RemoveSvg WhoActive={WhoActive} text="viewCount" />
          </div>
          <div
            onClick={() => {
              HandleSelection("order", "videoCount", "videoCount");
            }}
            className={activeClass(WhoActive, "videoCount", Theme)}
          >
            <span>Video count</span>
            <RemoveSvg WhoActive={WhoActive} text="videoCount" />
          </div>
          <div
            onClick={() => {
              HandleSelection("order", "rating", "rating");
            }}
            className={activeClass(WhoActive, "rating", Theme)}
          >
            <span>Rating</span>
            <RemoveSvg WhoActive={WhoActive} text="rating" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Filter;
