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
import { UrlLocation, ReturnTheme } from "../config";
import { useParams } from "react-router";

let SearchArray = [];

const Results = React.memo(() => {
  // Get Route Param
  let { id } = useParams();

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
    if (document.getElementById("hvc") != null) {
      document.getElementById("hvc").style.marginLeft = ShowGuide
        ? "240px"
        : "72px";
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
          id,
          Object.keys(FilterState)[0],
          FilterState[Object.keys(FilterState)[0]]
        );
      } else {
        Search(id);
      }
    } else {
      Search(id);
    }
  }, [id, FilterState]);

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

  return (
    <div id="hvc" className="results_container">
      <div className="results_contentwrapper">
        {/* FILTER AREA */}
        <RippleButton onclick={handleFilterClick} classname="header_container">
          <div className="header_wrapper">
            <div className="header_icon">
              <FilterSvg Theme={Theme} />
            </div>
            <span className={`header_text header_text-${ReturnTheme(Theme)}`}>
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
        <div className={`r_line r_line-${ReturnTheme(Theme)}`}></div>
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
