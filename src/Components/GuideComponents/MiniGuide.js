import React, { useContext } from "react";
import { HomeSvg, TrendingSvg, SubscriptionSvg, LibrarySvg } from "./Svg";
import "./miniguide_style.scss";
import { Link } from "react-router-dom";
import { ReturnTheme } from "../../config";
import { UrlLocationContext, ThemeContext } from "../../Context";

const MiniGuide = React.memo(() => {
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const [UrlLocationState] = useContext(UrlLocationContext);

  const hx_guide = `hx_guide hx_guide-${ReturnTheme(Theme)}`;

  return (
    <div className={`guidewrapper guidewrapper-${ReturnTheme(Theme)}`}>
      <Link
        to="/"
        className={`${hx_guide}${UrlLocationState === "home" ? "-active" : ""}`}
      >
        <div className="icon_hx_guide">
          <HomeSvg changeColor={UrlLocationState === "home"} />
        </div>
        <div className="text_guide_h">Home</div>
      </Link>
      <Link
        to="/trending/"
        className={`${hx_guide}${
          UrlLocationState === "trending" ? "-active" : ""
        }`}
      >
        <div className="icon_hx_guide">
          <TrendingSvg changeColor={UrlLocationState === "trending"} />
        </div>
        <div className="text_guide_h">Trending</div>
      </Link>
      <Link
        to="/subscriptions/"
        className={`${hx_guide}${
          UrlLocationState === "subscriptions" ? "-active" : ""
        }`}
      >
        <div className="icon_hx_guide">
          <SubscriptionSvg changeColor={UrlLocationState === "subscriptions"} />
        </div>
        <div className="text_guide_h">Subscriptions</div>
      </Link>
      <Link
        to="/library/"
        className={`${hx_guide}${
          UrlLocationState === "library" ? "-active" : ""
        }`}
      >
        <div className="icon_hx_guide">
          <LibrarySvg changeColor={UrlLocationState === "library"} />
        </div>
        <div className="text_guide_h">Library</div>
      </Link>
    </div>
  );
});

export default MiniGuide;
