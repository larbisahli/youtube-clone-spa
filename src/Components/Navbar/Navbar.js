import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useContext
} from "react";
import "./Navbar.scss";
import YoutubeLogo from "../../Images/Youtube_icon.svg";
import { Link } from "react-router-dom";
import {
  CamIcon,
  MenuIcon,
  Bell,
  AppIcon,
  SearchIcon,
  ReSearchIcon,
  BackArrow
} from "./NavComponents/Icons";
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
  RestrictDrop
} from "./NavComponents/DropDownComponents";
import { NavContext } from "../../Context/NavContext";
import { ThemeContext } from "../../Context/ThemeContext";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
//import { DataApis } from "../api/YoutubeApi";

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
    setSDstate
  }) => {
    const HandlekeyPress = event => {
      if (event.key === "Enter") {
        if (ShowSearchDrop) {
          setSDstate(pre => {
            return {
              searchIsActive: pre.searchIsActive,
              ShowSearchDrop: false
            };
          });
        }
      }
    };

    return (
      <div className="searchContainer">
        <form className="form_container" onSubmit={HandleSubmit}>
          <div className="form_wrapper">
            <div
              className={`input_wrapper ${
                Theme ? "input_wrapper-dark" : "input_wrapper-light"
              } ${inputFocus ? "focus" : ""}`}
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
              className={`btn_container titleS btn_container-${
                Theme ? "dark" : "light"
              }`}
            >
              <SearchIcon Theme={Theme} />
            </button>
          </div>
        </form>
      </div>
    );
  }
);

// Global variable for semiDrops
let isInSemiDrop = false;

