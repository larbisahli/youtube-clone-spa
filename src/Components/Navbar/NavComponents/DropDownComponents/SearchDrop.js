import React, { memo } from "react";
import style from "./sass/searchdrop.module.scss";
import { LazyLoad } from "../../../ComponentsUtils";

// Using Memo to prevent event handler of resizing to re-render this component
// with the help of useCallback to prevent functions
// [RemoveHandleClick, HandleSelect] from re-creation.

const SearchDropSuggestion = memo(
  ({
    ShowSearchDrop,
    suggestions,
    searchIsActive,
    RemoveHandleClick,
    HandleSelect,
  }) => {
    return (
      <div
        id="sdrop"
        className={style.container}
        style={{ display: ShowSearchDrop ? "" : "none" }}
      >
        <LazyLoad render={ShowSearchDrop}>
          {suggestions.map((s, index) => (
            <div key={index} className={style.block}>
              <li
                onClick={() => HandleSelect(s.suggestion)}
                className={style.wrapper}
              >
                {s.removed ? (
                  <div id="plholder" className={style.wrapper__ph}>
                    Suggestion removed
                  </div>
                ) : (
                  <div
                    className={
                      style.wrapper__text +
                      (searchIsActive ? "" : ` ${style.wrapper__atxt}`)
                    }
                  >
                    {s.suggestion}
                  </div>
                )}
              </li>
              {!searchIsActive && s.suggestion && (
                <div
                  id="rembtnsd"
                  onClick={() => RemoveHandleClick(s.id)}
                  className={style.remove}
                >
                  Remove
                </div>
              )}
            </div>
          ))}
        </LazyLoad>
      </div>
    );
  }
);

export default SearchDropSuggestion;
