import React from "react";
import "./MessageBox.scss";

const MessageBox = React.memo(
  ({ message, btnMessage, show, HandleMessageShow }) => {
    return (
      <div
        className={`error_message_container error_message_container-${
          show ? "show" : "fade"
        }`}
      >
        <div className="em_wrapper">
          <span className="error_message">{message}</span>
          <button onClick={HandleMessageShow} className="error_btn">
            {btnMessage}
          </button>
        </div>
      </div>
    );
  }
);

export default MessageBox;
