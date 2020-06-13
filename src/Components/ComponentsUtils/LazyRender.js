import React, { useState, useEffect, memo } from "react";

const LazyRender = ({ children, render }) => {
  // ==================================
  // Seen, render only on demand once.
  // ==================================

  const [Seen, setSeen] = useState(false);

  useEffect(() => {
    if (!Seen && render) {
      setSeen(true);
    }
  }, [render, Seen]);

  return (
    Seen && React.Children.map(children, (child) => React.cloneElement(child))
  );
};

export default memo(LazyRender);
