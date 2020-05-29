import React, { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar, Guide, MiniGuide, Queue, MessageBox } from "../Components";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../redux";
import Home from "./HomePage/Home";
import "./app.scss";

// dynamic import: means executed when the code runs
const Results = lazy(() => import("./ResultsPage/Results"));
const WLV = lazy(() => import("./WLVPage/WLV"));
const Watch = lazy(() => import("./WatchPage/Watch"));
const Channel = lazy(() => import("./ChannelPage/Channel"));
const NotFound = lazy(() => import("./NotFoundPage/NotFound"));

// react lazy :
// every route in rendered in advance do we use react lazy to load them on need.

function App() {
  // api key
  const ApiKey = useSelector((state) => state.ApiKey);

  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch items
    // because of youtube's api request restrictions i only want to make a call once.
    dispatch(fetchItems(ApiKey));
  }, [ApiKey, dispatch]);

  return (
    <div className="root_container">
      {/* NAVBAR */}
      <Navbar />
      {/* PAGES */}
      <div className="page_container">
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
