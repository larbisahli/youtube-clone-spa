import React, { useContext } from "react";
import "./sass/semidrop_style.scss";
import { BackArrowSvg, CheckedSvg } from "../Svg";
import { NavContext, ThemeContext } from "../../../../Context";
import { ReturnTheme } from "../../../../utils/utils";

// Using Memo to prevent unnecessary re-renders

const LangDrop = React.memo(({ handleGoBackDrop, isCurrent }) => {
  // Navbar context
  const { langState } = useContext(NavContext);
  const [lang, setLang] = langState;

  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const HandleClick = (id) => {
    setLang([
      ...lang.map((lang) => {
        lang.checked = false;
        if (lang.id === id) {
          lang.checked = true;
        }
        return lang;
      }),
    ]);
  };
  return (
    <div id="lang_drop" className={`semiDrop semiDrop--${ReturnTheme(Theme)}`}>
      <div className="semiDrop__header">
        <button onClick={handleGoBackDrop} className="semiDrop__header__arrow">
          <BackArrowSvg isCurrent={isCurrent} />
        </button>
        <div className="semiDrop__header__text">Choose your language</div>
      </div>
      <div
        className={`semiDrop__line semiDrop__line--${ReturnTheme(Theme)}`}
      ></div>
      <div className="semiDrop__main_wrapper">
        {lang.map((lang, index) => {
          return (
            <div
              key={index}
              onClick={() => HandleClick(lang.id)}
              className={`lang_drop lang_drop--${ReturnTheme(Theme)}`}
            >
              <div className="lang_drop__check_area">
                <CheckedSvg
                  color={
                    lang.checked ? (Theme ? "#fff" : "#333") : "transparent"
                  }
                />
              </div>
              <span>{lang.lang}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default LangDrop;
