import React, { useState, useEffect, useCallback, Fragment, memo } from "react";
import styles from "./navbar.module.scss";
import YoutubeLogo from "../../assets/images/Youtube_icon.svg";
import { Link, useHistory } from "react-router-dom";
import { Head, RippleButton, ProfileImg } from "../../Components/CompUtils";
import {
  CamSvg,
  MenuSvg,
  BellSvg,
  AppSvg,
  SearchSvg,
  ReSearchSvg,
  BackArrowSvg,
} from "../../Components/CompSvg";
import {
  SearchDropSuggestion,
  CamDrop,
  AppDrop,
  Notification,
  ProfileDrop,
  SADrop,
  LangDrop,
  ThemeDrop,
  LocaDrop,
  RestrictDrop,
  APIKeyDrop,
  APiMessageBox,
} from "../../Components/NavComponents";
import { PageLocation } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  NotiCountAction,
  ShowGuideAction,
  SetGuideModeAction,
  HideGuideAction,
  ToggleGuideAction,
} from "../../redux";
import { useMeasure } from "../../Components/Hooks/useMeasure";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const YTForm = memo(
  ({
    ShowSearchDrop,
    suggestions,
    historicalSuggestions,
    searchIsActive,
    RemoveHandleClick,
    HandleSelect,
    inputFocus,
    HandleSubmit,
    searchValue,
    handleInputFocus,
    HandleChange,
    handleInputBlur,
    Theme,
    setSDstate,
  }) => {
    const HandlekeyPress = (event) => {
      if (event.key === "Enter") {
        if (ShowSearchDrop) {
          setSDstate((pre) => {
            return {
              searchIsActive: pre.searchIsActive,
              ShowSearchDrop: false,
            };
          });
        }
      }
    };

    return (
      <div className={styles.search_container}>
        <form className={styles.form_container} onSubmit={HandleSubmit}>
          <div className={styles.form_wrapper}>
            <div
              className={cx("input_wrapper", {
                focus: inputFocus,
              })}
            >
              <input
                className={styles.search_input}
                type="text"
                name="search"
                value={searchValue}
                onChange={HandleChange}
                placeholder="Search"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyPress={HandlekeyPress}
              />
              <SearchDropSuggestion
                ShowSearchDrop={ShowSearchDrop}
                suggestions={
                  searchIsActive ? suggestions : historicalSuggestions
                }
                searchIsActive={searchIsActive}
                RemoveHandleClick={RemoveHandleClick}
                HandleSelect={HandleSelect}
              />
            </div>
            <button className={cx("btn_container", "titleS", "btn_container")}>
              <SearchSvg Theme={Theme} />
            </button>
          </div>
        </form>
      </div>
    );
  }
);

// Global variable for semiDrops
let isInSemiDrop = false; // useRef

