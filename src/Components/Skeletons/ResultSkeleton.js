import React from "react";
import "./ResultSkeleton.scss";

const ResultSkeleton = React.memo(() => {
  return (
    <div className="video_skeleton">
      <div className="skeleton_thumb"></div>
      <div className="skeleton_bottom">
        <div className="s_pro"></div>
        <div className="tt">
          <div className="s_title"></div>
          <div className="s_title_x"></div>
        </div>
      </div>
    </div>
  );
});

export default ResultSkeleton;
