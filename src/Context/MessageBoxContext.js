import React, { useState, createContext } from "react";

export const MessageBoxContext = createContext();

export const MessageBoxProvider = (props) => {
  console.log("MessageBoxProvider:==>");

  const [MessageBox, setMessageBox] = useState({
    show: false,
    message: "",
    btnMessage: "",
    MassageFrom: "",
    id: "",
  });

  return (
    <MessageBoxContext.Provider value={[MessageBox, setMessageBox]}>
      {props.children}
    </MessageBoxContext.Provider>
  );
};
