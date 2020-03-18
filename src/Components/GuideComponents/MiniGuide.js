import React from "react";
import { HomeIcon, TrendingIcon, SubscriptionIcon, LibraryIcon } from "./Icons";
import "./MiniGuide.scss";

const MiniGuide = React.memo(() => {
  return (
    <div className="guidewrapper">
      <div className="hx_guide">
        <div className="icon_hx_guide">
          <HomeIcon />
        </div>
        <div className="text_guide_h">Home</div>
      </div>
      <div className="hx_guide">
        <div className="icon_hx_guide">
          <TrendingIcon />
        </div>
        <div className="text_guide_h">Trending</div>
      </div>
      <div className="hx_guide">
        <div className="icon_hx_guide">
          <SubscriptionIcon />
        </div>
        <div className="text_guide_h">Subscriptions</div>
      </div>
      <div className="hx_guide">
        <div className="icon_hx_guide">
          <LibraryIcon />
        </div>
        <div className="text_guide_h">Library</div>
      </div>
    </div>
  );
});

export default MiniGuide;
