import React, { useContext, useCallback } from "react";
import "./messagebox_style.scss";
import { RippleButton } from "../.";
import { ReturnTheme } from "../../config";
import { ThemeContext } from "../../Context/ThemeContext";
import { MessageBoxContext } from "../../Context/MessageBoxContext";
import { WLVContext } from "../../Context/WLVContext";

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
      className={`message_box_container message_box_container-${
        MessageBox.show ? "show" : "fade"
      } message_box_container-${ReturnTheme(Theme)}`}
    >
      <div className="em_wrapper">
        <span className="box_message">{MessageBox.message}</span>
        {MessageBox.btnMessage && (
          <RippleButton
            onclick={MessageBox.btnMessage !== "✔" ? HandleBtn : () => {}}
            classname={`box_btn box_btn-${ReturnTheme(Theme)}`}
          >
            <span>{MessageBox.btnMessage}</span>
          </RippleButton>
        )}
      </div>
    </div>
  );
});

export default MessageBox;
