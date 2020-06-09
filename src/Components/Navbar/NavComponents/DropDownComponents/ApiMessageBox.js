import React, { memo, useEffect, useState } from "react";
import styles from "./scss/apimessage.module.scss";
import { GetClassName } from "../../../../utils";
import { useSelector, useDispatch } from "react-redux";
import { HideApiMessageAction } from "../../../../redux";

const ApiMessageBox = () => {
  // api key

  const DisplayApiMessage = useSelector((state) => state.DisplayApiMessage);

  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  // dispatch
  const dispatch = useDispatch();

  const [ShowMessageBox, setShowMessageBox] = useState(false);
  const [fade, setFade] = useState(true);

  const TimeOut = () => {
    setFade(false);
    setTimeout(() => {
      setFade(true);
    }, 4000);

    //Note: transition: all .6s ease-in-out;

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
      className={GetClassName(styles, "container", Theme)}
    >
      <span>Enter your API key here</span>
    </div>
  );
};

export default memo(ApiMessageBox);
