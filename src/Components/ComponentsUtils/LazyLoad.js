import React, { useState, useEffect } from "react";

const LazyLoad = React.memo(({ children, render }) => {
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
});

export default LazyLoad;
