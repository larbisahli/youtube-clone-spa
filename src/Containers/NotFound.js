import React, { useContext, useEffect } from "react";
import imageError from "../Images/image-ytp-404.png";
import "./Sass/notfound_style.scss";
import { UrlLocation, ReturnTheme } from "../utils";
import { GuideContext, ThemeContext } from "../Context";

const NotFound = () => {
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;
  //
  const [, HundleShowGuide] = useContext(GuideContext);

  console.log("ReturnTheme() :>> ", ReturnTheme());
  useEffect(() => {
    if (!UrlLocation()) {
      HundleShowGuide(false);
    }
  }, []);

  return (
    <div className="notfound_container">
      <div className="notfound_container__img">
        <img src={imageError} alt="img" />
      </div>
      <div
        className={`notfound_container__text notfound_container__text--${ReturnTheme(
          Theme
        )}`}
      >
        <span>This page isn't available. Sorry about that.</span>
        <span>Try searching for something else.</span>
      </div>
    </div>
  );
};

export default NotFound;