const Navbar = React.memo(({ HandleShowGuide }) => {
  // ==> Context
  const { accountState, notiCountState } = useContext(NavContext);
  const [acc] = accountState;
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;
  const IsCurrentAccount = useCallback(acc.filter(acc => acc.isCurrent)[0], [
    acc
  ]);

  const [NotiCount, setNotiCount] = notiCountState;

  // ==> Input focus state
  const [{ inputFocus }, setInputFocus] = useState({ inputFocus: false });

  // ==> Input suggestions state
  // you use can setSuggestions here if you have the api for autocomplete. (~˘▾˘)~
  const [suggestions] = useState([
    { suggestion: "Traversy Media", id: 1 },
    { suggestion: "ed dev", id: 2 },
    { suggestion: "freecodecamp", id: 3 },
    { suggestion: "him tears On tape", id: 4 },
    { suggestion: "metallica unforgiven", id: 5 }
  ]);

  // ==> Historical Suggestions state
  const [historicalSuggestions, setH_suggest] = useState([
    { suggestion: "Alter Bridge", removed: false, id: 1 },
    { suggestion: "learn react js", removed: false, id: 2 },
    { suggestion: "freecodecamp", removed: false, id: 3 },
    { suggestion: "in flames", removed: false, id: 4 },
    { suggestion: "python tutorial", removed: false, id: 5 }
  ]);

  // ==> Search drop state
  const [{ ShowSearchDrop, searchIsActive }, setSDstate] = useState({
    ShowSearchDrop: false,
    searchIsActive: false
  });

  // ==> Navbar responsive state
  const [{ isResponsive }, setIsResponsive] = useState({
    isResponsive: false
  });

  // ==> Drops state
  const [dropHandler, setDropHandler] = useState({
    ShowCamDrop: false,
    ShowAppDrop: false,
    ShowBellDrop: false,
    ShowProfDrop: false
  });

  // ==> SemiDrops state (Drops that inside profile drop)
  const [semiDrop, setSemiDrop] = useState({
    SADrop: false,
    LangDrop: false,
    ThemeDrop: false,
    LocaDrop: false,
    RestrictDrop: false
  });

  // ==> Check if th nav component is mounted
  const [{ componentMounted }, setComponentMounted] = useState({
    componentMounted: false
  });

  // ==> Search Value State
  const [{ searchValue }, setSearchValue] = useState({
    searchValue: ""
  });

  let history = useHistory();

  // ==========================
  //       Handle Submit
  // ==========================

  const HandleSubmit = useCallback(
    event => {
      event.preventDefault();

      if (searchValue !== "") {
        history.push(`/results/search=${searchValue}`);
      }
    },
    [history, searchValue]
  );

  // ==========================
  //       Handle Select
  // ==========================

  const HandleSelect = useCallback(
    select => {
      if (select !== "") {
        history.push(`/results/search=${select}`);
      }
    },
    [history]
  );

  // ================================================
  // Custom Hook to handle the window current width
  // ================================================

  const useMeasure = () => {
    const [{ innerWidth }, setInnerWidth] = useState({ innerWidth: 0 });

    const updateWindowDimensions = () => {
      setInnerWidth({ innerWidth: window.innerWidth });

      // Hide search drop when the window width is less than 890
      if (window.innerWidth < 890) {
        setSDstate({
          searchIsActive,
          ShowSearchDrop: false
        });
      }

      if (window.innerWidth > 750 && isResponsive) {
        setIsResponsive({
          isResponsive: false
        });
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
    e => {
      setSearchValue({
        searchValue: e.target.value
      });
      if (e.target.value) {
        setSDstate({
          ShowSearchDrop,
          searchIsActive: true
        });
      } else {
        setSDstate({
          ShowSearchDrop,
          searchIsActive: false
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
      inputFocus: true
    });
    if (window.innerWidth > 900) {
      // Preventing the search dropdown from showing up
      // if window innerWidth is less than 950 (to look responsive)
      setSDstate({
        searchIsActive,
        ShowSearchDrop: true
      });
    } else if (isResponsive && window.innerWidth < 750) {
      setSDstate({
        searchIsActive,
        ShowSearchDrop: true
      });
    }
  }, [isResponsive, searchIsActive]);

  // =====================================
  // Handle search dropdown and inputFocus
  // =====================================

  const handleInputBlur = useCallback(() => {
    setInputFocus(
      {
        inputFocus: false
      },
      document.addEventListener("click", HandleSearchDropClose)
    );
  }, [setInputFocus]);

  // ==========================
  // Handle closing search drop
  // ==========================

  const HandleSearchDropClose = e => {
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
          ShowSearchDrop: false
        },
        document.removeEventListener("click", HandleSearchDropClose)
      );
    }
  };

  // ================================
  // Handle suggesition when removed
  // ================================

  const RemoveHandleClick = useCallback(
    id => {
      setH_suggest([
        ...historicalSuggestions.map(sugg => {
          if (sugg.id === id) {
            sugg.suggestion = "";
            sugg.removed = true;
          }
          return sugg;
        })
      ]);
    },
    [historicalSuggestions]
  );

  // ============================
  //   Handle responsive From on
  // ============================

  const HandleRespOn = e => {
    setIsResponsive({
      isResponsive: true
    });
  };

  // ============================
  //  Handle responsive Form off
  // ============================

  const HandleRespOff = e => {
    setIsResponsive({
      isResponsive: false
    });
  };

  // ==========================
  // Handle show icon dropdowns
  // ==========================

  // ==> Cam logo
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
          ShowCamDrop: !dropHandler.ShowCamDrop
        },
        document.addEventListener("click", DropHandlerClose)
      );
    }
  };

  // ==> App logo
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
          ShowAppDrop: !dropHandler.ShowAppDrop
        },
        document.addEventListener("click", DropHandlerClose)
      );
    }
  };

  // ==> Bell logo
  const HandleBellDrop = () => {
    if (
      !dropHandler.ShowCamDrop &&
      !dropHandler.ShowAppDrop &&
      !dropHandler.ShowBellDrop &&
      !dropHandler.ShowProfDrop
    ) {
      setNotiCount(prev => ({ notiCount: prev.notiCount, seen: false }));
      setDropHandler(
        {
          ...dropHandler,
          ShowBellDrop: !dropHandler.ShowBellDrop
        },
        document.addEventListener("click", DropHandlerClose)
      );
    }
  };

  // ==> Profile
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
          ShowProfDrop: !dropHandler.ShowProfDrop
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
      ShowProfDrop: !dropHandler.ShowCamDrop
    });
    setSemiDrop({
      SADrop: false,
      LangDrop: false,
      ThemeDrop: false,
      LocaDrop: false,
      RestrictDrop: false
    });
  }, [setSemiDrop, dropHandler]);

  const HandleShowSemiDrop = useCallback(
    value => {
      //console.log("HandleShowSemiDrop :=>", value);
      setDropHandler({
        ...dropHandler,
        ShowProfDrop: false
      });
      setSemiDrop({
        ...semiDrop,
        [value]: true
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
    e => {
      isInSemiDrop = true;
      // ----------------------------- Drops
      const CamDrop = document.getElementById("cax");
      const AppDrop = document.getElementById("apx");
      const BellDrop = document.getElementById("bex");
      const ProfDrop = document.getElementById("prx");
      // ----------------------------- SemiDrops
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
              RestrictDrop: false
            };
          });
          isInSemiDrop = false;
        }
        // ---------------------------
        if (CamDrop.contains(target)) {
          setDropHandler(currentState => {
            if (currentState.ShowCamDrop) {
              document.removeEventListener("click", DropHandlerClose);
            }
            return {
              ShowCamDrop: !currentState.ShowCamDrop,
              ShowAppDrop: false,
              ShowBellDrop: false,
              ShowProfDrop: false
            };
          });
        } else if (AppDrop.contains(target)) {
          setDropHandler(currentState => {
            if (currentState.ShowAppDrop) {
              document.removeEventListener("click", DropHandlerClose);
            }
            return {
              ShowCamDrop: false,
              ShowAppDrop: !currentState.ShowAppDrop,
              ShowBellDrop: false,
              ShowProfDrop: false
            };
          });
        } else if (BellDrop.contains(target)) {
          setDropHandler(currentState => {
            if (currentState.ShowBellDrop) {
              document.removeEventListener("click", DropHandlerClose);
            }
            return {
              ShowCamDrop: false,
              ShowAppDrop: false,
              ShowBellDrop: !currentState.ShowBellDrop,
              ShowProfDrop: false
            };
          });
        } else if (ProfDrop.contains(target)) {
          setDropHandler(currentState => {
            if (currentState.ShowProfDrop) {
              document.removeEventListener("click", DropHandlerClose);
            }
            return {
              ShowCamDrop: false,
              ShowAppDrop: false,
              ShowBellDrop: false,
              ShowProfDrop: !currentState.ShowProfDrop
            };
          });
        } else {
          setDropHandler(
            {
              ShowCamDrop: false,
              ShowAppDrop: false,
              ShowBellDrop: false,
              ShowProfDrop: false
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

  const HandlekeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  // --------------------------------------------
  return (
    <div className={`NavContainer NavContainer-${Theme ? "dark" : "light"}`}>
      {/* Helmet */}
      <Helmet>
        <title>
          {NotiCount.seen
            ? `(${NotiCount.notiCount}) YouTube-Clone`
            : "YouTube-Clone"}
        </title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {/* NavBar */}
      {!isResponsive ? (
        <Fragment>
          <div className="LeftContainer">
            <div onClick={HandleShowGuide} className="menuIcon">
              <MenuIcon />
            </div>
            <div title="YouTube Home" className="LogoContainer">
              <Link to="/">
                <img
                  src={YoutubeLogo}
                  alt="Youtube-Clone"
                  className="applogo"
                />
              </Link>
              <Link to="/">
                <div
                  className={`LogoText LogoText-${Theme ? "dark" : "light"}`}
                >
                  YouTube
                </div>
              </Link>
              <div className="pointer">CLONE</div>
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
              <button onClick={HandleRespOn} className="responsive_search_icon">
                <ReSearchIcon />
              </button>
            )
          )}

          <div className="RightContainer">
            <div
              onKeyPress={HandlekeyPress}
              onClick={HandleCamDrop}
              className="icons_container"
            >
              <CamIcon />
              <div style={{ display: dropHandler.ShowCamDrop ? "" : "none" }}>
                <CamDrop />
              </div>
            </div>
            <div
              onKeyPress={HandlekeyPress}
              onClick={HandleAppDrop}
              className="icons_container"
            >
              <AppIcon />
              <div
                style={{ display: dropHandler.ShowAppDrop ? "" : "none" }}
                className="drop"
              >
                <AppDrop />
              </div>
            </div>
            <div
              onKeyPress={HandlekeyPress}
              onClick={HandleBellDrop}
              className="icons_container"
            >
              <Bell />
              <div
                style={{ display: NotiCount.seen ? "" : "none" }}
                className={`noti_count noti_count-${Theme ? "dark" : "light"}`}
              >
                {NotiCount.notiCount}
              </div>
              {/*???*/}
              <div style={{ display: dropHandler.ShowBellDrop ? "" : "none" }}>
                <Notification show={dropHandler.ShowBellDrop} />
              </div>
            </div>
            <div className="profile_container">
              <button
                onKeyPress={HandlekeyPress}
                onClick={HandleProfDrop}
                className="prof_btn"
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
              <div style={{ display: dropHandler.ShowProfDrop ? "" : "none" }}>
                <ProfileDrop
                  handleGoBackDrop={HandleGoBack}
                  handleShowSemiDrop={HandleShowSemiDrop}
                />
              </div>
              <div style={{ display: semiDrop.SADrop ? "" : "none" }}>
                <SADrop handleGoBackDrop={HandleGoBack} />
              </div>
              <div style={{ display: semiDrop.LangDrop ? "" : "none" }}>
                <LangDrop handleGoBackDrop={HandleGoBack} />
              </div>
              <div style={{ display: semiDrop.ThemeDrop ? "" : "none" }}>
                <ThemeDrop handleGoBackDrop={HandleGoBack} />
              </div>
              <div style={{ display: semiDrop.RestrictDrop ? "" : "none" }}>
                <RestrictDrop handleGoBackDrop={HandleGoBack} />
              </div>
              <div style={{ display: semiDrop.LocaDrop ? "" : "none" }}>
                <LocaDrop handleGoBackDrop={HandleGoBack} />
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <button onClick={HandleRespOff}>
            <BackArrow />
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
    </div>
  );
});

export default Navbar;
