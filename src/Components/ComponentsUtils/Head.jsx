import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ children }) => {
  return (
    <Helmet>
      {React.Children.map(children, (child) => React.cloneElement(child))}
    </Helmet>
  );
};

export default Head;
