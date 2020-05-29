import React, { memo, Fragment } from "react";

// Parent Container

const Parent = memo(({ children }) => {
  return <Fragment>{children}</Fragment>;
});

export default Parent;