const NavBar = () => {
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  const NotiCount = useSelector((state) => state.Navbar.notiCount);
  const accounts = useSelector((state) => state.Navbar.accounts);
  const guideMode = useSelector((state) => state.Guide.guideMode);
  const dispatch = useDispatch();
  const IsCurrentAccount = accounts.filter((acc) => acc.isCurrent)[0];
  const [{ inputFocus }, setInputFocus] = useState({ inputFocus: false });

  // FAKE SUGGESTIONS
  // you can use setSuggestions here if you have the api for autocomplete. (~˘▾˘)~
  const [suggestions] = useState([
    { suggestion: "Traversy Media", id: 1 },
    { suggestion: "ed dev", id: 2 },
    { suggestion: "freecodecamp", id: 3 },
    { suggestion: "him tears On tape", id: 4 },
    { suggestion: "metallica unforgiven", id: 5 },
  ]);

  const [historicalSuggestions, setH_suggest] = useState([
    { suggestion: "Alter Bridge", removed: false, id: 1 },
    { suggestion: "learn react js", removed: false, id: 2 },
    { suggestion: "freecodecamp", removed: false, id: 3 },
    { suggestion: "in flames", removed: false, id: 4 },
    { suggestion: "python tutorial", removed: false, id: 5 },
  ]);

  const [{ ShowSearchDrop, searchIsActive }, setSDstate] = useState({
    ShowSearchDrop: false,
    searchIsActive: false,
  });

  // ==> Navbar responsive state
  const [{ ShowForm }, setShowForm] = useState({
    ShowForm: false,
  });

  const [dropHandler, setDropHandler] = useState({
    ShowCamDrop: false,
    ShowAppDrop: false,
    ShowBellDrop: false,
    ShowProfDrop: false,
  });

  // ==> SemiDrops state (Drops that inside profile drop)
  const [semiDrop, setSemiDrop] = useState({
    SADrop: false,
    LangDrop: false,
    ThemeDrop: false,
    LocaDrop: false,
    RestrictDrop: false,
    APIKey: false,
  });

  // ==> Check if th nav component is mounted
  const [{ componentMounted }, setComponentMounted] = useState({
    componentMounted: false,
  });

  // ==> Search Value State
  const [{ searchValue }, setSearchValue] = useState({
    searchValue: "",
  });

  let history = useHistory();

  //  Handle Submit

  const HandleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (searchValue !== "") {
        history.push(`/results?search_query=${searchValue}`);
      }
    },
    [history, searchValue]
  );

  //  Handle Select

  const HandleSelect = useCallback(
    (select) => {
      if (select !== "") {
        history.push(`/results?search_query=${select}`);
      }
    },
    [history]
  );

  const innerWidth = useMeasure();

  useEffect(() => {
    // innerWidth here as a dependency is a trigger for the updates.
    // Hide search drop when the window width is less than 890

    if (innerWidth < 890) {
      setSDstate({
        searchIsActive,
        ShowSearchDrop: false,
      });
    }

    if (innerWidth > 750 && ShowForm) {
      setShowForm({
        ShowForm: false,
      });
    }

    // for Guide

    if (innerWidth < 1340 && guideMode === 1) {
      dispatch(HideGuideAction());
      dispatch(SetGuideModeAction(2));
    }

    if (innerWidth > 1340) {
      if (PageLocation() !== "watch") {
        dispatch(ShowGuideAction());
        dispatch(SetGuideModeAction(1));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerWidth]);

  useEffect(() => {
    setComponentMounted({ componentMounted: true });
  }, []);

  // Handle input change

  const HandleChange = useCallback(
    (e) => {
      setSearchValue({
        searchValue: e.target.value,
      });
      if (e.target.value) {
        setSDstate({
          ShowSearchDrop,
          searchIsActive: true,
        });
      } else {
        setSDstate({
          ShowSearchDrop,
          searchIsActive: false,
        });
      }
    },
    [setSearchValue, setSDstate, ShowSearchDrop]
  );

  // Handle input Focus

  const handleInputFocus = useCallback(() => {
    setInputFocus({
      inputFocus: true,
    });
    if (innerWidth > 900) {
      // Preventing search dropdown from showing up
      // if the window innerWidth is less than 950px (to look responsive)
      setSDstate({
        searchIsActive,
        ShowSearchDrop: true,
      });
    } else if (ShowForm && innerWidth < 750) {
      setSDstate({
        searchIsActive,
        ShowSearchDrop: true,
      });
    }
  }, [ShowForm, searchIsActive, innerWidth]);

  // Handle closing search drop

  const HandleSearchDropClose = useCallback(
    (e) => {
      const SearchDrop = document.getElementById("rembtnsd");
      const SDrop = document.getElementById("sdrop");
      const PL = document.getElementById("plholder");

      const SearchD =
        SearchDrop !== null ? SearchDrop.isEqualNode(e.target) : false;
      const SD = SDrop !== null ? SDrop.isEqualNode(e.target) : false;
      const ETF =
        e.target.firstChild !== null
          ? e.target.firstChild.isEqualNode(PL)
          : false;

      if (!(SearchD || SD || ETF)) {
        setSDstate(
          {
            searchIsActive,
            ShowSearchDrop: false,
          },
          document.removeEventListener("click", HandleSearchDropClose)
        );
      }
    },
    [searchIsActive]
  );

  // Handle search dropdown and inputFocus

  const handleInputBlur = useCallback(() => {
    setInputFocus(
      {
        inputFocus: false,
      },
      document.addEventListener("click", HandleSearchDropClose)
    );
  }, [setInputFocus, HandleSearchDropClose]);

  // Handle suggesition when removed

  const RemoveHandleClick = useCallback(
    (id) => {
      setH_suggest([
        ...historicalSuggestions.map((sugg) => {
          if (sugg.id === id) {
            sugg.suggestion = "";
            sugg.removed = true;
          }
          return sugg;
        }),
      ]);
    },
    [historicalSuggestions]
  );

  //   Handle responsive From

  const HandleRespForm = (show) => {
    setShowForm({
      ShowForm: show,
    });
  };

  //  Handle show nav dropdowns

  const HandleSemiDrop = (value) => {
    if (
      !dropHandler.ShowCamDrop &&
      !dropHandler.ShowAppDrop &&
      !dropHandler.ShowBellDrop &&
      !dropHandler.ShowProfDrop
    ) {
      // Notification count remover
      if (NotiCount.seen && value === "ShowBellDrop") {
        dispatch(NotiCountAction());
      }

      setDropHandler(
        {
          ...dropHandler,
          [value]: !dropHandler[value],
        },
        document.addEventListener("click", HandleCloseDrop)
      );
    }
  };

  // Handle profile semiDrops

  const HandleGoBack = useCallback(() => {
    setDropHandler({
      ...dropHandler,
      ShowProfDrop: !dropHandler.ShowCamDrop,
    });
    setSemiDrop({
      SADrop: false,
      LangDrop: false,
      ThemeDrop: false,
      LocaDrop: false,
      RestrictDrop: false,
      APIKey: false,
    });

    // you should not put dropHandler in the useCallback dependencies array
    // because it will re-render semi-dropdowns
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HandleShowSemiDrop = useCallback((value) => {
    setDropHandler({
      ...dropHandler,
      ShowProfDrop: false,
    });
    setSemiDrop({
      ...semiDrop,
      [value]: true,
    });
    // you should not put dropHandler or semiDrop in the useCallback dependencies array
    // because it will re-render profile-drop if you click on another drop.
    // it is unnecessary
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  Handle close icons dropdown

  const ChangeIsInSemiDrop = () => {
    if (!isInSemiDrop) {
      isInSemiDrop = true;
    }
  };

  const HandleCloseDrop = useCallback(
    (e) => {
      isInSemiDrop = true;
      // --> Nav Drops
      const CamDrop = document.getElementById("cax");
      const AppDrop = document.getElementById("apx");
      const BellDrop = document.getElementById("bex");
      const ProfDrop = document.getElementById("prx");
      // --> Profile SemiDrops
      const ProfileDrop = document.getElementById("profile_drop");
      const SwitchAccDrop = document.getElementById("switch_acc_drop");
      const LangDrop = document.getElementById("lang_drop");
      const LocDrop = document.getElementById("loca_drop");
      const NotiDrop = document.getElementById("noti_drop");
      const RestrictModeDrop = document.getElementById("restrictmode_drop");
      const ApiKeyDrop = document.getElementById("apikey_drop");
      const ThemeDrop = document.getElementById("theme_drop");

      let target = e.target;

      // In case of undefined
      if (SwitchAccDrop) {
        SwitchAccDrop.addEventListener("click", ChangeIsInSemiDrop);
      }
      if (LangDrop) {
        LangDrop.addEventListener("click", ChangeIsInSemiDrop);
      }
      if (LocDrop) {
        LocDrop.addEventListener("click", ChangeIsInSemiDrop);
      }
      if (NotiDrop) {
        NotiDrop.addEventListener("click", ChangeIsInSemiDrop);
      }
      if (ThemeDrop) {
        ThemeDrop.addEventListener("click", ChangeIsInSemiDrop);
      }
      if (RestrictModeDrop) {
        RestrictModeDrop.addEventListener("click", ChangeIsInSemiDrop);
      }
      if (ApiKeyDrop) {
        ApiKeyDrop.addEventListener("click", ChangeIsInSemiDrop);
      }

      const PassIdTest =
        ProfileDrop &&
        SwitchAccDrop &&
        LangDrop &&
        LocDrop &&
        NotiDrop &&
        RestrictModeDrop &&
        ThemeDrop &&
        ApiKeyDrop;

      let PassContainsTest;

      if (PassIdTest) {
        PassContainsTest =
          !ProfileDrop.contains(target) &&
          !SwitchAccDrop.contains(target) &&
          !LangDrop.contains(target) &&
          !LocDrop.contains(target) &&
          !NotiDrop.contains(target) &&
          !RestrictModeDrop.contains(target) &&
          !ThemeDrop.contains(target) &&
          !ApiKeyDrop.contains(target);
      } else {
        PassContainsTest = null;
      }

      if (PassContainsTest) {
        // ---------------------------
        if (isInSemiDrop) {
          setSemiDrop(() => {
            return {
              SADrop: false,
              LangDrop: false,
              ThemeDrop: false,
              LocaDrop: false,
              RestrictDrop: false,
              APIKey: false,
            };
          });
          isInSemiDrop = false;
        }
        // ---------------------------
        if (CamDrop.contains(target)) {
          setDropHandler((currentState) => {
            if (currentState.ShowCamDrop) {
              document.removeEventListener("click", HandleCloseDrop);
            }
            return {
              ShowCamDrop: !currentState.ShowCamDrop,
              ShowAppDrop: false,
              ShowBellDrop: false,
              ShowProfDrop: false,
            };
          });
        } else if (AppDrop.contains(target)) {
          setDropHandler((currentState) => {
            if (currentState.ShowAppDrop) {
              document.removeEventListener("click", HandleCloseDrop);
            }
            return {
              ShowCamDrop: false,
              ShowAppDrop: !currentState.ShowAppDrop,
              ShowBellDrop: false,
              ShowProfDrop: false,
            };
          });
        } else if (BellDrop.contains(target)) {
          setDropHandler((currentState) => {
            if (currentState.ShowBellDrop) {
              document.removeEventListener("click", HandleCloseDrop);
            }
            return {
              ShowCamDrop: false,
              ShowAppDrop: false,
              ShowBellDrop: !currentState.ShowBellDrop,
              ShowProfDrop: false,
            };
          });
        } else if (ProfDrop.contains(target)) {
          setDropHandler((currentState) => {
            if (currentState.ShowProfDrop) {
              document.removeEventListener("click", HandleCloseDrop);
            }
            return {
              ShowCamDrop: false,
              ShowAppDrop: false,
              ShowBellDrop: false,
              ShowProfDrop: !currentState.ShowProfDrop,
            };
          });
        } else {
          setDropHandler(
            {
              ShowCamDrop: false,
              ShowAppDrop: false,
              ShowBellDrop: false,
              ShowProfDrop: false,
            },
            document.removeEventListener("click", HandleCloseDrop)
          );
        }
      }
    },
    [setDropHandler, setSemiDrop]
  );

  // Preventing show dropdowns on Enter keypress
  const HandlekeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <nav className={styles.container}>
      {/* Helmet */}
      <Head>
        <link
          rel="preload"
          href="/static/media/Roboto-Regular.ttf"
          as="font"
          crossorigin=""
        />
        <link
          rel="preload"
          href="/static/media/Roboto-Medium.ttf"
          as="font"
          crossorigin=""
        />
        <link
          rel="preload"
          href="/static/media/Oswald-SemiBold.ttf"
          as="font"
          crossorigin=""
        />
        <title>
          {NotiCount.seen
            ? `(${NotiCount.count}) YouTube-Clone`
            : "YouTube-Clone"}
        </title>
      </Head>
      {/* NavBar */}
      {!ShowForm ? (
        <Fragment>
          {/* --- Logo Area --- */}
          <div className={styles.left_container}>
            <div
              onClick={() => {
                dispatch(ToggleGuideAction());
              }}
              className={styles.menu_wrap}
            >
              <RippleButton onclick={() => {}} classname={styles.btnpad}>
                <MenuSvg Theme={Theme} />
              </RippleButton>
            </div>
            <div title="YouTube Home" className={styles.logo_container}>
              <Link to="/">
                <img
                  src={YoutubeLogo}
                  alt="Youtube-Clone"
                  width="26px"
                  className={styles.ytp_logo}
                />
              </Link>
              <Link to="/">
                <div className={styles.logo_text}>YouTube</div>
              </Link>
              <div className={styles.logo_pointer}>clone</div>
            </div>
          </div>
          {/* --- Form Area --- */}
          {innerWidth > 700 ? (
            <YTForm
              setSDstate={setSDstate}
              ShowSearchDrop={ShowSearchDrop}
              HandleChange={HandleChange}
              suggestions={suggestions}
              historicalSuggestions={historicalSuggestions}
              searchIsActive={searchIsActive}
              RemoveHandleClick={RemoveHandleClick}
              HandleSelect={HandleSelect}
              HandleSubmit={HandleSubmit}
              searchValue={searchValue}
              inputFocus={inputFocus}
              handleInputFocus={handleInputFocus}
              handleInputBlur={handleInputBlur}
              Theme={Theme}
            />
          ) : (
            componentMounted && (
              <button
                onClick={() => HandleRespForm(true)}
                className={styles.responsive_form}
              >
                <ReSearchSvg Theme={Theme} />
              </button>
            )
          )}
          {/* --- Dropdowns Area --- */}
          <div className={styles.right_container}>
            <div
              onKeyPress={HandlekeyPress}
              onClick={() => HandleSemiDrop("ShowCamDrop")}
              className={styles.icons_container}
            >
              <RippleButton onclick={() => {}} classname={styles.btnpad}>
                <CamSvg Theme={Theme} />
              </RippleButton>

              <CamDrop show={dropHandler.ShowCamDrop} />
            </div>

            <div
              onKeyPress={HandlekeyPress}
              onClick={() => HandleSemiDrop("ShowAppDrop")}
              className={styles.icons_container}
            >
              <RippleButton onclick={() => {}} classname={styles.btnpad}>
                <AppSvg Theme={Theme} />
              </RippleButton>

              <AppDrop show={dropHandler.ShowAppDrop} />
            </div>

            <div
              onKeyPress={HandlekeyPress}
              onClick={() => HandleSemiDrop("ShowBellDrop")}
              className={styles.icons_container}
            >
              <div
                style={{ display: NotiCount.seen ? "" : "none" }}
                className={styles.noti_count}
              >
                {NotiCount.count}
              </div>
              <RippleButton onclick={() => {}} classname={styles.btnpad}>
                <BellSvg Theme={Theme} />
              </RippleButton>

              <Notification show={dropHandler.ShowBellDrop} />
            </div>
            <div className={styles.profile_container}>
              <button
                onKeyPress={HandlekeyPress}
                onClick={() => HandleSemiDrop("ShowProfDrop")}
                className={styles.profile_btn}
              >
                <ProfileImg
                  width={"32"}
                  height={"32"}
                  src={IsCurrentAccount.img}
                  id={"prx"}
                  alt={""}
                  classname={styles.pronail}
                />
              </button>

              <ProfileDrop
                handleShowSemiDrop={HandleShowSemiDrop}
                show={dropHandler.ShowProfDrop}
              />

              <APiMessageBox />

              <SADrop handleGoBackDrop={HandleGoBack} show={semiDrop.SADrop} />

              <LangDrop
                handleGoBackDrop={HandleGoBack}
                show={semiDrop.LangDrop}
              />

              <ThemeDrop
                handleGoBackDrop={HandleGoBack}
                show={semiDrop.ThemeDrop}
              />

              <APIKeyDrop
                handleGoBackDrop={HandleGoBack}
                show={semiDrop.APIKey}
              />

              <RestrictDrop
                handleGoBackDrop={HandleGoBack}
                show={semiDrop.RestrictDrop}
              />

              <LocaDrop
                handleGoBackDrop={HandleGoBack}
                show={semiDrop.LocaDrop}
              />
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <button onClick={() => HandleRespForm(false)}>
            <BackArrowSvg />
          </button>
          <YTForm
            setSDstate={setSDstate}
            ShowSearchDrop={ShowSearchDrop}
            HandleChange={HandleChange}
            suggestions={suggestions}
            historicalSuggestions={historicalSuggestions}
            searchIsActive={searchIsActive}
            RemoveHandleClick={RemoveHandleClick}
            HandleSelect={HandleSelect}
            HandleSubmit={HandleSubmit}
            searchValue={searchValue}
            inputFocus={inputFocus}
            handleInputFocus={handleInputFocus}
            handleInputBlur={handleInputBlur}
            Theme={Theme}
          />
        </Fragment>
      )}
    </nav>
  );
};

export default memo(NavBar);
