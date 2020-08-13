import React from "react";
import styles from "./scss/vidskeleton.module.scss";

const VidAspectSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.progressbar}>
        <div className={styles.loader}></div>
      </div>
      <div className={styles.thumbnail}></div>
      <div className={styles.body}>
        <div className={styles.body__img}></div>
        <div className={styles.body__txt}>
          <div className={styles.title1}></div>
          <div className={styles.title2}></div>
        </div>
      </div>
    </div>
  );
};

export default VidAspectSkeleton;
