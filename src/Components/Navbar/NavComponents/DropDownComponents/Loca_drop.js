import React, { useContext, useCallback } from "react";
import "./SA.scss";
import { BackArrow, CheckedIcon } from "../Icons";
import { NavContext } from "../../../../Context/NavContext";
import { ThemeContext } from "../../../../Context/ThemeContext";

// Using Memo to prevent unnecessary re-renders

const LocaDrop = React.memo(({ handleGoBackDrop, isCurrent }) => {
  // Navbar context
  const { locaState } = useContext(NavContext);
  const [loca, setLoca] = locaState;
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const HandleClick = useCallback(
    id => {
      setLoca([
        ...loca.map(loca => {
          loca.checked = false;
          if (loca.id === id) {
            loca.checked = true;
          }
          return loca;
        })
      ]);
    },
    [loca, setLoca]
  );
  return (
    <div
      id="loca_drop"
      className={
        "semiDrop_container" +
        (Theme
          ? " semiDrop_container-dark scroll-dark"
          : " semiDrop_container-light scroll-light")
      }
    >
      <div className="sa_wrapper">
        <button onClick={handleGoBackDrop} className="sa_arrow">
          <BackArrow isCurrent={isCurrent} />
        </button>
        <div className="sa_text">Choose your language</div>
      </div>
      <div className={"line" + (Theme ? " line-dark" : " line-light")}></div>
      <div className="main_wrapper overflow">
        {loca.map((loca, index) => {
          return (
            <div
              key={index}
              onClick={() => HandleClick(loca.id)}
              className={
                "sa_lang" + (Theme ? " sa_lang-dark" : " sa_lang-light")
              }
            >
              <div className="_xch">
                <CheckedIcon
                  color={
                    loca.checked ? (Theme ? "#fff" : "#333") : "transparent"
                  }
                />
              </div>
              <div className="x_lang">{loca.loca}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default LocaDrop;
