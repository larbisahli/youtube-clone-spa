import React, { memo } from "react";
import styles from "./scss/profileimg.module.scss";
import { useSelector } from "react-redux";
import { GetClassName } from "../../utils";

const ProfileImg = ({
  classname = "",
  width,
  height,
  src,
  id = "",
  alt = "",
}) => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  return (
    <div className={styles.thumbnail}>
      <div
        className={`${GetClassName(
          styles,
          "thumbnail__wrapper",
          Theme
        )} ${classname}`}
      >
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
