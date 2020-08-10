import React, { memo } from "react";
import styles from "./scss/guide.module.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { HideGuideAction } from "../../redux";

let cx = classNames.bind(styles);

const ItemLink = ({ to, label, is_in, children, onclick = false }) => {
  const showGuide = useSelector((state) => state.Guide.showGuide);
  const guideMode = useSelector((state) => state.Guide.guideMode);
  const UrlLocation = useSelector((state) => state.Guide.urlLocation);
  const dispatch = useDispatch();

  const content_wrapper = (value = "") => {
    return cx("content_wrapper", {
      "content_wrapper--active": UrlLocation === value,
    });
  };
  const HideGuideOnClick = () => {
    if (guideMode === 2 && showGuide) {
      dispatch(HideGuideAction());
    }
  };

  return (
    <Link
      to={to}
      title={label}
      onClick={onclick ? onclick : HideGuideOnClick}
      className={content_wrapper(is_in)}
    >
      <div className={styles.content_icon}>{children}</div>
      <div className={styles.text_container}>
        <div className={styles.text_wrap}>{label}</div>
      </div>
    </Link>
  );
};

export default memo(ItemLink);
