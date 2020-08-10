import React, { useCallback, memo } from "react";
import ReactDOM from "react-dom";
import styles from "./messagebox.module.scss";
import { RippleButton } from "../CompUtils";
import { useSelector, useDispatch } from "react-redux";
import {
  SetMessageAction,
  CloseMessageAction,
  Wl_RemoveOneAtion,
} from "../../redux";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const MessageBox = () => {
  const MessageBox = useSelector((state) => state.MessageBox);
  const dispatch = useDispatch();

  const HandleBtn = useCallback(() => {
    if (MessageBox.from === "wl") {
      // from ?
      dispatch(Wl_RemoveOneAtion(MessageBox.id));

      dispatch(
        SetMessageAction({
          message: "Removed from Watch later",
          btnText: "✔",
          from: "",
          id: "",
        })
      );
      setTimeout(() => {
        dispatch(CloseMessageAction());
      }, 4000);
    } else if (MessageBox.from === "error") {
      dispatch(CloseMessageAction());
    }
  }, [MessageBox, dispatch]);

  return ReactDOM.createPortal(
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
    </div>,
    document.getElementById("message-box")
  );
};

export default memo(MessageBox);
