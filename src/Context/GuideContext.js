import React, { useState, createContext } from "react";

export const GuideContext = createContext();

export const GuideProvider = (props) => {
  const [windowSize, setWindowSize] = useState(() => {
    return window.innerWidth;
  });

  const [ShowGuide, setShowGuide] = useState(() => {
    return window.innerWidth > 810 ? true : null;
  });

  return (
    <GuideContext.Provider
      value={{
        winSize: [windowSize, setWindowSize],
        guide: [ShowGuide, setShowGuide],
      }}
    >
      {props.children}
    </GuideContext.Provider>
  );
};
