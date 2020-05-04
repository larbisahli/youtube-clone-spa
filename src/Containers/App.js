import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar, Guide, MiniGuide, Queue, MessageBox } from "../Components";
import {
  MessageBoxProvider,
  GuideProvider,
  QueueProvider,
  WLVProvider,
  UrlLocationProvider,
  NavProvider,
  ApiProvider,
} from "../Context";
import Home from "./Home";
import "./Sass/app_style.scss";

// dynamic import: means executed when the code runs
const Results = lazy(() => import("./Results"));
const WLV = lazy(() => import("./WLV"));
const Watch = lazy(() => import("./Watch"));
const Channel = lazy(() => import("./Channel"));
const NotFound = lazy(() => import("./NotFound"));
// react lazy :
// every route in rendered in advance do we use react lazy to load them on need.

function App() {
  return (
    <div className="root_container">
      <MessageBoxProvider>
        <QueueProvider>
          <GuideProvider>
            {/* NAVBAR */}
            <NavProvider>
              <Navbar />
              {/* PAGES */}
              <UrlLocationProvider>
                <WLVProvider>
                  <ApiProvider>
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
                          path="/playlist/list=:id"
                          exact
                          render={() => (
                            <Suspense fallback={<div></div>}>
                              <WLV />
                            </Suspense>
                          )}
                        />
                        {/* WATCH PAGE ROUTE */}
                        <Route
                          //path="/watch/v=:VideoId/"
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
                  </ApiProvider>
                </WLVProvider>
              </UrlLocationProvider>
            </NavProvider>
          </GuideProvider>
          {/* QUEUE */}
          <Queue />
        </QueueProvider>
      </MessageBoxProvider>
    </div>
  );
}

export default App;
