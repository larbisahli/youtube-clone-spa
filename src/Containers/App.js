import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  Fragment
} from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import { Navbar, Guide, MiniGuide } from "../Components";
import { NavProvider, NavContext } from "../Context/NavContext";
import { ThemeContext } from "../Context/ThemeContext";

import Home from "./Home";
import "./App.scss";

function App() {
  // Slider State

  const [ShowGuide, setShowGuide] = useState(true);

  //const [YtTheme] = useContext(ThemeContext);
  //const Theme = YtTheme.isDarkTheme;

  const [{ searchValue }, setSearchValue] = useState({
    searchValue: ""
  });

  // ===========================
  //       Handle Guide
  // ===========================

  // Handle Close
  const HandleCloseGuide = event => {
    const GUIDENODE = document.getElementById("GuideG");
    if (GUIDENODE.isSameNode(event.target)) {
      setShowGuide(false);
      GUIDENODE.removeEventListener("click", HandleCloseGuide);
    }
  };

  // Handle Show
  const HandleShowGuide = useCallback(() => {
    const GUIDENODE = document.getElementById("GuideG");
    if (!ShowGuide && false) {
      GUIDENODE.addEventListener("click", HandleCloseGuide);
    }
    setShowGuide(!ShowGuide);
  }, [setShowGuide, ShowGuide]);

  // ==========================
  //       Handle Submit
  // ==========================

  console.log("ShowGuide :", ShowGuide);

  const HandleSubmit = useCallback(
    event => {
      event.preventDefault();
      console.log("HandleSubmit: ", searchValue);
    },
    [searchValue]
  );

  // ==========================
  //       Handle Select
  // ==========================

  const HandleSelect = useCallback(select => {
    console.log("HandleSelect: ", select);
  }, []);

  return (
    <div className="rootContainer">
      {/* NAVBAR */}
      <NavProvider>
        <Navbar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          HandleSubmit={HandleSubmit}
          HandleSelect={HandleSelect}
          HandleShowGuide={HandleShowGuide}
        />
      </NavProvider>
      <Switch>
        {/* HOME PAGE ROUTE */}
        <Route path="/" exact component={Home} />
        {/* */}
      </Switch>
      {/* GUIDE */}
      <Fragment>
        <MiniGuide />
      </Fragment>
      <Fragment>
        <Guide ShowGuide={ShowGuide} />
      </Fragment>
    </div>
  );
}

export default App;
