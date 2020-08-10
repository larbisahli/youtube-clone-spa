import React, { memo } from "react";
import ReactDOM from "react-dom";
import { HomeSvg, TrendingSvg, SubscriptionSvg, LibrarySvg } from "../CompSvg";
import styles from "./scss/miniguide.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const ItemLink = ({ to, label, UrlLocation, children, is_in }) => {
  const btn_wrapper = (value) => {
    return cx("btn_wrapper", { "btn_wrapper--active": UrlLocation === value });
  };
  return (
    <Link to={to} className={btn_wrapper(is_in)}>
      <div className={styles.icon_wrap}>{children}</div>
      <div className={styles.text_wrap}>{label}</div>
    </Link>
  );
};

const MiniGuide = () => {
  const UrlLocation = useSelector((state) => state.Guide.urlLocation);
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  //  check is the current page
  const CheckUrlLocation = (value) => {
    return UrlLocation === value;
  };

  const ReturnDisplay = () => {
    if (UrlLocation) {
      return CheckUrlLocation("watch") ? "none" : "block";
    } else {
      return "none";
    }
  };

  return ReactDOM.createPortal(
    <div style={{ display: ReturnDisplay() }} className={styles.container}>
      <ItemLink to={"/"} is_in="home" label="Home" UrlLocation={UrlLocation}>
        <HomeSvg changeColor={CheckUrlLocation("home")} Theme={Theme} />
      </ItemLink>

      <ItemLink
        to={"/trending/"}
        is_in="trending"
        label="Trending"
        UrlLocation={UrlLocation}
      >
        <TrendingSvg changeColor={CheckUrlLocation("trending")} Theme={Theme} />
      </ItemLink>

      <ItemLink
        to={"/subscriptions/"}
        label="Subscriptions"
        UrlLocation={UrlLocation}
        is_in="subscriptions"
      >
        <SubscriptionSvg
          changeColor={CheckUrlLocation("subscriptions")}
          Theme={Theme}
        />
      </ItemLink>

      <ItemLink
        to={"/library/"}
        is_in="library"
        label="Library"
        UrlLocation={UrlLocation}
      >
        <LibrarySvg changeColor={CheckUrlLocation("library")} Theme={Theme} />
      </ItemLink>
    </div>,
    document.getElementById("mini-guide")
  );
};

export default memo(MiniGuide);
