import React from "react";
import styles from "./scss/semidrop.module.scss";
import { CheckedSvg } from "../CompSvg";

const LangItem = ({ onclick, Theme, loca, L }) => {
  return (
    <div onClick={onclick} className={styles.lang}>
      <div className={styles.lang__check}>
        <CheckedSvg
          Theme={Theme}
          color={loca.checked ? (Theme ? "#fff" : "#333") : "transparent"}
        />
      </div>
      <span>{L}</span>
    </div>
  );
};

export default LangItem;
