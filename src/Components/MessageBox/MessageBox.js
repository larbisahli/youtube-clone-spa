import React, { useContext, useCallback } from "react";
import "./messagebox_style.scss";
import { RippleButton } from "../ComponentsUtils";
import { ReturnTheme } from "../../utils";
import { MessageBoxContext, ThemeContext, WLVContext } from "../../Context";

const MessageBox = React.memo(() => {
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  // Message Box Context
  const [MessageBox, setMessageBox] = useContext(MessageBoxContext);

  // WLV Context
  const { WatchLaterState } = useContext(WLVContext);
  const [, WLdispatch] = WatchLaterState;

  // HandleBtn
  const HandleBtn = useCallback(() => {
    if (MessageBox.MassageFrom === "wl") {
      WLdispatch({ type: "removeOne", videoId: MessageBox.id });
      setMessageBox((pre) => {
        return {
          show: pre.show,
          message: "Removed from Watch later",
          btnMessage: "✔",
          MassageFrom: "",
          id: "",
        };
      });
    } else if (MessageBox.MassageFrom === "error") {
      setMessageBox((msg) => {
        return { ...msg, show: false };
      });
    }
  }, [MessageBox, WLdispatch, setMessageBox]);

  console.log("MessageBox :", MessageBox);
  return (
    <div
      className={`message_box message_box--${
        MessageBox.show ? "show" : "hide"
      } message_box--${ReturnTheme(Theme)}`}
    >
      <div className="message_box__wrapper">
        <span className="message_box__text">{MessageBox.message}</span>
        {MessageBox.btnMessage && (
          <RippleButton
            onclick={MessageBox.btnMessage !== "✔" ? HandleBtn : () => {}}
            classname={`message_box__btn message_box__btn--${ReturnTheme(
              Theme
            )}`}
          >
            <span>{MessageBox.btnMessage}</span>
          </RippleButton>
        )}
      </div>
    </div>
  );
});

export default MessageBox;
