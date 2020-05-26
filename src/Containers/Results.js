import React, { useCallback, useEffect, useState, memo } from "react";
import { SearchRequest } from "../Components/api/YoutubeApi";
import styles from "./Sass/results.module.scss";
import { FilterSvg } from "./Svg";
import {
  ResultVideoContainer,
  ResultChannelContainer,
  ResultPlaylistContainer,
  Filter,
} from "../Components";
import { RippleButton } from "../Components/ComponentsUtils";
import { Head } from "../Components/ComponentsUtils";
import { PageLocation, ReturnTheme, GetClassName } from "../utils";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  SetMessageAction,
  CloseMessageAction,
  SetUrlLocationAction,
} from "../redux";

let SearchArray = [];

const Results = () => {
  // API Collector State
  const [SearchResult, setSearchResult] = useState([]);

  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  // Filter drop state
  const [ShowFilterDrop, setShowFilterDrop] = useState(false);
  const [FilterState, setFilterState] = useState();

  // urlLocation
  const UrlLocation = useSelector((state) => state.Guide.UrlLocation);

  // Guide
  const showGuide = useSelector((state) => state.Guide.showGuide);
  const guideMode = useSelector((state) => state.Guide.guideMode);

  // dispatch
  const dispatch = useDispatch();

  // A custom hook that builds on useLocation to parse
  // the query string for you.
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  let SearchValue = query.get("search_query");

  useEffect(() => {
    // set location for guide
    const UrlLoc = PageLocation();
    if (UrlLoc !== UrlLocation) {
      dispatch(SetUrlLocationAction(UrlLoc));
    }
  }, []);

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
        dispatch(
          SetMessageAction({
            message: `${err}`,
            btnText: "dismiss",
            from: "error",
            id: "",
          })
        );
      });
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SearchValue, FilterState]);

  const handleFilterClick = useCallback(() => {
    setShowFilterDrop(!ShowFilterDrop);
  }, [ShowFilterDrop]);

  // ====================================
  //           Error Handling
  // ====================================

  // Closing Message box
  const HandleClosingMessageBox = useCallback(() => {
    dispatch(CloseMessageAction());
  }, [dispatch]);

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

        dispatch(
          SetMessageAction({
            message: msg,
            btnText: btnMsg,
            from: MassageFrom,
            id: id,
          })
        );
      } else {
        dispatch(
          SetMessageAction({
            message: !state ? "Subscription added" : "Subscription removed",
            btnText: "",
            from: "",
            id: "",
          })
        );
      }

      setTimeout(() => {
        HandleClosingMessageBox();
      }, 4000);
    },
    [HandleClosingMessageBox, dispatch]
  );

  return (
    <div
      id="page-manager"
      style={{ marginLeft: showGuide && guideMode === 1 ? "240px" : "72px" }}
      className={styles.container}
    >
      {/* Helmet */}
      <Head>
        <title>{`${SearchValue} - youtube`}</title>
        <meta
          name={`youtube search ${SearchValue}`}
          content="Helmet application"
        />
      </Head>
      <div className={styles.content}>
        {/* FILTER AREA */}
        <RippleButton
          onclick={handleFilterClick}
          classname={styles.header_container}
        >
          <div className={styles.header_wrapper}>
            <FilterSvg Theme={Theme} />

            <span className={GetClassName(styles, "btntext", Theme)}>
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
        <div className={styles.section_list}>
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
};

export default memo(Results);
