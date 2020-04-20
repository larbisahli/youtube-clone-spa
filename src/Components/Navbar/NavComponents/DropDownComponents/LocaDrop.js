import React, { useContext, useCallback } from "react";
import "./sass/semidrop_style.scss";
import { BackArrowSvg, CheckedSvg } from "../Svg";
import { ThemeContext, NavContext } from "../../../../Context";
import { ReturnTheme } from "../../../../utils/utils";

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
      className={`semiDrop semiDrop--${ReturnTheme(Theme)} scroll-${ReturnTheme(
        Theme
      )}`}
    >
      <div className="semiDrop__header">
        <button onClick={handleGoBackDrop} className="semiDrop__header__arrow">
          <BackArrowSvg isCurrent={isCurrent} />
        </button>
        <div className="semiDrop__header__text">Choose your language</div>
      </div>
      <div
        className={`semiDrop__line semiDrop__line--${ReturnTheme(Theme)}`}
      ></div>
      <div className="semiDrop__main_wrapper semiDrop__overflow">
        {loca.map((loca, index) => {
          return (
            <div
              key={index}
              onClick={() => HandleClick(loca.id)}
              className={`lang_drop lang_drop--${ReturnTheme(Theme)}`}
            >
              <div className="lang_drop__check_area">
                <CheckedSvg
                  color={
                    loca.checked ? (Theme ? "#fff" : "#333") : "transparent"
                  }
                />
              </div>
              <span>{loca.loca}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default LocaDrop;
