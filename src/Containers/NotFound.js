import React from "react";
import imageError from "../Images/image-ytp-404.png";
import styles from "./Sass/notfound.module.scss";
import { GetClassName } from "../utils";
import { useSelector } from "react-redux";

const NotFound = () => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src={imageError} alt="img" />
      </div>
      <div className={GetClassName(styles, "text", Theme)}>
        <span>This page isn't available. Sorry about that.</span>
        <span>Try searching for something else.</span>
      </div>
    </div>
  );
};

export default NotFound;
