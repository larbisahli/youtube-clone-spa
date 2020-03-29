import React, { useState, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar, Guide, MiniGuide } from "../Components";
import { NavProvider } from "../Context/NavContext";
import { GuideProvider } from "../Context/GuideContext";
import { UrlLocationProvider } from "../Context/UrlLocationContext";
import Results from "./Results";
import Home from "./Home";
import "./Sass/app_style.scss";

function App() {
  // Slider State
  const [ShowGuide, setShowGuide] = useState(true);

  // ===========================
  //       Handle Guide
  // ===========================

  // Handle Show
  const HandleShowGuide = useCallback(() => {
    setShowGuide(!ShowGuide);
  }, [setShowGuide, ShowGuide]);

  return (
    <div className="rootContainer">
      {/* NAVBAR */}
      <GuideProvider>
        <NavProvider>
          <Navbar HandleShowGuide={HandleShowGuide} />
        </NavProvider>
        {/* PAGES */}
        <UrlLocationProvider>
          <div className="page_container">
            <Switch>
              {/* HOME PAGE ROUTE */}
              <Route path="/" exact component={Home} />
              {/* RESULTS PAGE ROUTE*/}
              <Route path="/results/search=:id" component={Results} />
            </Switch>
          </div>
          {/* GUIDE */}
          <MiniGuide />
          <Guide ShowGuide={ShowGuide} setShowGuide={setShowGuide} />
        </UrlLocationProvider>
      </GuideProvider>
      {/* QUEUE */}
    </div>
  );
}

export default App;
