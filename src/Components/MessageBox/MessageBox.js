import React, { useCallback, memo } from "react";
import styles from "./messagebox.module.scss";
import { RippleButton } from "../ComponentsUtils";
import { useSelector, useDispatch } from "react-redux";
import {
  SetMessageAction,
  CloseMessageAction,
  Wl_RemoveOneAtion,
} from "../../redux";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const MessageBox = () => {
  // Message Box
  const MessageBox = useSelector((state) => state.MessageBox);

  // dispatch
  const dispatch = useDispatch();

  // HandleBtn
  const HandleBtn = useCallback(() => {
    if (MessageBox.from === "wl") {
      // -----
      // from ?
      dispatch(Wl_RemoveOneAtion(MessageBox.id));

      // -----

      dispatch(
        SetMessageAction({
          message: "Removed from Watch later",
          btnText: "✔",
          from: "",
          id: "",
        })
      );
    } else if (MessageBox.from === "error") {
      dispatch(CloseMessageAction());
    }
  }, [MessageBox, dispatch]);

  return (
    <div
      className={cx("container", {
        [`container--show`]: MessageBox.show,
        [`container--hide`]: !MessageBox.show,
      })}
    >
      <div className={styles.wrapper}>
        <span className={styles.textcon}>{MessageBox.message}</span>
        {MessageBox.btnText && (
          <RippleButton
            onclick={MessageBox.btnText !== "✔" ? HandleBtn : () => {}}
            classname={styles.btn}
          >
            <span>{MessageBox.btnText}</span>
          </RippleButton>
        )}
      </div>
    </div>
  );
};

export default memo(MessageBox);
