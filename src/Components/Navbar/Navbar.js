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
    Theme
  }) => {
    return (
      <div className="searchContainer">
        <form className="form_container" onSubmit={HandleSubmit}>
          <div className="form_wrapper">
            <div
              className={
                "input_wrapper" +
                (inputFocus ? " focus" : "") +
                (Theme ? " input_wrapper-dark" : " input_wrapper-light")
              }
            >
              <input
                className="input_"
                type="text"
                name="search"
                value={searchValue}
                onChange={HandleChange}
                placeholder="Search"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
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
              className={
                "btn_container" +
                (Theme ? " btn_container-dark" : " btn_container-light")
              }
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

const Navbar = React.memo(
  ({ searchValue, setSearchValue, HandleSelect, HandleSubmit }) => {
    // Context
    const { accountState } = useContext(NavContext);
    const [acc] = accountState;

    const [YtTheme] = useContext(ThemeContext);
    const Theme = YtTheme.isDarkTheme;

    const IsCurrentAccount = useCallback(acc.filter(acc => acc.isCurrent)[0], [
      acc
    ]);

    // input focus state
    const [{ inputFocus }, setInputFocus] = useState({ inputFocus: false });

    // you can setSuggestions here if you have the api for autocomplete. (~˘▾˘)~
    const [suggestions] = useState([
      { suggestion: "travis media", id: 1 },
      { suggestion: "ed dev", id: 2 },
      { suggestion: "freecodecamp", id: 3 },
      { suggestion: "him tears On tape", id: 4 },
      { suggestion: "metallica unforgiven", id: 5 }
    ]);

    // historical Suggestions state
    const [historicalSuggestions, setH_suggest] = useState([
      { suggestion: "Alter Bridge", removed: false, id: 1 },
      { suggestion: "learn react js", removed: false, id: 2 },
      { suggestion: "freecodecamp", removed: false, id: 3 },
      {
        suggestion: "in flames full album",
        removed: false,
        id: 4
      },
      { suggestion: "python tutorial", removed: false, id: 5 }
    ]);

    // search drop state
    const [{ ShowSearchDrop, searchIsActive }, setSDstate] = useState({
      ShowSearchDrop: false,
      searchIsActive: false
    });

    // navbar responsive state
    const [{ isResponsive }, setIsResponsive] = useState({
      isResponsive: false
    });

    //const isCurrent = useRef(true);

    // drop state
    const [dropHandler, setDropHandler] = useState({
      ShowCamDrop: false,
      ShowAppDrop: false,
      ShowBellDrop: false,
      ShowProfDrop: false
    });

    const [semiDrop, setSemiDrop] = useState({
      SADrop: false,
      LangDrop: false,
      ThemeDrop: false,
      LocaDrop: false,
      RestrictDrop: false
    });

    // check if a component is mounted
    const [{ componentMounted }, setComponentMounted] = useState({
      componentMounted: false
    });

    // ================================================
    // Custom Hook to handle the window current width
    // ================================================

    const useMeasure = () => {
      const [{ innerWidth }, setInnerWidth] = useState({ innerWidth: 0 });

      const updateWindowDimensions = () => {
        setInnerWidth({ innerWidth: window.innerWidth });

        // hide search drop when the window width is less than 890
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

    // window.innerWidth update rate is slower than useState in some cases
    // if you resize the window fast enough react will not re-render because of the slow update.

    const innerWidth = useMeasure();

    useEffect(() => {
      setComponentMounted({ componentMounted: true });
      return () => {
        if (!isResponsive) {
          // isCurrent is to prevent React state update on an unmounted component issue.
          //isCurrent.current = false;
        }
      };
    }, []);

    // ==========================
    //    handle input change
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
    //    handle input Focus
    // ==========================

    const handleInputFocus = useCallback(() => {
      setInputFocus({
        inputFocus: true
      });
      if (window.innerWidth > 900) {
        // preventing the search dropdown from showing up
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
    // handle search dropdown and inputFocus
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
    // handle closing search drop
    // ==========================

    const HandleSearchDropClose = e => {
      const data = e.target.getAttribute("data-id");
      if ((!data && e.target.className !== "input_") || data !== "X") {
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
    // handle suggesition when removed
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
    //   handle responsive From on
    // ============================

    const HandleRespOn = e => {
      e.preventDefault();

      setIsResponsive({
        isResponsive: true
      });
    };

    // ============================
    //  handle responsive Form off
    // ============================

    const HandleRespOff = e => {
      e.preventDefault();

      setIsResponsive({
        isResponsive: false
      });
    };

    // ==========================
    // handle show icon dropdowns
    // ==========================

    // cam logo
    const HandleCamDrop = e => {
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

    // app logo
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

    // bell logo
    const HandleBellDrop = () => {
      if (
        !dropHandler.ShowCamDrop &&
        !dropHandler.ShowAppDrop &&
        !dropHandler.ShowBellDrop &&
        !dropHandler.ShowProfDrop
      ) {
        setDropHandler(
          {
            ...dropHandler,
            ShowBellDrop: !dropHandler.ShowBellDrop
          },
          document.addEventListener("click", DropHandlerClose)
        );
      }
    };

    // profile
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

    // =============================
    //  handle close icons dropdown
    // =============================

    const ChangeIsInSemiDrop = () => {
      if (!isInSemiDrop) {
        isInSemiDrop = true;
      }
    };

    const DropHandlerClose = useCallback(
      e => {
        // -----------------------------
        const ProfileDrop = document.getElementById("profile_drop");
        const SwitchAccDrop = document.getElementById("switch_acc_drop");
        const LangDrop = document.getElementById("lang_drop");
        const LocDrop = document.getElementById("loca_drop");
        const NotiDrop = document.getElementById("noti_drop");
        const RestrictModeDrop = document.getElementById("restrictmode_drop");
        const ThemeDrop = document.getElementById("theme_drop");

        let target = e.target;
        const data = e.target.getAttribute("data-id");

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

          if (data === "cax") {
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
          } else if (data === "apx") {
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
          } else if (data === "bex") {
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
          } else if (data === "prx") {
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

    // ===============================
    // Preventing the drop on keypress
    // ===============================

    const HandlekeyPress = event => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };

    // ===============================
    //    Handle profile semiDrops
    // ===============================

    const HandleGoBackDrop = useCallback(() => {
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

    // --------------------------------------------

    return (
      <div
        className={
          "NavContainer" +
          (Theme ? " NavContainer-dark" : " NavContainer-light")
        }
      >
        {!isResponsive ? (
          <Fragment>
            <div className="LeftContainer">
              <div className="menuIcon">
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
                    className={
                      "LogoText" +
                      (Theme ? " LogoText-dark" : " LogoText-light")
                    }
                  >
                    YouTube
                  </div>
                </Link>
                <div className="pointer">CLONE</div>
              </div>
            </div>
            {innerWidth > 700 ? (
              <From
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
                  className="responsive_search_icon"
                >
                  <ReSearchIcon />
                </button>
              )
            )}

            <div className="RightContainer">
              <div
                onKeyPress={HandlekeyPress}
                onClick={HandleCamDrop}
                className="merg_container"
              >
                <CamIcon />
                <div style={{ display: dropHandler.ShowCamDrop ? "" : "none" }}>
                  <CamDrop />
                </div>
              </div>
              <div
                onKeyPress={HandlekeyPress}
                onClick={HandleAppDrop}
                className="merg_container"
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
                className="merg_container"
              >
                <Bell />
                <div
                  style={{ display: dropHandler.ShowBellDrop ? "" : "none" }}
                >
                  <Notification show={dropHandler.ShowBellDrop} />
                </div>
              </div>
              <div className="profile_container">
                <button
                  onKeyPress={HandlekeyPress}
                  data-id="ap_"
                  onClick={HandleProfDrop}
                  className="prof_btn"
                >
                  <img
                    data-id="prx"
                    className="profile_img"
                    src={IsCurrentAccount.img}
                    height="32"
                    width="32"
                    alt="Avatar"
                  />
                </button>
                <div
                  style={{ display: dropHandler.ShowProfDrop ? "" : "none" }}
                >
                  <ProfileDrop
                    handleGoBackDrop={HandleGoBackDrop}
                    handleShowSemiDrop={HandleShowSemiDrop}
                  />
                </div>
                <div style={{ display: semiDrop.SADrop ? "" : "none" }}>
                  <SADrop handleGoBackDrop={HandleGoBackDrop} />
                </div>
                <div style={{ display: semiDrop.LangDrop ? "" : "none" }}>
                  <LangDrop handleGoBackDrop={HandleGoBackDrop} />
                </div>
                <div style={{ display: semiDrop.ThemeDrop ? "" : "none" }}>
                  <ThemeDrop handleGoBackDrop={HandleGoBackDrop} />
                </div>
                <div style={{ display: semiDrop.RestrictDrop ? "" : "none" }}>
                  <RestrictDrop handleGoBackDrop={HandleGoBackDrop} />
                </div>
                <div style={{ display: semiDrop.LocaDrop ? "" : "none" }}>
                  <LocaDrop handleGoBackDrop={HandleGoBackDrop} />
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <button className="babtn" onClick={HandleRespOff}>
              <BackArrow />
            </button>
            <From
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
  }
);

export default Navbar;
