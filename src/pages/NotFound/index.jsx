import React from "react";
import imageError from "../../assets/images/image-ytp-404.png";
import styles from "./notfound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src={imageError} alt="img" />
      </div>
      <div className={styles.text}>
        <span>This page isn't available. Sorry about that.</span>
        <span>Try searching for something else.</span>
      </div>
    </div>
  );
};

export default NotFound;
