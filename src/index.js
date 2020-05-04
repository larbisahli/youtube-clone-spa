import React from "react";
import ReactDOM from "react-dom";
import "./sass/index_style.scss";
import App from "./Containers/App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./Context";

ReactDOM.render(
  <Router>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById("root")
);
