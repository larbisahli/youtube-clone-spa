import React from "react";
import styles from "../../Containers/NavBar/navbar.module.scss";

const NavSkeleton = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.left_container}>
        <div className={styles.skeleton}></div>
        <div className={styles.logo_container}>
          <div className={`${styles.skeleton__logo} ${styles.skeleton}`}></div>
        </div>
      </div>
      <div className={styles.right_container}>
        <div className={styles.icons_container}>
          <div className={styles.skeleton}></div>
        </div>
        <div className={styles.icons_container}>
          <div className={styles.skeleton}></div>
        </div>
        <div className={styles.icons_container}>
          <div className={styles.skeleton}></div>
        </div>
        <div className={styles.profile_container}>
          <div className={styles.skeleton}></div>
        </div>
      </div>
    </nav>
  );
};

export default NavSkeleton;
