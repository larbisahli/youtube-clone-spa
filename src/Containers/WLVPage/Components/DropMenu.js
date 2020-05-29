import React, { memo, useCallback } from "react";
import { QueueSvg } from "../../ResultsPage/Components/Svg";
import { AddPlayListSvg, TrashSvg, MoveDownSvg, MoveUpSvg } from "../../Svg";
import { ReturnTheme, GetClassName } from "../../../utils";
import styles from "./scss/menu.module.scss";
import { useDispatch } from "react-redux";
import {
  Wl_RemoveOneAtion,
  Lv_RemoveOneAtion,
  Wl_MoveUpAtion,
  Lv_MoveUpAtion,
  Wl_MoveDownAtion,
  Lv_MoveDownAtion,
} from "../../../redux";

const DropMenu = ({ index, Theme, HandleQueueClick, wl, SearchValue }) => {
  // dispatch
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

  // ===================
  //  Remove one item
  // ===================
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

  const txt_area = GetClassName(styles, "drop_text_con__text", Theme);
  const drop_text_con = GetClassName(styles, "drop_text_con", Theme);

  return (
    <div
      style={{ display: "none" }}
      className={GetClassName(styles, "menu_drop", Theme)}
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
        className={drop_text_con}
      >
        <div className={styles.drop_text_con__icon}>
          <QueueSvg default_color={false} />
        </div>
        <div className={txt_area}>Add to queue</div>
      </div>
      <div className={drop_text_con}>
        <div className={styles.drop_text_con__icon}>
          <AddPlayListSvg />
        </div>
        <div className={txt_area}>Save to playlist</div>
      </div>
      <div
        style={{ margin: "5px 0" }}
        className={`line line--${ReturnTheme(Theme)}`}
      ></div>
      <div
        onClick={() => HandleRemoveOne(wl.videoId)}
        className={drop_text_con}
      >
        <div className={styles.drop_text_con__icon}>
          <TrashSvg />
        </div>
        <div className={txt_area}>Remove from Watch later</div>
      </div>
      <div onClick={() => HandleMoveUp(index)} className={drop_text_con}>
        <div className={styles.drop_text_con__icon}>
          <MoveUpSvg />
        </div>
        <div className={txt_area}>Move to top</div>
      </div>
      <div onClick={() => HandleMoveDown(index)} className={drop_text_con}>
        <div className={styles.drop_text_con__icon}>
          <MoveDownSvg />
        </div>
        <div className={txt_area}>Move to bottom</div>
      </div>
    </div>
  );
};

export default memo(DropMenu);
