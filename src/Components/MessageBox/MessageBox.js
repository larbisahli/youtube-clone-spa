import React, { useCallback } from "react";
import "./MessageBox.scss";
import { RippleButton } from "../.";

const MessageBox = React.memo(
  ({ message, btnMessage, show, HandleMessageBtn }) => {
    return (
      <div
        className={`message_box_container message_box_container-${
          show ? "show" : "fade"
        }`}
      >
        <div className="em_wrapper">
          <span className="box_message">{message}</span>
          <RippleButton onclick={HandleMessageBtn} classname="box_btn">
            <span>{btnMessage}</span>
          </RippleButton>
        </div>
      </div>
    );
  }
);

export default MessageBox;
