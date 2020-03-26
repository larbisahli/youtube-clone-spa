import React, { useContext } from "react";
import "./resultskeleton_style.scss";
import { ThemeContext } from "../../Context/ThemeContext";
import { ReturnTheme } from "../../config";

const ResultSkeleton = React.memo(() => {
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  return <div></div>;
});

export default ResultSkeleton;
