import React, { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar, Guide, MiniGuide, Queue, MessageBox } from "../Components";
import { useDispatch } from "react-redux";
import { fetchItems } from "../redux";
import Home from "./Home";
import style from "./Sass/app.module.scss";

// dynamic import: means executed when the code runs
const Results = lazy(() => import("./Results"));
const WLV = lazy(() => import("./WLV"));
const Watch = lazy(() => import("./Watch"));
const Channel = lazy(() => import("./Channel"));
const NotFound = lazy(() => import("./NotFound"));

// react lazy :
// every route in rendered in advance do we use react lazy to load them on need.

function App() {
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch items
    // because of youtube's api request restrictions i only want to make a call once.

    dispatch(fetchItems());
  }, []);

  return (
    <div className={style.root_container}>
      {/* NAVBAR */}
      <Navbar />
      {/* PAGES */}
      <div className={style.page_container}>
        <Switch>
          {/* HOME PAGE ROUTE */}
          <Route path="/" exact component={Home} />
          {/* RESULTS PAGE ROUTE*/}
          <Route
            path="/results"
            render={() => (
              <Suspense fallback={<div></div>}>
                <Results />
              </Suspense>
            )}
          />
          {/* WLV PAGE ROUTE*/}
          <Route
            path="/playlist"
            exact
            render={() => (
              <Suspense fallback={<div></div>}>
                <WLV />
              </Suspense>
            )}
          />
          {/* WATCH PAGE ROUTE */}
          <Route
            path="/watch"
            exact
            render={() => (
              <Suspense fallback={<div></div>}>
                <Watch />
              </Suspense>
            )}
          />
          {/* CHANNEL PAGE ROUTE */}
          <Route
            path="/channel/:id"
            exact
            render={() => (
              <Suspense fallback={<div></div>}>
                <Channel />
              </Suspense>
            )}
          />
          {/* 404 */}
          <Route
            render={() => (
              <Suspense fallback={<div></div>}>
                <NotFound />
              </Suspense>
            )}
          />
        </Switch>
      </div>
      {/* GUIDE */}
      <MiniGuide />
      <Guide />
      {/* MESSAGE BOX */}
      <MessageBox />
      {/* QUEUE */}
      <Queue />
    </div>
  );
}

export default App;
