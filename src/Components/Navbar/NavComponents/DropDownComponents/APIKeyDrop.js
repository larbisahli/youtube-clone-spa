import React, { useState, memo } from "react";
import styles from "./scss/semidrop.module.scss";
import { BackArrowSvg } from "../Svg";
import { ReturnTheme, GetClassName } from "../../../../utils";
import { LazyRender, RippleButton } from "../../../ComponentsUtils";
import { useSelector, useDispatch } from "react-redux";
import { ApiKeyInsert } from "../../../../redux";

// Using Memo to prevent unnecessary re-renders

const APIKeyDrop = ({ handleGoBackDrop, isCurrent, show }) => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  //  dispatch
  const dispatch = useDispatch();

  const [{ KeyValue }, setKeyValue] = useState({ KeyValue: "" });

  // ==========================
  //    Handle input change
  // ==========================

  const HandleChange = (e) => {
    setKeyValue({
      KeyValue: e.target.value,
    });
  };

  //

  const HandleKeySubmit = () => {
    if (KeyValue) {
      dispatch(ApiKeyInsert(KeyValue));
    }
  };

  return (
    <div
      id="apikey_drop"
      style={{ display: show ? "" : "none" }}
      className={GetClassName(styles, "container", Theme)}
    >
      <LazyRender render={show}>
        <div className={styles.header}>
          <button onClick={handleGoBackDrop} className={styles.header__arrow}>
            <BackArrowSvg isCurrent={isCurrent} />
          </button>
          <div className={styles.header__text}>Api Key insert</div>
        </div>
        <div className={`line line--${ReturnTheme(Theme)}`}></div>
        <div className={styles.mainbody}>
          <div className={styles.textarea}>
            Because of the limited YouTube v3 api calls, we couldn't display
            data content.
          </div>
          <div className={styles.textarea}>
            Try again by using your own v3 api key.
          </div>
          <div className={GetClassName(styles, "tr_container", Theme)}>
            <input
              className={GetClassName(styles, "api_input", Theme)}
              type="text"
              placeholder="Enter your api key"
              value={KeyValue}
              onChange={HandleChange}
            />
          </div>
          <div className={styles.btn_con}>
            <RippleButton onclick={HandleKeySubmit} classname="">
              <div
                style={{
                  backgroundColor: KeyValue
                    ? Theme
                      ? "#44a3f4"
                      : "#0c62d4"
                    : Theme
                    ? "#606060"
                    : "#9b9b9b",
                }}
                className={GetClassName(styles, "api_submit_btn", Theme)}
              >
                Submit
              </div>
            </RippleButton>
          </div>
        </div>
      </LazyRender>
    </div>
  );
};

export default memo(APIKeyDrop);
