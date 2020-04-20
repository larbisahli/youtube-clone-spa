import React, { useCallback, useEffect, useState, useContext } from "react";
import { SearchRequest } from "../Components/api/YoutubeApi";
import "./Sass/results_style.scss";
import { FilterSvg } from "./Svg";
import {
  RippleButton,
  ResultVideoContainer,
  ResultChannelContainer,
  ResultPlaylistContainer,
  Filter,
} from "../Components";
import {
  MessageBoxContext,
  ThemeContext,
  UrlLocationContext,
  GuideContext,
} from "../Context";
import { Helmet } from "react-helmet";
import { UrlLocation, ReturnTheme } from "../utils/utils";
import { useParams } from "react-router";

let SearchArray = [];

const Results = React.memo(() => {
  // Get Route Param
  let { SearchValue } = useParams();

  // API Collector State
  const [SearchResult, setSearchResult] = useState([]);

  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  // Filter drop state

  const [ShowFilterDrop, setShowFilterDrop] = useState(false);
  const [FilterState, setFilterState] = useState();

  // Message Box Context

  const [, setMessageBox] = useContext(MessageBoxContext);

  // Guide Context

  const { guide } = useContext(GuideContext);
  const [ShowGuide] = guide;

  useEffect(() => {
    const pageManager = document.getElementById("page-manager");
    if (pageManager) {
      pageManager.style.marginLeft = ShowGuide ? "240px" : "72px";
    }
  }, []);

  // ===========================
  //  Handle Location Context
  // ===========================
  const [UrlLocationState, setUrlLocationState] = useContext(
    UrlLocationContext
  );

  useEffect(() => {
    // home location set to true
    const UrlLoc = UrlLocation(false);
    if (UrlLoc !== UrlLocationState) {
      setUrlLocationState(() => UrlLoc);
    }
  }, []);

  useEffect(() => {
    if (FilterState !== undefined) {
      if (!("defaultType" in FilterState)) {
        Search(
          SearchValue,
          Object.keys(FilterState)[0],
          FilterState[Object.keys(FilterState)[0]]
        );
      } else {
        Search(SearchValue);
      }
    } else {
      Search(SearchValue);
    }
  }, [SearchValue, FilterState]);

  // ===========================
  //           SEARCH
  // ===========================
  const Search = (id, parameter = false, option = false) => {
    SearchRequest(id, parameter, option)
      .then((data) => {
        data.items.map((res) => {
          return (SearchArray = [
            ...SearchArray,
            {
              thumbnail:
                "maxres" in res.snippet.thumbnails
                  ? res.snippet.thumbnails.maxres.url
                  : res.snippet.thumbnails.medium.url,
              channelTitle: res.snippet.channelTitle,
              channelId: res.snippet.channelId,
              videoId: res.id.kind === "youtube#video" ? res.id.videoId : false,
              playlistId:
                res.id.kind === "youtube#playlist" ? res.id.playlistId : false,
              publishedAt: res.snippet.publishedAt,
              title: res.snippet.title,
              description: res.snippet.description,
            },
          ]);
        });

        setSearchResult([...SearchArray]);
        SearchArray = [];
        if (ShowFilterDrop) {
          setShowFilterDrop(false);
        }
      })
      .catch((err) => {
        // Error Setup
        setMessageBox({
          show: true,
          message: `${err}`,
          btnMessage: "dismiss",
          MassageFrom: "error",
          id: "",
        });
      });
  };

  const handleFilterClick = useCallback(() => {
    setShowFilterDrop(!ShowFilterDrop);
  }, [ShowFilterDrop]);

  // ====================================
  //           Error Handling
  // ====================================

  // Closing Message box
  const HandleClosingMessageBox = useCallback(() => {
    setMessageBox((pre) => {
      return {
        show: false,
        message: pre.message,
        btnMessage: pre.btnMessage,
        MassageFrom: "",
        id: "",
      };
    });
  }, [setMessageBox]);

  // Show Message box
  const HandleShowMessageBox = useCallback(
    (MassageFrom, state, id = "", ch = false) => {
      if (!ch) {
        let msg;
        let btnMsg;
        if (MassageFrom === "wl") {
          msg = !state ? "Saved to Watch later" : "Removed from Watch later";
          btnMsg = !state ? "UNDO" : "";
        }

        setMessageBox({
          show: true,
          message: msg,
          btnMessage: btnMsg,
          MassageFrom: MassageFrom,
          id: id,
        });
      } else {
        setMessageBox({
          show: true,
          message: !state ? "Subscription added" : "Subscription removed",
          btnMessage: "",
          MassageFrom: "",
          id: "",
        });
      }

      setTimeout(() => {
        HandleClosingMessageBox();
      }, 4000);
    },
    [HandleClosingMessageBox, setMessageBox]
  );

  console.log("SearchValue :", SearchValue);

  return (
    <div id="page-manager" className="results_container">
      {/* Helmet */}
      <Helmet>
        <title>{`${SearchValue} - youtube`}</title>
        <meta
          name={`youtube search ${SearchValue}`}
          content="Helmet application"
        />
      </Helmet>
      <div className="results_content">
        {/* FILTER AREA */}
        <RippleButton
          onclick={handleFilterClick}
          classname="results_header_container"
        >
          <div className="header_wrapper">
            <FilterSvg Theme={Theme} />

            <span
              className={`header_wrapper__text header_wrapper__text--${ReturnTheme(
                Theme
              )}`}
            >
              filter
            </span>
          </div>
        </RippleButton>

        <Filter
          ShowFilterDrop={ShowFilterDrop}
          setFilterState={setFilterState}
          FilterState={FilterState}
        />

        {/* END FILTER AREA */}
        <div className={`line line--${ReturnTheme(Theme)}`}></div>
        <div className="results_section_list">
          {SearchResult.map((item, index) => {
            return item.videoId ? (
              <ResultVideoContainer
                key={index}
                index={index}
                item={item}
                HandleShowMessageBox={HandleShowMessageBox}
              />
            ) : !item.playlistId ? (
              <ResultChannelContainer
                key={index}
                index={index}
                item={item}
                HandleShowMessageBox={HandleShowMessageBox}
                FilterState={FilterState}
              />
            ) : (
              <ResultPlaylistContainer key={index} index={index} item={item} />
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Results;
