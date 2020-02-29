import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment
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
  AppDrop
} from "./NavComponents/DropDownComponents";
import { DataApis } from "../api/YoutubeApi";

const From = ({
  ShowSearchDrop,
  suggestions,
  historicalSuggestions,
  searchIsActive,
  RemoveHandleClick,
  HandleSelect,
  focus,
  HandleSubmit,
  inputValue,
  handleInputFocus,
  HandleChange,
  handleInputBlur
}) => {
  return (
    <div className="searchContainer">
      <form className="form_container" onSubmit={HandleSubmit}>
        <div className="form_wrapper">
          <div className={"input_wrapper" + (focus ? " focus" : "")}>
            <input
              className="input_"
              type="text"
              name="search"
              value={inputValue}
              onChange={HandleChange}
              placeholder="Search"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />

            <SearchDropSuggestion
              ShowSearchDrop={ShowSearchDrop}
              suggestions={searchIsActive ? suggestions : historicalSuggestions}
              searchIsActive={searchIsActive}
              RemoveHandleClick={RemoveHandleClick}
              HandleSelect={HandleSelect}
            />
          </div>
          <button className="btn_container">
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

const Navbar = () => {
  const [{ inputValue, focus }, setFormControl] = useState({
    inputValue: "",
    focus: false
  });

  const [suggestions, setSuggestions] = useState([
    { suggestion: "travis media", id: 1 },
    { suggestion: "ed dev", id: 2 },
    { suggestion: "freecodecamp", id: 3 },
    { suggestion: "him wicked game", id: 4 },
    { suggestion: "metallica unforgiven", id: 5 }
  ]);
  const [historicalSuggestions, setH_suggest] = useState([
    { suggestion: "cat funny videos", removed: false, id: 1 },
    { suggestion: "learn react js", removed: false, id: 2 },
    { suggestion: "freecodecamp", removed: false, id: 3 },
    {
      suggestion: "in flames full album",
      removed: false,
      id: 4
    },
    { suggestion: "python tutorial", removed: false, id: 5 }
  ]);

  const [{ ShowSearchDrop, searchIsActive }, setSDstate] = useState({
    ShowSearchDrop: false,
    searchIsActive: false
  });

  const [{ isResponsive }, setIsResponsive] = useState({ isResponsive: false });

  const isCurrent = useRef(true);

  const [dropHandler, setDropHandler] = useState({
    ShowCamDrop: false,
    ShowAppDrop: false,
    ShowBellDrop: false,
    ShowProfDrop: false
  });

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

      // hide search drop if it's true when the window width is less than 880
      if (window.innerWidth < 890) {
        setSDstate({
          ShowSearchDrop: false,
          searchIsActive
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

  const innerWidth = useMeasure();

  useEffect(() => {
    setComponentMounted({ componentMounted: true });
    return () => {
      if (!isResponsive) {
        // isCurrent is to prevent React state update on an unmounted component issue.
        isCurrent.current = false;
      }
    };
  }, []);

  // ==========================
  //    handle input change
  // ==========================

  const HandleChange = e => {
    setFormControl({
      inputValue: e.target.value,
      focus: focus
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
  };

  // ==========================
  //  handle input focus style
  // ==========================

  const handleInputFocus = () => {
    setFormControl({
      inputValue: inputValue,
      focus: true
    });
    if (innerWidth > 900) {
      // preventing the small looking dropdown from showing up
      // if window innerWidth is less than 950
      setSDstate({
        ShowSearchDrop: true,
        searchIsActive
      });
    } else if (isResponsive && innerWidth < 750) {
      setSDstate({
        ShowSearchDrop: true,
        searchIsActive
      });
    }
  };

  // ================================
  // handle search dropdown and focus
  // ================================

  const handleInputBlur = () => {
    setFormControl(
      {
        inputValue: inputValue,
        focus: false
      },
      document.addEventListener("click", HandleSearchDropClose)
    );
  };

  // ==========================
  // handle closing search drop
  // ==========================

  const HandleSearchDropClose = e => {
    const data = e.target.getAttribute("data-id");
    if ((!data && e.target.className !== "input_") || data !== "X") {
      setSDstate(
        {
          ShowSearchDrop: false,
          searchIsActive
        },
        document.removeEventListener("click", HandleSearchDropClose)
      );
    }
  };

  // ==========================
  //       handle Submit
  // ==========================

  const HandleSubmit = e => {
    e.preventDefault();
    console.log("down", inputValue);
  };

  // ==========================
  //       handle Select
  // ==========================

  const HandleSelect = useCallback(i => {
    console.log(i, "HandleSelect");
  }, []);

  // ==========================
  // handle suggesition remove
  // ==========================

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

  // ==========================
  //   handle responsive From
  //  =========================

  const HandleRespOn = e => {
    e.preventDefault();

    setIsResponsive({
      isResponsive: true
    });
  };

  // =========================
  //  handle responsive Form
  // =========================

  const HandleRespOff = e => {
    e.preventDefault();

    setIsResponsive({
      isResponsive: false
    });
  };

  // =========================
  //   handle show dropdowns
  // =========================

  const HandleShowCamDrop = () => {
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

  const HandleShowAppDrop = () => {
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

  const HandleShowBellDrop = () => {
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

  const HandleShowProfDrop = () => {
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

  // =========================
  //  handle close dropdowns
  // =========================

  const DropHandlerClose = () => {
    console.log("close", dropHandler);
    setDropHandler(
      {
        ShowCamDrop: false,
        ShowAppDrop: false,
        ShowBellDrop: false,
        ShowProfDrop: false
      },
      document.removeEventListener("click", DropHandlerClose)
    );
  };

  // --------------------------------------------

  return (
    <div className="NavContainer">
      {!isResponsive ? (
        <Fragment>
          <div className="LeftContainer">
            <div className="menuIcon">
              <MenuIcon />
            </div>
            <div className="LogoContainer">
              <Link to="/">
                <img
                  src={YoutubeLogo}
                  alt="Youtube-Clone"
                  className="applogo"
                />
              </Link>
              <Link to="/">
                <div className="LogoText">YouTube</div>
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
              inputValue={inputValue}
              focus={focus}
              handleInputFocus={handleInputFocus}
              handleInputBlur={handleInputBlur}
            />
          ) : (
            componentMounted && (
              <button onClick={HandleRespOn} className="responsive_search_icon">
                <ReSearchIcon isCurrent={isCurrent.current} />
              </button>
            )
          )}

          <div className="RightContainer">
            <div onClick={HandleShowCamDrop} className="merg_container">
              <CamIcon />
              <div style={{ display: dropHandler.ShowCamDrop ? "" : "none" }}>
                <CamDrop />
              </div>
            </div>
            <div onClick={HandleShowAppDrop} className="merg_container">
              <AppIcon />
              <div
                style={{ display: dropHandler.ShowAppDrop ? "" : "none" }}
                className="drop"
              >
                <AppDrop />
              </div>
            </div>
            <div onClick={HandleShowBellDrop} className="merg_container">
              <Bell />
              <div style={{ display: dropHandler.ShowBellDrop ? "" : "none" }}>
                <CamDrop />
              </div>
            </div>
            <div className="profile_container">
              <button onClick={HandleShowProfDrop} className="prof_btn">
                <img
                  className="profile_img"
                  src="https://yt3.ggpht.com/a-/AAuE7mCD0A834-oe9m44YrvgjigbMXwRc254LoMuOkqDJw=s88-c-k-c0xffffffff-no-rj-mo"
                  height="32"
                  width="32"
                  alt="Avatar"
                />
              </button>
              <div style={{ display: dropHandler.ShowProfDrop ? "" : "none" }}>
                <CamDrop />
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <button onClick={HandleRespOff}>
            <BackArrow isCurrent={isCurrent.current} />
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
            inputValue={inputValue}
            focus={focus}
            handleInputFocus={handleInputFocus}
            handleInputBlur={handleInputBlur}
          />
        </Fragment>
      )}
    </div>
  );
};

export default Navbar;
