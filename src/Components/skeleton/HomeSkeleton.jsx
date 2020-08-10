import React from "react";
import styles from "../../pages/Home/home.module.scss";
import VidAspectSkeleton from "./VidAspectSkeleton";

const HomeSkeleton = () => {
  return (
    <div id="page-manager" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title_wrapper}>
          <span className={styles.title}>Most Popular</span>
        </div>
        <div className={styles.video_wrapper}>
          {[...Array(8)].map((e, i) => {
            return <VidAspectSkeleton key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
