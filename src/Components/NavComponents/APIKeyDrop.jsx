import React, { useState, memo } from "react";
import styles from "./scss/semidrop.module.scss";
import { BackArrowSvg } from "../CompSvg";
import { LazyRender, RippleButton } from "../CompUtils";
import { useSelector, useDispatch } from "react-redux";
import { ApiKeyInsert } from "../../redux";

const APIKeyDrop = ({ handleGoBackDrop, show }) => {
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  const dispatch = useDispatch();
  const [{ KeyValue }, setKeyValue] = useState({ KeyValue: "" });

  const HandleChange = (e) => {
    setKeyValue({
      KeyValue: e.target.value,
    });
  };

  const HandleKeySubmit = () => {
    if (KeyValue) {
      dispatch(ApiKeyInsert(KeyValue));
    }
  };

  return (
    <div
      id="apikey_drop"
      style={{ display: show ? "" : "none" }}
      className={styles.container}
    >
      <LazyRender render={show}>
        <div className={styles.header}>
          <button onClick={handleGoBackDrop} className={styles.header__arrow}>
            <BackArrowSvg Theme={Theme} />
          </button>
          <div className={styles.header__text}>Api Key insert</div>
        </div>
        <div className="line"></div>
        <div className={styles.mainbody}>
          <div className={styles.textarea}>
            Because of the limited YouTube v3 api calls, we couldn't display
            data content.
          </div>
          <div className={styles.textarea}>
            Try again by using your own v3 api key.
          </div>
          <div className={styles.tr_container}>
            <div className={styles.api_input}>
              <input
                className={styles.input_}
                type="text"
                placeholder="Enter your api key"
                value={KeyValue}
                onChange={HandleChange}
              />
            </div>
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
                className={styles.api_submit_btn}
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
