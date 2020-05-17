import React, { memo } from "react";
import { HomeSvg, TrendingSvg, SubscriptionSvg, LibrarySvg } from "./Svg";
import style from "./sass/miniguide.module.scss";
import { Link } from "react-router-dom";
import { ReturnTheme, GetClassName } from "../../utils";
import { useSelector } from "react-redux";

const MiniGuide = memo(() => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  // urlLocation
  const UrlLocation = useSelector((state) => state.Guide.urlLocation);

  //  check is the current page
  const CheckUrlLocation = (value) => {
    return UrlLocation === value;
  };

  const btn_wrapper = (value) => {
    return `${style.btn_wrapper} ${
      style[
        `btn_wrapper--${ReturnTheme(Theme)}${
          UrlLocation === value ? "--active" : ""
        }`
      ]
    }`;
  };

  const ReturnDisplay = () => {
    if (UrlLocation) {
      return CheckUrlLocation("watch") ? "none" : "block";
    } else {
      return "none";
    }
  };

  return (
    <div
      style={{ display: ReturnDisplay() }}
      className={GetClassName(style, "container", Theme)}
    >
      <Link to="/" className={btn_wrapper("home")}>
        <div className={style.icon_wrap}>
          <HomeSvg changeColor={CheckUrlLocation("home")} />
        </div>
        <div className={style.text_wrap}>Home</div>
      </Link>
      <Link to="/trending/" className={btn_wrapper("trending")}>
        <div className={style.icon_wrap}>
          <TrendingSvg changeColor={CheckUrlLocation("trending")} />
        </div>
        <div className={style.text_wrap}>Trending</div>
      </Link>
      <Link to="/subscriptions/" className={btn_wrapper("subscriptions")}>
        <div className={style.icon_wrap}>
          <SubscriptionSvg changeColor={CheckUrlLocation("subscriptions")} />
        </div>
        <div className={style.text_wrap}>Subscriptions</div>
      </Link>
      <Link to="/library/" className={btn_wrapper("library")}>
        <div className={style.icon_wrap}>
          <LibrarySvg changeColor={CheckUrlLocation("library")} />
        </div>
        <div className={style.text_wrap}>Library</div>
      </Link>
    </div>
  );
});

export default MiniGuide;
