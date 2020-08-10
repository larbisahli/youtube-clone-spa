import React, { memo } from "react";
import styles from "./scss/profileimg.module.scss";

const ProfileImg = ({
  classname = "",
  width,
  height,
  src,
  id = "",
  alt = "",
}) => {
  return (
    <div className={styles.thumbnail}>
      <div className={`${styles.thumbnail__wrapper} ${classname}`}>
        <img
          id={id}
          width={width}
          height={height}
          className={styles.img}
          src={src}
          alt={alt}
        />
      </div>
    </div>
  );
};

export default memo(ProfileImg);
