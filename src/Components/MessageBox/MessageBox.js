import React, { useCallback, memo } from "react";
import style from "./messagebox.module.scss";
import { RippleButton } from "../ComponentsUtils";
import { GetClassName } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  SetMessageAction,
  CloseMessageAction,
  Wl_RemoveOneAtion,
  Lv_RemoveOneAtion,
} from "../../redux";

const MessageBox = memo(() => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

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
      className={`${GetClassName(style, "container", Theme)} ${
        style[`container--${MessageBox.show ? "show" : "hide"}`]
      }`}
    >
      <div className={style.wrapper}>
        <span className={style.textcon}>{MessageBox.message}</span>
        {MessageBox.btnText && (
          <RippleButton
            onclick={MessageBox.btnText !== "✔" ? HandleBtn : () => {}}
            classname={GetClassName(style, "btn", Theme)}
          >
            <span>{MessageBox.btnText}</span>
          </RippleButton>
        )}
      </div>
    </div>
  );
});

export default MessageBox;
