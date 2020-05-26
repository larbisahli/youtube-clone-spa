import { useState, useEffect } from "react";

// ================================================
//  Custom Hook to handle the window current width
// ================================================

export const useMeasure = () => {
  const [{ innerWidth }, setInnerWidth] = useState({
    innerWidth: window.innerWidth,
  });

  const updateWindowDimensions = () => {
    setInnerWidth({ innerWidth: window.innerWidth });
  };

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [innerWidth]);

  return innerWidth;
};
