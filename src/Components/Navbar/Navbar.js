import React, { useState, useEffect, useCallback, Fragment, memo } from "react";
import style from "./navbar.module.scss";
import YoutubeLogo from "../../Images/Youtube_icon.svg";
import { Link, useHistory } from "react-router-dom";
import { Head, RippleButton } from "../ComponentsUtils";
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
import { ReturnTheme, PageLocation, GetClassName } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  NotiCountAction,
  ShowGuideAction,
  SetGuideModeAction,
  HideGuideAction,
  ToggleGuideAction,
} from "../../redux";

const From = memo(
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
      <div className={style.search_container}>
        <form className={style.form_container} onSubmit={HandleSubmit}>
          <div className={style.form_wrapper}>
            <div
              className={`${GetClassName(style, "input_wrapper", Theme)} ${
                inputFocus ? "focus" : ""
              }`}
            >
              <input
                className={style.search_input}
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
              className={`${style.btn_container} titleS titleS--${ReturnTheme(
                Theme
              )} ${GetClassName(style, "btn_container", Theme)}`}
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

const Navbar = memo(() => {
  //  Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  //  navbar
  const NotiCount = useSelector((state) => state.Navbar.notiCount);
  const accounts = useSelector((state) => state.Navbar.accounts);

  // Guide
  const showGuide = useSelector((state) => state.Guide.showGuide);
  const guideMode = useSelector((state) => state.Guide.guideMode);

  //  dispatch
  const dispatch = useDispatch();

  // select the current active account
  const IsCurrentAccount = accounts.filter((acc) => acc.isCurrent)[0];

  // ==> Input focus state
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

      // for Guide

      if (window.innerWidth < 1340 && guideMode === 1) {
        console.log("showGuide :>> ", showGuide, window.innerWidth);
        //HundleShowGuide(true, false);
        dispatch(HideGuideAction());
        dispatch(SetGuideModeAction(2));
      }

      if (window.innerWidth > 1340) {
        if (PageLocation() !== "watch") {
          dispatch(ShowGuideAction());
          dispatch(SetGuideModeAction(1));
        }
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
      // Notification count remover
      if (NotiCount.seen) {
        dispatch(NotiCountAction());
      }

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

    // you should not put dropHandler in the useCallback dependencies array
    // because it will re-render semi-dropdowns
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
  }, []);

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
    <nav className={GetClassName(style, "container", Theme)}>
      {/* Helmet */}
      <Head>
        <title>
          {NotiCount.seen
            ? `(${NotiCount.count}) YouTube-Clone`
            : "YouTube-Clone"}
        </title>
        <meta
          name="youtube clone home page most popular videos"
          content="Helmet application"
        />
      </Head>
      {/* NavBar */}
      {!isResponsive ? (
        <Fragment>
          <div className={style.left_container}>
            <div
              onClick={() => {
                dispatch(ToggleGuideAction());
              }}
              className={style.menu_wrap}
            >
              <RippleButton onclick={() => {}} classname={style.btnpad}>
                <MenuSvg />
              </RippleButton>
            </div>
            <div title="YouTube Home" className={style.logo_container}>
              <Link to="/">
                <img
                  src={YoutubeLogo}
                  alt="Youtube-Clone"
                  className={style.ytp_logo}
                />
              </Link>
              <Link to="/">
                <div className={GetClassName(style, "logo_text", Theme)}>
                  YouTube
                </div>
              </Link>
              <div className={GetClassName(style, "logo_pointer", Theme)}>
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
              <button onClick={HandleRespOn} className={style.responsive_form}>
                <ReSearchSvg />
              </button>
            )
          )}

          <div className={style.right_container}>
            <div
              onKeyPress={HandlekeyPress}
              onClick={HandleCamDrop}
              className={style.icons_container}
            >
              <RippleButton onclick={() => {}} classname={style.btnpad}>
                <CamSvg />
              </RippleButton>

              <CamDrop show={dropHandler.ShowCamDrop} />
            </div>

            <div
              onKeyPress={HandlekeyPress}
              onClick={HandleAppDrop}
              className={style.icons_container}
            >
              <RippleButton onclick={() => {}} classname={style.btnpad}>
                <AppSvg />
              </RippleButton>
              <AppDrop show={dropHandler.ShowAppDrop} />
            </div>

            <div
              onKeyPress={HandlekeyPress}
              onClick={HandleBellDrop}
              className={style.icons_container}
            >
              <div
                style={{ display: NotiCount.seen ? "" : "none" }}
                className={GetClassName(style, "noti_count", Theme)}
              >
                {NotiCount.count}
              </div>
              <RippleButton onclick={() => {}} classname={style.btnpad}>
                <BellSvg />
              </RippleButton>

              <Notification show={dropHandler.ShowBellDrop} />
            </div>
            <div className={style.profile_container}>
              <button
                onKeyPress={HandlekeyPress}
                onClick={HandleProfDrop}
                className={style.profile_btn}
              >
                <img
                  id="prx"
                  className={style.pronail}
                  src={IsCurrentAccount.img}
                  height="32"
                  width="32"
                  alt="Avatar"
                />
              </button>

              <ProfileDrop
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
