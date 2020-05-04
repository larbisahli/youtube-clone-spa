import React, { useState, createContext, useCallback } from "react";
import { UrlLocation } from "../utils";
export const GuideContext = createContext();

export const GuideProvider = (props) => {
  const UrlLoc = UrlLocation(false);

  const isWatchPage = UrlLoc === "watch";

  const [ShowGuide, setShowGuide] = useState(() => {
    return window.innerWidth > 810 ? !isWatchPage : null;
  });

  const HundleShowGuide = useCallback(
    (bool, ShowOnResize = true) => {
      if (isWatchPage && ShowOnResize) {
        setShowGuide(bool);
      } else if (!isWatchPage) {
        setShowGuide(bool);
      }
    },
    [setShowGuide, isWatchPage]
  );

  return (
    <GuideContext.Provider value={[ShowGuide, HundleShowGuide]}>
      {props.children}
    </GuideContext.Provider>
  );
};
