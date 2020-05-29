import React, { memo } from "react";
import styles from "../watch.module.scss";
import { numberWithCommas } from "../../../utils";
import Moment from "react-moment";
import { Like, DisLike } from "../../Svg";
import { DotsSvg } from "../../../Components/Navbar/NavComponents/Svg";

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
  const CallWhenReady = setInterval(function () {
    const txtId = document.getElementById(`messageNumId-${index}`);

    if (txtId) {
      txtId.innerHTML = textDisplay;
      clearInterval(CallWhenReady);
    }
  }, 200);

  return (
    <div className={styles.comments__contents}>
      <div className={styles.comment_container__thumbnail}>
        <div className={styles.author_thumb}>
          <img
            className={styles.author_thumb__img}
            width="40"
            height="40"
            src={thumbnail}
            alt=""
          />
        </div>
      </div>
      <div className={styles.comment_container__main}>
        <div className={styles.comain_header}>
          <div className={styles.comain_header__author_header}>
            <div className={styles.author_title}>{authorName}</div>
            <div className={styles.published_time_text}>
              {" "}
              <Moment fromNow>{publishedAt}</Moment>
            </div>
          </div>
        </div>
        <div className={styles.comain_body}>
          <div className={styles.comain_body__wrapper}>
            <span id={`messageNumId-${index}`}></span>
          </div>
          <div className={styles.comain_body__iconarea}>
            <div className={styles.iconarea_con}>
              <div className={styles.iconarea_con__x}>
                <Like />
              </div>
              <div className={styles.iconarea_con__x}>
                {numberWithCommas(likeCount)}
              </div>
              <div className={styles.iconarea_con__x}>
                <DisLike />
              </div>

              <div className={styles.iconarea_con__x}>Reply</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.comment_container__menu}>
        <DotsSvg />
      </div>
    </div>
  );
};

export default memo(CommentsContents);
