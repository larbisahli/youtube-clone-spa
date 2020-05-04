import React, { useContext } from "react";
import { HomeSvg, TrendingSvg, SubscriptionSvg, LibrarySvg } from "./Svg";
import "./sass/miniguide_style.scss";
import { Link } from "react-router-dom";
import { ReturnTheme } from "../../utils";
import { UrlLocationContext, ThemeContext } from "../../Context";

const MiniGuide = React.memo(() => {
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const [UrlLocationState] = useContext(UrlLocationContext);

  const hx_guide = `miniguide__btn_wrapper miniguide__btn_wrapper--${ReturnTheme(
    Theme
  )}`;

  const ReturnDisplay = () => {
    if (UrlLocationState) {
      console.log("UrlLocationState :>> ", UrlLocationState);
      return UrlLocationState === "watch" ? "none" : "block";
    } else {
      return "none";
    }
  };
  console.log(' UrlLocationState === "watch" :>> ', ReturnDisplay());
  return (
    <div
      style={{ display: ReturnDisplay() }}
      className={`miniguide miniguide--${ReturnTheme(Theme)}`}
    >
      <Link
        to="/"
        className={`${hx_guide}${
          UrlLocationState === "home" ? "--active" : ""
        }`}
      >
        <div className="miniguide__icon_wrap">
          <HomeSvg changeColor={UrlLocationState === "home"} />
        </div>
        <div className="miniguide__text_wrap">Home</div>
      </Link>
      <Link
        to="/trending/"
        className={`${hx_guide}${
          UrlLocationState === "trending" ? "--active" : ""
        }`}
      >
        <div className="miniguide__icon_wrap">
          <TrendingSvg changeColor={UrlLocationState === "trending"} />
        </div>
        <div className="miniguide__text_wrap">Trending</div>
      </Link>
      <Link
        to="/subscriptions/"
        className={`${hx_guide}${
          UrlLocationState === "subscriptions" ? "--active" : ""
        }`}
      >
        <div className="miniguide__icon_wrap">
          <SubscriptionSvg changeColor={UrlLocationState === "subscriptions"} />
        </div>
        <div className="miniguide__text_wrap">Subscriptions</div>
      </Link>
      <Link
        to="/library/"
        className={`${hx_guide}${
          UrlLocationState === "library" ? "--active" : ""
        }`}
      >
        <div className="miniguide__icon_wrap">
          <LibrarySvg changeColor={UrlLocationState === "library"} />
        </div>
        <div className="miniguide__text_wrap">Library</div>
      </Link>
    </div>
  );
});

export default MiniGuide;
