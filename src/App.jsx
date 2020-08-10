import React, { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "./redux";
import { HomeSkeleton, NavSkeleton, GuideSkeleton } from "./Components";
import "./scss/app.scss";

const Home = lazy(() => import("./pages/Home"));
const Results = lazy(() => import("./pages/Results"));
const WLV = lazy(() => import("./pages/WLV"));
const Watch = lazy(() => import("./pages/Watch"));
const Channel = lazy(() => import("./pages/Channel"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Guide = lazy(() => import("./Components/Guide/Guide"));
const MiniGuide = lazy(() => import("./Components/Guide/MiniGuide"));
const Queue = lazy(() => import("./Components/Queue/Queue"));
const MessageBox = lazy(() => import("./Components/MessageBox"));
const NavBar = lazy(() => import("./Containers/NavBar"));

function App() {
  const ApiKey = useSelector((state) => state.ApiKey);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems(ApiKey));
  }, [ApiKey, dispatch]);

  return (
    <div className="root_container">
      <Suspense fallback={<NavSkeleton />}>
        <NavBar />
      </Suspense>
      <div className="page_container">
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Suspense fallback={<HomeSkeleton />}>
                <Home />
              </Suspense>
            )}
          />
          <Route
            path="/results"
            render={() => (
              <Suspense fallback={<div></div>}>
                <Results />
              </Suspense>
            )}
          />
          <Route
            path="/playlist"
            exact
            render={() => (
              <Suspense fallback={<div></div>}>
                <WLV />
              </Suspense>
            )}
          />
          <Route
            path="/watch"
            exact
            render={() => (
              <Suspense fallback={<div></div>}>
                <Watch />
              </Suspense>
            )}
          />
          <Route
            path="/channel/:id"
            exact
            render={() => (
              <Suspense fallback={<div></div>}>
                <Channel />
              </Suspense>
            )}
          />
          <Route
            path="*"
            render={() => (
              <Suspense fallback={<div></div>}>
                <NotFound />
              </Suspense>
            )}
          />
        </Switch>
      </div>
      <Suspense fallback={<GuideSkeleton />}>
        <Guide />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <MiniGuide />
        <MessageBox />
        <Queue />
      </Suspense>
    </div>
  );
}

export default App;
