import React from "react";
import "./MessageBox.scss";

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
          <button onClick={HandleMessageBtn} className="box_btn">
            {btnMessage}
          </button>
        </div>
      </div>
    );
  }
);

export default MessageBox;
