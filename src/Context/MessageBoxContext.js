import React, { useState, createContext } from "react";

export const MessageBoxContext = createContext();

export const MessageBoxProvider = props => {
  console.log("GuideProvider:==>");

  // Trigger the Guide for resizing

  const [MessageBox, setMessageBox] = useState({
    show: false,
    message: "",
    btnMessage: "",
    this: ""
  });

  return (
    <MessageBoxContext.Provider value={[MessageBox, setMessageBox]}>
      {props.children}
    </MessageBoxContext.Provider>
  );
};
