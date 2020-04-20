import React from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar, Guide, MiniGuide, Queue, MessageBox } from "../Components";
import {
  MessageBoxProvider,
  GuideProvider,
  QueueProvider,
  WLVProvider,
  UrlLocationProvider,
  NavProvider,
} from "../Context";
import Results from "./Results";
import Home from "./Home";
import WLV from "./WLV";
import Watch from "./Watch";
import Channel from "./Channel";
import "./Sass/app_style.scss";

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
                  <div className="page_container">
                    <Switch>
                      {/* HOME PAGE ROUTE */}
                      <Route path="/" exact component={Home} />
                      {/* RESULTS PAGE ROUTE*/}
                      <Route
                        path="/results/search=:SearchValue"
                        component={Results}
                      />
                      {/* WLV PAGE ROUTE*/}
                      <Route path="/playlist/list=:id" exact component={WLV} />
                      {/* WATCH PAGE ROUTE */}
                      <Route path="/watch/v=:id" exact component={Watch} />
                      {/* CHANNEL PAGE ROUTE */}
                      <Route path="/channel/:id" exact component={Channel} />
                    </Switch>
                  </div>
                  {/* GUIDE */}
                  <MiniGuide />
                  <Guide />
                  {/* MESSAGE BOX */}
                  <MessageBox />
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
