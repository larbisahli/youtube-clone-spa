import React, { useContext } from "react";
import "./messagebox_style.scss";
import { RippleButton } from "../.";
import { ReturnTheme } from "../../config";
import { ThemeContext } from "../../Context/ThemeContext";

const MessageBox = React.memo(
  ({ message, btnMessage, show, HandleMessageBtn }) => {
    // Theme context
    const [YtTheme] = useContext(ThemeContext);
    const Theme = YtTheme.isDarkTheme;

    return (
      <div
        className={`message_box_container message_box_container-${
          show ? "show" : "fade"
        } message_box_container-${ReturnTheme(Theme)}`}
      >
        <div className="em_wrapper">
          <span className="box_message">{message}</span>
          <RippleButton
            onclick={HandleMessageBtn}
            classname={`box_btn box_btn-${ReturnTheme(Theme)}`}
          >
            <span>{btnMessage}</span>
          </RippleButton>
        </div>
      </div>
    );
  }
);

export default MessageBox;
