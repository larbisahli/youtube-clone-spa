import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  Fragment
} from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar, Guide, MiniGuide } from "../Components";
import { NavProvider } from "../Context/NavContext";
import { UrlLocationProvider } from "../Context/UrlLocationContext";
//import { ThemeContext } from "../Context/ThemeContext";
import Results from "./Results";
import Home from "./Home";
import "./Sass/app_style.scss";

function App() {
  // Slider State
  const [ShowGuide, setShowGuide] = useState(true);

  //const [YtTheme] = useContext(ThemeContext);
  //const Theme = YtTheme.isDarkTheme;

  // ===========================
  //       Handle Guide
  // ===========================

  // Handle Close
  const HandleCloseGuide = useCallback(event => {
    const GUIDENODE = document.getElementById("GuideG");
    if (GUIDENODE.isSameNode(event.target)) {
      setShowGuide(false);
      GUIDENODE.removeEventListener("click", HandleCloseGuide);
    }
  }, []);

  // Handle Show
  const HandleShowGuide = useCallback(() => {
    const GUIDENODE = document.getElementById("GuideG");
    if (!ShowGuide && false) {
      // for watch page
      GUIDENODE.addEventListener("click", HandleCloseGuide);
    }
    setShowGuide(!ShowGuide);
  }, [setShowGuide, ShowGuide]);

  return (
    <div className="rootContainer">
      {/* NAVBAR */}
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
        <Guide ShowGuide={ShowGuide} />
      </UrlLocationProvider>
      {/* QUEUE */}
    </div>
  );
}

export default App;
