import React, { memo, useEffect, useState } from "react";
import styles from "./scss/apimessage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { HideApiMessageAction } from "../../redux";

const ApiMessageBox = () => {
  const DisplayApiMessage = useSelector((state) => state.DisplayApiMessage);
  const [ShowMessageBox, setShowMessageBox] = useState(false);
  const [fade, setFade] = useState(true);
  const dispatch = useDispatch();

  const TimeOut = () => {
    setFade(false);
    setTimeout(() => {
      setFade(true);
    }, 4000);

    setTimeout(() => {
      setShowMessageBox(false);
      setFade(false);
    }, 4600);
  };

  useEffect(() => {
    if (DisplayApiMessage) {
      setShowMessageBox(true);

      setTimeout(() => {
        TimeOut();
      }, 3000);
    }

    dispatch(HideApiMessageAction());
  }, [DisplayApiMessage, dispatch]);

  useEffect(() => {
    return () => {
      // Clean Up
      setShowMessageBox(false);
    };
  }, []);

  return (
    <div
      style={{
        opacity: fade ? "0" : "1",
        display: ShowMessageBox ? "block" : "none",
      }}
      className={styles.container}
    >
      <span>Enter your API key here</span>
    </div>
  );
};

export default memo(ApiMessageBox);
