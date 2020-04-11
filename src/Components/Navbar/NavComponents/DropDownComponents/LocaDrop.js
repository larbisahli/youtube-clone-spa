import React, { useContext, useCallback } from "react";
import "./sa_style.scss";
import { BackArrowSvg, CheckedSvg } from "../Svg";
import { ThemeContext, NavContext } from "../../../../Context";
import { ReturnTheme } from "../../../../config";

// Using Memo to prevent unnecessary re-renders

const LocaDrop = React.memo(({ handleGoBackDrop, isCurrent }) => {
  // Navbar context
  const { locaState } = useContext(NavContext);
  const [loca, setLoca] = locaState;
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const HandleClick = useCallback(
    (id) => {
      setLoca([
        ...loca.map((loca) => {
          loca.checked = false;
          if (loca.id === id) {
            loca.checked = true;
          }
          return loca;
        }),
      ]);
    },
    [loca, setLoca]
  );
  return (
    <div
      id="loca_drop"
      className={`semiDrop_container semiDrop_container-${ReturnTheme(
        Theme
      )} scroll-${ReturnTheme(Theme)}`}
    >
      <div className="sa_wrapper">
        <button onClick={handleGoBackDrop} className="sa_arrow">
          <BackArrowSvg isCurrent={isCurrent} />
        </button>
        <div className="sa_text">Choose your language</div>
      </div>
      <div className={`line line-${ReturnTheme(Theme)}`}></div>
      <div className="main_wrapper overflow">
        {loca.map((loca, index) => {
          return (
            <div
              key={index}
              onClick={() => HandleClick(loca.id)}
              className={`sa_lang sa_lang-${ReturnTheme(Theme)}`}
            >
              <div className="_xch">
                <CheckedSvg
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
