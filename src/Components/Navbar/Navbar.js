import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useContext,
} from "react";
import "./navbar_style.scss";
import YoutubeLogo from "../../Images/Youtube_icon.svg";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  CamSvg,
  MenuSvg,
  BellSvg,
  AppSvg,
  SearchSvg,
  ReSearchSvg,
  BackArrowSvg,
} from "./NavComponents/Svg";
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
} from "./NavComponents/DropDownComponents";
import { NavContext, ThemeContext, GuideContext } from "../../Context";
import { ReturnTheme } from "../../utils";

const From = React.memo(
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
      <div className="navigation_bar__search_container">
        <form className="form_container" onSubmit={HandleSubmit}>
          <div className="form_wrapper">
            <div
              className={`input_wrapper input_wrapper--${ReturnTheme(Theme)} ${
                inputFocus ? "focus" : ""
              }`}
            >
              <input
                className="search_input"
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
            <button
              className={`btn_container titleS titleS--${ReturnTheme(
                Theme
              )} btn_container--${ReturnTheme(Theme)}`}
            >
              <SearchSvg Theme={Theme} />
            </button>
          </div>
        </form>
      </div>
    );
  }
);

// Global variable for semiDrops
let isInSemiDrop = false;

const Navbar = React.memo(() => {
  // ==> Context
  const { accountState, notiCountState } = useContext(NavContext);
  const [acc] = accountState;
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;
  const IsCurrentAccount = useCallback(acc.filter((acc) => acc.isCurrent)[0], [
    acc,
  ]);

  const [NotiCount, setNotiCount] = notiCountState;

  // ==> Input focus state
  const [{ inputFocus }, setInputFocus] = useState({ inputFocus: false });

  // FAKE SUGGESTIONS
  // ==> Input suggestions state
  // you can use setSuggestions here if you have the api for autocomplete. (~˘▾˘)~
  const [suggestions] = useState([
    { suggestion: "Traversy Media", id: 1 },
    { suggestion: "ed dev", id: 2 },
    { suggestion: "freecodecamp", id: 3 },
    { suggestion: "him tears On tape", id: 4 },
    { suggestion: "metallica unforgiven", id: 5 },
  ]);

  // ==> Historical Suggestions state
  const [historicalSuggestions, setH_suggest] = useState([
    { suggestion: "Alter Bridge", removed: false, id: 1 },
    { suggestion: "learn react js", removed: false, id: 2 },
    { suggestion: "freecodecamp", removed: false, id: 3 },
    { suggestion: "in flames", removed: false, id: 4 },
    { suggestion: "python tutorial", removed: false, id: 5 },
  ]);

  // ==> Search drop state
  const [{ ShowSearchDrop, searchIsActive }, setSDstate] = useState({
    ShowSearchDrop: false,
    searchIsActive: false,
  });

  // ==> Navbar responsive state
  const [{ isResponsive }, setIsResponsive] = useState({
    isResponsive: false,
  });

  // ==> Drops state
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
  });

  // ==> Check if th nav component is mounted
  const [{ componentMounted }, setComponentMounted] = useState({
    componentMounted: false,
  });

  // ==> Search Value State
  const [{ searchValue }, setSearchValue] = useState({
    searchValue: "",
  });

  // Guide Context
  const [ShowGuide, HundleShowGuide] = useContext(GuideContext);

  let history = useHistory();

  // ==========================
  //       Handle Submit
  // ==========================

  const HandleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (searchValue !== "") {
        history.push(`/results?search_query=${searchValue}`);
      }
    },
    [history, searchValue]
  );

  // ==========================
  //       Handle Select
  // ==========================

  const HandleSelect = useCallback(
    (select) => {
      if (select !== "") {
        history.push(`/results?search_query=${select}`);
      }
    },
    [history]
  );

  // ================================================
  //  Custom Hook to handle the window current width
  // ================================================

  const useMeasure = () => {
    const [{ innerWidth }, setInnerWidth] = useState({ innerWidth: 0 });

    const updateWindowDimensions = () => {
      setInnerWidth({ innerWidth: window.innerWidth });

      // Hide search drop when the window width is less than 890
      if (window.innerWidth < 890) {
        setSDstate({
          searchIsActive,
          ShowSearchDrop: false,
        });
      }

      if (window.innerWidth > 750 && isResponsive) {
        setIsResponsive({
          isResponsive: false,
        });
      }

      // for guide

      if (window.innerWidth > 810) {
        HundleShowGuide(true, false);
      }

      if (window.innerWidth < 810) {
        HundleShowGuide(false);
      }
    };

    useEffect(() => {
      updateWindowDimensions();
      window.addEventListener("resize", updateWindowDimensions);
      return () => {
        window.removeEventListener("resize", updateWindowDimensions);
      };
    }, [innerWidth]);

    return [innerWidth];
  };

  /* 
      window.innerWidth update rate is slower than useState in some cases
      if you try to resize the window fast enough react will not re-render 
      because of the slow update.
  */

  const innerWidth = useMeasure();

  useEffect(() => {
    setComponentMounted({ componentMounted: true });
  }, []);

  // ==========================
  //    Handle input change
  // ==========================

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

  // ==========================
  //    Handle input Focus
  // ==========================

  const handleInputFocus = useCallback(() => {
    setInputFocus({
      inputFocus: true,
    });
    if (window.innerWidth > 900) {
      // Preventing search dropdown from showing up
      // if the window innerWidth is less than 950px (to look responsive)
      setSDstate({
        searchIsActive,
        ShowSearchDrop: true,
      });
    } else if (isResponsive && window.innerWidth < 750) {
      setSDstate({
        searchIsActive,
        ShowSearchDrop: true,
      });
    }
  }, [isResponsive, searchIsActive]);

  // ==========================
  // Handle closing search drop
  // ==========================

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

  // =====================================
  // Handle search dropdown and inputFocus
  // =====================================

  const handleInputBlur = useCallback(() => {
    setInputFocus(
      {
        inputFocus: false,
      },
      document.addEventListener("click", HandleSearchDropClose)
    );
  }, [setInputFocus, HandleSearchDropClose]);

  // ================================
  // Handle suggesition when removed
  // ================================

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

  // ============================
  //  Handle responsive From on
  // ============================

  const HandleRespOn = (e) => {
    setIsResponsive({
      isResponsive: true,
    });
  };

  // ============================
  //  Handle responsive Form off
  // ============================

  const HandleRespOff = (e) => {
    setIsResponsive({
      isResponsive: false,
    });
  };

  // ============================
  //  Handle show nav dropdowns
  // ============================

  // ==> Cam Svg
  const HandleCamDrop = () => {
    if (
      !dropHandler.ShowCamDrop &&
      !dropHandler.ShowAppDrop &&
      !dropHandler.ShowBellDrop &&
      !dropHandler.ShowProfDrop
    ) {
      setDropHandler(
        {
          ...dropHandler,
          ShowCamDrop: !dropHandler.ShowCamDrop,
        },
        document.addEventListener("click", DropHandlerClose)
      );
    }
  };

  // ==> App Svg
  const HandleAppDrop = () => {
    if (
      !dropHandler.ShowCamDrop &&
      !dropHandler.ShowAppDrop &&
      !dropHandler.ShowBellDrop &&
      !dropHandler.ShowProfDrop
    ) {
      setDropHandler(
        {
          ...dropHandler,
          ShowAppDrop: !dropHandler.ShowAppDrop,
        },
        document.addEventListener("click", DropHandlerClose)
      );
    }
  };

  // ==> Bell Svg
  const HandleBellDrop = () => {
    if (
      !dropHandler.ShowCamDrop &&
      !dropHandler.ShowAppDrop &&
      !dropHandler.ShowBellDrop &&
      !dropHandler.ShowProfDrop
    ) {
      setNotiCount((prev) => ({ notiCount: prev.notiCount, seen: false }));
      setDropHandler(
        {
          ...dropHandler,
          ShowBellDrop: !dropHandler.ShowBellDrop,
        },
        document.addEventListener("click", DropHandlerClose)
      );
    }
  };

  // ==> Nav profile drop
  const HandleProfDrop = () => {
    if (
      !dropHandler.ShowCamDrop &&
      !dropHandler.ShowAppDrop &&
      !dropHandler.ShowBellDrop &&
      !dropHandler.ShowProfDrop
    ) {
      setDropHandler(
        {
          ...dropHandler,
          ShowProfDrop: !dropHandler.ShowProfDrop,
        },
        document.addEventListener("click", DropHandlerClose)
      );
    }
  };

  // ===============================
  //    Handle profile semiDrops
  // ===============================

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
    });
  }, [setSemiDrop, dropHandler]);

  const HandleShowSemiDrop = useCallback(
    (value) => {
      setDropHandler({
        ...dropHandler,
        ShowProfDrop: false,
      });
      setSemiDrop({
        ...semiDrop,
        [value]: true,
      });
    },
    [semiDrop, dropHandler]
  );

  // =============================
  //  Handle close icons dropdown
  // =============================

  const ChangeIsInSemiDrop = () => {
    if (!isInSemiDrop) {
      isInSemiDrop = true;
    }
  };

  const DropHandlerClose = useCallback(
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
      const ThemeDrop = document.getElementById("theme_drop");

      let target = e.target;

      SwitchAccDrop.addEventListener("click", ChangeIsInSemiDrop);
      LangDrop.addEventListener("click", ChangeIsInSemiDrop);
      LocDrop.addEventListener("click", ChangeIsInSemiDrop);
      NotiDrop.addEventListener("click", ChangeIsInSemiDrop);
      ThemeDrop.addEventListener("click", ChangeIsInSemiDrop);
      RestrictModeDrop.addEventListener("click", ChangeIsInSemiDrop);

      if (
        !ProfileDrop.contains(target) &&
        !SwitchAccDrop.contains(target) &&
        !LangDrop.contains(target) &&
        !LocDrop.contains(target) &&
        !NotiDrop.contains(target) &&
        !RestrictModeDrop.contains(target) &&
        !ThemeDrop.contains(target)
      ) {
        if (isInSemiDrop) {
          setSemiDrop(() => {
            return {
              SADrop: false,
              LangDrop: false,
              ThemeDrop: false,
              LocaDrop: false,
              RestrictDrop: false,
            };
          });
          isInSemiDrop = false;
        }
        // ---------------------------
        if (CamDrop.contains(target)) {
          setDropHandler((currentState) => {
            if (currentState.ShowCamDrop) {
              document.removeEventListener("click", DropHandlerClose);
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
              document.removeEventListener("click", DropHandlerClose);
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
              document.removeEventListener("click", DropHandlerClose);
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
              document.removeEventListener("click", DropHandlerClose);
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
            document.removeEventListener("click", DropHandlerClose)
          );
        }
      }
    },
    [setDropHandler, setSemiDrop]
  );

  // ============================================
  // Preventing show dropdowns on Enter keypress
  // ============================================

  const HandlekeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <nav className={`navigation_bar navigation_bar--${ReturnTheme(Theme)}`}>
      {/* Helmet */}
      <Helmet>
        <title>
          {NotiCount.seen
            ? `(${NotiCount.notiCount}) YouTube-Clone`
            : "YouTube-Clone"}
        </title>
        <meta
          name="youtube clone home page most popular videos"
          content="Helmet application"
        />
      </Helmet>
      {/* NavBar */}
      {!isResponsive ? (
        <Fragment>
          <div className="navigation_bar__left_container">
            <div
              onClick={() => {
                HundleShowGuide(!ShowGuide);
              }}
              className="navigation_bar__menu_wrap"
            >
              <MenuSvg />
            </div>
            <div
              title="YouTube Home"
              className="navigation_bar__logo_container"
            >
              <Link to="/">
                <img
                  src={YoutubeLogo}
                  alt="Youtube-Clone"
                  className="ytp_logo_svg"
                />
              </Link>
              <Link to="/">
                <div
                  className={`ytp_logo_text ytp_logo_text--${ReturnTheme(
                    Theme
                  )}`}
                >
                  YouTube
                </div>
              </Link>
              <div
                className={`ytp_logo_pointer ytp_logo_pointer--${ReturnTheme(
                  Theme
                )}`}
              >
                CLONE
              </div>
            </div>
          </div>
          {innerWidth > 700 ? (
            <From
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
                onClick={HandleRespOn}
                className="navigation_bar__responsive_form"
              >
                <ReSearchSvg />
              </button>
            )
          )}

          <div className="navigation_bar__right_container">
            <div
              onKeyPress={HandlekeyPress}
              onClick={HandleCamDrop}
              className="navigation_bar__icons_container"
            >
              <CamSvg />
              <CamDrop show={dropHandler.ShowCamDrop} />
            </div>
            <div
              onKeyPress={HandlekeyPress}
              onClick={HandleAppDrop}
              className="navigation_bar__icons_container"
            >
              <AppSvg />
              <AppDrop show={dropHandler.ShowAppDrop} />
            </div>
            <div
              onKeyPress={HandlekeyPress}
              onClick={HandleBellDrop}
              className="navigation_bar__icons_container"
            >
              <BellSvg />
              <div
                style={{ display: NotiCount.seen ? "" : "none" }}
                className={`navigation_bar__noti_count navigation_bar__noti_count--${ReturnTheme(
                  Theme
                )}`}
              >
                {NotiCount.notiCount}
              </div>
              <Notification show={dropHandler.ShowBellDrop} />
            </div>
            <div className="navigation_bar__profile_container">
              <button
                onKeyPress={HandlekeyPress}
                onClick={HandleProfDrop}
                className="profile_btn"
              >
                <img
                  id="prx"
                  className="profile_img"
                  src={IsCurrentAccount.img}
                  height="32"
                  width="32"
                  alt="Avatar"
                />
              </button>

              <ProfileDrop
                handleGoBackDrop={HandleGoBack}
                handleShowSemiDrop={HandleShowSemiDrop}
                show={dropHandler.ShowProfDrop}
              />

              <SADrop handleGoBackDrop={HandleGoBack} show={semiDrop.SADrop} />

              <LangDrop
                handleGoBackDrop={HandleGoBack}
                show={semiDrop.LangDrop}
              />

              <ThemeDrop
                handleGoBackDrop={HandleGoBack}
                show={semiDrop.ThemeDrop}
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
          <button onClick={HandleRespOff}>
            <BackArrowSvg />
          </button>
          <From
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
});

export default Navbar;
