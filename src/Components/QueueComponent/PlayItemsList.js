import React, { memo } from "react";
import styles from "./scss/playitemslist.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  HandleDuration,
  TextReducer,
  ReturnTheme,
  GetClassName,
} from "../../utils";

import classNames from "classnames/bind";
import { DRSvg, TrashSvg } from "../../Containers/Svg";
import { PlayQueueAction } from "../../redux";

let cx = classNames.bind(styles);

export const PlayItemsList = memo(
  ({ plv, CurrentPlayingVidIndex, HandleDelClick, isQueue }) => {
    // Theme
    const Theme = useSelector((state) => state.Theme.isDarkTheme);

    // dispatch
    const dispatch = useDispatch();

    const Action = isQueue ? PlayQueueAction(plv.videoId) : () => {};

    return (
      <div
        onClick={() => dispatch(Action)}
        className={cx("block", {
          [`block--${ReturnTheme(Theme)}`]: true,
          [`isplaying--${ReturnTheme(Theme)}`]:
            CurrentPlayingVidIndex() === plv.index,
        })}
      >
        <div className={styles.playbtn}>
          {plv.playing ? (
            <div className={styles.playbtn__playing}>▶</div>
          ) : (
            <div className={styles.playbtn__drag}>
              <DRSvg />
            </div>
          )}
        </div>
        <div className={styles.itemwrap}>
          <div className={styles.thumbnail}>
            <div>
              <img
                width="100"
                className={styles.thumbnail__img}
                src={plv.thumbnail}
                alt=""
              />
            </div>
            <div className={styles.thumbnail__duration}>
              {HandleDuration(plv.duration)}
            </div>
          </div>
          <div className={styles.body_container}>
            <div className={styles.text_area}>
              <div className={styles.text_area__title}>
                {TextReducer(plv.title, 40)}
              </div>
              <div
                className={GetClassName(styles, "text_area__chtitle", Theme)}
              >
                {plv.channelTitle}
              </div>
            </div>
            <div className={styles.btncon}>
              <div
                onClick={() => HandleDelClick(plv.videoId, plv.index)}
                className={cx("btncon__del", {
                  [`btncon__del--${ReturnTheme(Theme)}`]: true,
                  [`btncon__hide`]: CurrentPlayingVidIndex() === plv.index,
                })}
              >
                <TrashSvg />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
