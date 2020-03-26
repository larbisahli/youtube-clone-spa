import React, { useState, createContext } from "react";

export const UrlLocationContext = createContext();

export const UrlLocationProvider = props => {
  console.log("UrlLocation:==>");

  // UrlLocation State
  const [UrlLocationState, setUrlLocationState] = useState(false);

  return (
    <UrlLocationContext.Provider
      value={[UrlLocationState, setUrlLocationState]}
    >
      {props.children}
    </UrlLocationContext.Provider>
  );
};
