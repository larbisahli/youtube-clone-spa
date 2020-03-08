import React from "react";
import "./search_drop.scss";

// =================
// FAKE SUGGESTIONS
// =================

// Using Memo to prevent event handler of resizing to re-render this component
// with the help of useCallback to prevent functions
// [RemoveHandleClick,HandleSelect] from re-creation.

const SearchDropSuggestion = React.memo(
  ({
    ShowSearchDrop,
    suggestions,
    searchIsActive,
    RemoveHandleClick,
    HandleSelect
  }) => {
    return (
      <div
        data-id="X"
        className="search_drop"
        style={{ display: ShowSearchDrop ? "" : "none" }}
      >
        {suggestions.map(s => (
          <div key={s.id} className="sugge_holder">
            <li
              data-id={s.id}
              onClick={() => HandleSelect(s.suggestion)}
              className="suggestion_list"
            >
              {s.removed ? (
                <div data-id={s.id} className="placeHolder">
                  Suggestion removed
                </div>
              ) : (
                <div
                  data-id={s.id}
                  className={
                    "Suggestion_text" + (searchIsActive ? "" : " hisText")
                  }
                >
                  {s.suggestion}
                </div>
              )}
            </li>
            {!searchIsActive && s.suggestion && (
              <div
                data-id="X"
                onClick={() => RemoveHandleClick(s.id)}
                className="Suggestion_remove"
              >
                Remove
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
);

export default SearchDropSuggestion;
