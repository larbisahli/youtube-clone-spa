import React from "react";
import styles from "./scss/btndrop.module.scss";

const DropItemLink = ({ to, children, label }) => {
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.textcon}
    >
      <div className={styles.icon_wrap}>{children}</div>
      <div className={styles.text_wrap}>{label}</div>
    </a>
  );
};

export default DropItemLink;
