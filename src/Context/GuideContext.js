import React, { useState, createContext } from "react";

export const GuideContext = createContext();

export const GuideProvider = props => {
  console.log("GuideProvider:==>");

  // Trigger the Guide for resizing

  const [GuideTrigger, setGuideTrigger] = useState(0);

  return (
    <GuideContext.Provider value={[GuideTrigger, setGuideTrigger]}>
      {props.children}
    </GuideContext.Provider>
  );
};
