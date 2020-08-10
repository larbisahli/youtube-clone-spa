import React, { useCallback, useEffect, useState, memo } from "react";
import { SearchRequest } from "../../api/YoutubeApi";
import styles from "./results.module.scss";
import { FilterSvg } from "../../Components/CompSvg";
import {
  ResultsVideoContainer,
  ResultsChannelContainer,
  ResultsPlaylistContainer,
  Filter,
} from "../../Containers/ResultsContainer";
import { RippleButton, Head } from "../../Components/CompUtils";
import { PageLocation } from "../../utils";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  SetMessageAction,
  CloseMessageAction,
  SetUrlLocationAction,
  ShowApiMessageAction,
} from "../../redux";

let SearchArray = [];

const Results = () => {
  const [SearchResult, setSearchResult] = useState([]);
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  const [ShowFilterDrop, setShowFilterDrop] = useState(false);
  const [FilterState, setFilterState] = useState();
  const UrlLocation = useSelector((state) => state.Guide.UrlLocation);
  const ApiKey = useSelector((state) => state.ApiKey);
  const showGuide = useSelector((state) => state.Guide.showGuide);
  const guideMode = useSelector((state) => state.Guide.guideMode);
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
  }, [dispatch, UrlLocation]);

  // ===========================
  //           SEARCH
  // ===========================
  const Search = (id, parameter = false, option = false) => {
    SearchRequest(id, parameter, option, ApiKey.isKey, ApiKey.key)
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
        const errorMessage = err.response;
        let message;
        let errMessage;
        if (
          typeof errorMessage.data === "string" ||
          errorMessage.data instanceof String
        ) {
          // it's a string
          errMessage = errorMessage.data;
        } else {
          // it's an object
          errMessage = errorMessage.data.error.message;
        }

        if ((errorMessage.status !== 200) & (errorMessage.status !== 0)) {
          // if (errorMessage.status === 403) {
          //   message = `Error code: 403. Try to insert your api key.`;
          // } else {
          //   message = `Error: ${errMessage}`;
          // }

          message = `Error: ${errMessage}`;

          dispatch(
            SetMessageAction({
              message: message,
              btnText: "dismiss",
              from: "error",
              id: "",
            })
          );

          if (errorMessage.status === 403 || errorMessage.status === 400) {
            dispatch(ShowApiMessageAction());
          }
        }
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
  //        Message box Handling
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

            <span className={styles.btntext}>filter</span>
          </div>
        </RippleButton>

        <Filter
          ShowFilterDrop={ShowFilterDrop}
          setFilterState={setFilterState}
          FilterState={FilterState}
        />

        {/* END FILTER AREA */}
        <div className="line"></div>
        <div className={styles.section_list}>
          {SearchResult.map((item, index) => {
            return item.videoId ? (
              <ResultsVideoContainer
                key={index}
                index={index}
                item={item}
                HandleShowMessageBox={HandleShowMessageBox}
              />
            ) : !item.playlistId ? (
              <ResultsChannelContainer
                key={index}
                index={index}
                item={item}
                HandleShowMessageBox={HandleShowMessageBox}
                FilterState={FilterState}
              />
            ) : (
              <ResultsPlaylistContainer key={index} index={index} item={item} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(Results);
