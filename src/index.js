import React from "react";
import ReactDOM from "react-dom";
import "./config.scss";
import App from "./Containers/App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
