import React, { memo, useCallback } from "react";
import { QueueSvg } from "../../Components/CompSvg";
import {
  AddPlayListSvg,
  TrashSvg,
  MoveDownSvg,
  MoveUpSvg,
} from "../../Components/CompSvg";
import styles from "./scss/menu.module.scss";
import { useDispatch } from "react-redux";
import {
  Wl_RemoveOneAtion,
  Lv_RemoveOneAtion,
  Wl_MoveUpAtion,
  Lv_MoveUpAtion,
  Wl_MoveDownAtion,
  Lv_MoveDownAtion,
} from "../../redux";

const DropMenu = ({ index, HandleQueueClick, wl, SearchValue }) => {
  const dispatch = useDispatch();

  // Move the item up
  const HandleMoveUp = useCallback(
    (index) => {
      if (SearchValue === "WL") {
        dispatch(Wl_MoveUpAtion(index));
      } else if (SearchValue === "LV") {
        dispatch(Lv_MoveUpAtion(index));
      }
    },
    [SearchValue, dispatch]
  );

  // Move the item down
  const HandleMoveDown = useCallback(
    (index) => {
      if (SearchValue === "WL") {
        dispatch(Wl_MoveDownAtion(index));
      } else if (SearchValue === "LV") {
        dispatch(Lv_MoveDownAtion(index));
      }
    },
    [SearchValue, dispatch]
  );

  //  Remove one item
  const HandleRemoveOne = useCallback(
    (videoId) => {
      if (SearchValue === "WL") {
        dispatch(Wl_RemoveOneAtion(videoId));
      } else if (SearchValue === "LV") {
        dispatch(Lv_RemoveOneAtion(videoId));
      }
    },
    [SearchValue, dispatch]
  );

  return (
    <div
      style={{ display: "none" }}
      className={styles.container}
      id={`wl-mn-${index}`}
    >
      <div
        onClick={() =>
          HandleQueueClick(
            wl.title,
            wl.duration,
            wl.videoId,
            wl.channelTitle,
            wl.channelId,
            wl.thumbnail
          )
        }
        className={styles.text_container}
      >
        <div className={styles.text_container__icon}>
          <QueueSvg default_color={false} />
        </div>
        <div className={styles.text_container__text}>Add to queue</div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.text_container__icon}>
          <AddPlayListSvg />
        </div>
        <div className={styles.text_container__text}>Save to playlist</div>
      </div>
      <div style={{ margin: "5px 0" }} className="line"></div>
      <div
        onClick={() => HandleRemoveOne(wl.videoId)}
        className={styles.text_container}
      >
        <div className={styles.text_container__icon}>
          <TrashSvg />
        </div>
        <div className={styles.text_container__text}>
          Remove from Watch later
        </div>
      </div>
      <div
        onClick={() => HandleMoveUp(index)}
        className={styles.text_container}
      >
        <div className={styles.text_container__icon}>
          <MoveUpSvg />
        </div>
        <div className={styles.text_container__text}>Move to top</div>
      </div>
      <div
        onClick={() => HandleMoveDown(index)}
        className={styles.text_container}
      >
        <div className={styles.text_container__icon}>
          <MoveDownSvg />
        </div>
        <div className={styles.text_container__text}>Move to bottom</div>
      </div>
    </div>
  );
};

export default memo(DropMenu);
