import React, { memo } from "react";
import styles from "../watch.module.scss";
import { numberWithCommas, GetClassName } from "../../../utils";
import Moment from "react-moment";
import { Like, DisLike } from "../../Svg";
import { ProfileImg } from "../../../Components/ComponentsUtils";
import { DotsSvg } from "../../../Components/Navbar/NavComponents/Svg";
import { useSelector } from "react-redux";

//

const CommentsContents = ({
  index,
  thumbnail,
  publishedAt,
  likeCount,
  textDisplay,
  authorName,
  authorchaId,
}) => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  const CallWhenReady = setInterval(function () {
    const txtId = document.getElementById(`messageNumId-${index}`);

    if (txtId) {
      txtId.innerHTML = textDisplay;
      clearInterval(CallWhenReady);
    }
  }, 200);

  return (
    <div className={styles.comments__contents}>
      <ProfileImg
        width={"40"}
        height={"40"}
        src={thumbnail}
        id={""}
        alt={""}
        classname={styles.com_prothumb}
      />

      <div className={styles.comment_container__main}>
        <div className={styles.comain_header}>
          <div className={styles.comain_header__author_header}>
            <div className={GetClassName(styles, "author_title", Theme)}>
              {authorName}
            </div>
            <div className={GetClassName(styles, "published_time_text", Theme)}>
              {" "}
              <Moment fromNow>{publishedAt}</Moment>
            </div>
          </div>
        </div>
        <div className={GetClassName(styles, "comain_body", Theme)}>
          <div className={styles.comain_body__wrapper}>
            <span
              className={GetClassName(styles, "spantxt", Theme)}
              id={`messageNumId-${index}`}
            ></span>
          </div>
          <div className={styles.comain_body__iconarea}>
            <div className={styles.iconarea_con}>
              <div className={GetClassName(styles, "iconarea_con__x", Theme)}>
                <Like />
              </div>
              <div className={GetClassName(styles, "iconarea_con__x", Theme)}>
                {numberWithCommas(likeCount)}
              </div>
              <div className={GetClassName(styles, "iconarea_con__x", Theme)}>
                <DisLike />
              </div>

              <div className={GetClassName(styles, "iconarea_con__x", Theme)}>
                Reply
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={GetClassName(styles, "comment_container__menu", Theme)}>
        <DotsSvg />
      </div>
    </div>
  );
};

export default memo(CommentsContents);
