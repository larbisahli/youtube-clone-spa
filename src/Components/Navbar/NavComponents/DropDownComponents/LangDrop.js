import React, { useContext } from "react";
import "./sa_style.scss";
import { BackArrowSvg, CheckedSvg } from "../Svg";
import { NavContext, ThemeContext } from "../../../../Context";
import { ReturnTheme } from "../../../../config";

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
    <div
      id="lang_drop"
      className={`semiDrop_container semiDrop_container-${ReturnTheme(Theme)}`}
    >
      <div className="sa_wrapper">
        <button onClick={handleGoBackDrop} className="sa_arrow">
          <BackArrowSvg isCurrent={isCurrent} />
        </button>
        <div className="sa_text">Choose your language</div>
      </div>
      <div className={`line line-${ReturnTheme(Theme)}`}></div>
      <div className="main_wrapper">
        {lang.map((lang, index) => {
          return (
            <div
              key={index}
              onClick={() => HandleClick(lang.id)}
              className={`sa_lang sa_lang-${ReturnTheme(Theme)}`}
            >
              <div className="_xch">
                <CheckedSvg
                  color={
                    lang.checked ? (Theme ? "#fff" : "#333") : "transparent"
                  }
                />
              </div>
              <div className="x_lang">{lang.lang}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default LangDrop;
