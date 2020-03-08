import React, { useState, useEffect, useCallback, useContext } from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "../Components";
import { NavProvider } from "../Context/NavContext";
import { ThemeContext } from "../Context/ThemeContext";
import "./App.scss";

function App() {
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const [{ searchValue }, setSearchValue] = useState({
    searchValue: ""
  });

  // ==========================
  //       handle Submit
  // ==========================

  const HandleSubmit = useCallback(
    event => {
      event.preventDefault();
      console.log("HandleSubmit: ", searchValue);
    },
    [searchValue]
  );

  // ==========================
  //       handle Select
  // ==========================

  const HandleSelect = useCallback(select => {
    console.log("HandleSelect: ", select);
  }, []);

  return (
    <div
      className={
        "rootContainer" +
        (Theme ? " rootContainer-dark" : " rootContainer-light")
      }
    >
      <NavProvider>
        <Navbar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          HandleSubmit={HandleSubmit}
          HandleSelect={HandleSelect}
        />
      </NavProvider>
    </div>
  );
}

export default App;
