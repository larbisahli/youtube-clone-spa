import React, { useState } from "react";
import { XIcon } from "../../Containers/ICON";

// {
//   /* <div className="fcc_text_container">
//           <h4 className="fcc_header_text">UPLOAD DATE</h4>
//           <div className="fcc_line"></div>
//           <div className="fcc_text">Last hour</div>
//           <div className="fcc_text">Today</div>
//           <div className="fcc_text">This week</div>
//         </div> */
// }

const Filter = React.memo(({ ShowFilterDrop, setFilterState }) => {
  const [WhoActive, setWhoActive] = useState("");

  return (
    <div
      className="filter_content_container"
      style={{
        maxHeight: ShowFilterDrop ? "458px" : "0px"
      }}
    >
      <div className="fcc_wrapper">
        <div className="fcc_text_container">
          <h4 className="fcc_header_text">TYPE</h4>
          <div className="fcc_line"></div>
          <div
            onClick={() => {
              setFilterState({ type: "video" });
              setWhoActive(() => (WhoActive === "video" ? "" : "video"));
            }}
            title="Remove Video filter"
            className={`fcc_text ${
              WhoActive === "video" ? "fcc_text-active" : ""
            }`}
          >
            <span>Video</span>
            {WhoActive === "video" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>

          <div
            onClick={() => {
              setFilterState({ type: "channel" });
              setWhoActive(() => (WhoActive === "channel" ? "" : "channel"));
            }}
            title="Remove Channel filter"
            className={`fcc_text ${
              WhoActive === "channel" ? "fcc_text-active" : ""
            }`}
          >
            <span>Channel</span>
            {WhoActive === "channel" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => {
              setFilterState({ type: "playlist" });
              setWhoActive(() => (WhoActive === "playlist" ? "" : "playlist"));
            }}
            title="Remove Playlist filter"
            className={`fcc_text ${
              WhoActive === "playlist" ? "fcc_text-active" : ""
            }`}
          >
            <span>Playlist</span>
            {WhoActive === "playlist" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="fcc_text_container">
          <h4 className="fcc_header_text">DURATION</h4>
          <div className="fcc_line"></div>
          <div
            onClick={() => {
              setFilterState({ videoDuration: "any" });
              setWhoActive(() => (WhoActive === "vda-any" ? "" : "vda-any"));
            }}
            title="Remove Any filter"
            className={`fcc_text ${
              WhoActive === "vda-any" ? "fcc_text-active" : ""
            }`}
          >
            <span>Any</span>
            {WhoActive === "vda-any" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => {
              setFilterState({ videoDuration: "short" });
              setWhoActive(() => (WhoActive === "s4" ? "" : "s4"));
            }}
            title="Remove Short (< 4 minutes) filter"
            className={`fcc_text ${
              WhoActive === "s4" ? "fcc_text-active" : ""
            }`}
          >
            <span>{"Short (< 4 minutes)"}</span>
            {WhoActive === "s4" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => {
              setFilterState({ videoDuration: "long" });
              setWhoActive(() => (WhoActive === "l-20" ? "" : "l-20"));
            }}
            className={`fcc_text ${
              WhoActive === "l-20" ? "fcc_text-active" : ""
            }`}
          >
            <span>{"Long (> 20 minutes)"}</span>
            {WhoActive === "l-20" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="fcc_text_container">
          <h4 className="fcc_header_text">FEATURES</h4>
          <div className="fcc_line"></div>
          <div
            onClick={() => {
              setFilterState({
                videoDefinition: "any"
              });
              setWhoActive(() => (WhoActive === "vdf-any" ? "" : "vdf-any"));
            }}
            className={`fcc_text ${
              WhoActive === "vdf-any" ? "fcc_text-active" : ""
            }`}
          >
            Any
            <span>Any</span>
            {WhoActive === "vdf-any" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => {
              setFilterState({
                videoDefinition: "high"
              });
              setWhoActive(() => (WhoActive === "hight" ? "" : "hight"));
            }}
            className={`fcc_text ${
              WhoActive === "hight" ? "fcc_text-active" : ""
            }`}
          >
            <span>High</span>
            {WhoActive === "hight" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => {
              setFilterState({
                videoDefinition: "standard "
              });
              setWhoActive(() => (WhoActive === "standard" ? "" : "standard"));
            }}
            className={`fcc_text ${
              WhoActive === "standard" ? "fcc_text-active" : ""
            }`}
          >
            <span>Standard</span>
            {WhoActive === "standard" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => {
              setFilterState({ videoDimension: "2d" });
              setWhoActive(() => (WhoActive === "2d" ? "" : "2d"));
            }}
            className={`fcc_text ${
              WhoActive === "2d" ? "fcc_text-active" : ""
            }`}
          >
            <span>2D</span>
            {WhoActive === "2d" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => {
              setFilterState({ videoDimension: "3d" });
              setWhoActive(() => (WhoActive === "3d" ? "" : "3d"));
            }}
            className={`fcc_text ${
              WhoActive === "3d" ? "fcc_text-active" : ""
            }`}
          >
            <span>3D</span>
            {WhoActive === "3d" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="fcc_text_container">
          <h4 className="fcc_header_text">SORT BY</h4>
          <div className="fcc_line"></div>
          <div
            onClick={() => {
              setFilterState({ order: "relevance" });
              setWhoActive(() =>
                WhoActive === "relevance" ? "" : "relevance"
              );
            }}
            className={`fcc_text ${
              WhoActive === "relevance" ? "fcc_text-active" : ""
            }`}
          >
            <span>Relevance</span>
            {WhoActive === "relevance" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => {
              setFilterState({ order: "date" });
              setWhoActive(() =>
                WhoActive === "uploadDate" ? "" : "uploadDate"
              );
            }}
            className={`fcc_text ${
              WhoActive === "uploadDate" ? "fcc_text-active" : ""
            }`}
          >
            <span>Upload date</span>
            {WhoActive === "uploadDate" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => {
              setFilterState({ order: "viewCount" });
              setWhoActive(() =>
                WhoActive === "viewCount" ? "" : "viewCount"
              );
            }}
            className={`fcc_text ${
              WhoActive === "viewCount" ? "fcc_text-active" : ""
            }`}
          >
            <span>View count</span>
            {WhoActive === "viewCount" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => {
              setFilterState({
                order: "videoCount"
              });
              setWhoActive(() =>
                WhoActive === "videoCount" ? "" : "videoCount"
              );
            }}
            className={`fcc_text ${
              WhoActive === "videoCount" ? "fcc_text-active" : ""
            }`}
          >
            <span>Video count</span>
            {WhoActive === "videoCount" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => {
              setFilterState({ order: "rating" });
              setWhoActive(() => (WhoActive === "rating" ? "" : "rating"));
            }}
            className={`fcc_text ${
              WhoActive === "rating" ? "fcc_text-active" : ""
            }`}
          >
            Rating
            <span>Rating</span>
            {WhoActive === "rating" ? (
              <div className="x_icon">
                <XIcon />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Filter;
