import React from "react";
import { YouTubeAPI } from "../Components/api/YoutubeApi";
import "./SCSS/Results.scss";
import { FilterIcon } from "./ICON";

const Results = React.memo(() => {
  return (
    <div className="results_container">
      <div id="hvc" className="results_video_container">
        <div className="r_contentwrap">
          <div className="r_filter_container">
            <div className="r_filter_wrapper">
              <div className="filter_icon">
                <FilterIcon />
              </div>
              <span className="r_filter_text">filter</span>
            </div>
          </div>
          <div className="r_line"></div>
          <div className="results_section_list_renderer">{}</div>
        </div>
      </div>
    </div>
  );
});

export default Results;
