import React, { memo } from "react";
import style from "./sass/homeskeleton.module.scss";
import { useSelector } from "react-redux";
import { GetClassName } from "../../utils";

const HomeSkeleton = memo(() => {
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  return (
    <div className={style.container}>
      {/* Loader */}
      <div className={style.progressbar}>
        <div className={style.loader}></div>
      </div>
      {/*  */}
      <div className={GetClassName(style, "thumbnail", Theme)}></div>
      <div className={style.body}>
        <div className={GetClassName(style, "body__img", Theme)}></div>
        <div className={style.body__txt}>
          <div className={GetClassName(style, "title1", Theme)}></div>
          <div className={GetClassName(style, "title2", Theme)}></div>
        </div>
      </div>
    </div>
  );
});

export default HomeSkeleton;
