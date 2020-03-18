import React, { useContext } from "react";
import "./SA.scss";
import { BackArrow, CheckedIcon } from "../Icons";
import { NavContext } from "../../../../Context/NavContext";
import { ThemeContext } from "../../../../Context/ThemeContext";

// Using Memo to prevent unnecessary re-renders

const LangDrop = React.memo(({ handleGoBackDrop, isCurrent }) => {
  // Navbar context
  const { langState } = useContext(NavContext);
  const [lang, setLang] = langState;

  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const HandleClick = id => {
    setLang([
      ...lang.map(lang => {
        lang.checked = false;
        if (lang.id === id) {
          lang.checked = true;
        }
        return lang;
      })
    ]);
  };
  return (
    <div
      id="lang_drop"
      className={`semiDrop_container semiDrop_container-${
        Theme ? "dark" : "light"
      }`}
    >
      <div className="sa_wrapper">
        <button onClick={handleGoBackDrop} className="sa_arrow">
          <BackArrow isCurrent={isCurrent} />
        </button>
        <div className="sa_text">Choose your language</div>
      </div>
      <div className={`line line-${Theme ? "dark" : "light"}`}></div>
      <div className="main_wrapper">
        {lang.map((lang, index) => {
          return (
            <div
              key={index}
              onClick={() => HandleClick(lang.id)}
              className={`sa_lang sa_lang-${Theme ? "dark" : "light"}`}
            >
              <div className="_xch">
                <CheckedIcon
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
