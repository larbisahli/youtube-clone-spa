import React from "react";
import styles from "../Guide/scss/guide.module.scss";

const GuideSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}></div>
    </div>
  );
};

export default GuideSkeleton;
