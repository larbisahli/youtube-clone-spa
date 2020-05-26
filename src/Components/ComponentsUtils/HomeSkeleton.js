import React, { memo } from "react";
import styles from "./sass/homeskeleton.module.scss";
import { useSelector } from "react-redux";
import { GetClassName } from "../../utils";

const HomeSkeleton = () => {
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  return (
    <div className={styles.container}>
      {/* Loader */}
      <div className={styles.progressbar}>
        <div className={styles.loader}></div>
      </div>
      {/*  */}
      <div className={GetClassName(styles, "thumbnail", Theme)}></div>
      <div className={styles.body}>
        <div className={GetClassName(styles, "body__img", Theme)}></div>
        <div className={styles.body__txt}>
          <div className={GetClassName(styles, "title1", Theme)}></div>
          <div className={GetClassName(styles, "title2", Theme)}></div>
        </div>
      </div>
    </div>
  );
};

export default memo(HomeSkeleton);
