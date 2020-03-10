import React from "react";
import "./search_drop.scss";

// =================
// FAKE SUGGESTIONS
// =================

// Using Memo to prevent event handler of resizing to re-render this component
// with the help of useCallback to prevent functions [RemoveHandleClick, HandleSelect] from re-creation.

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
        id="sdrop"
        className="search_drop"
        style={{ display: ShowSearchDrop ? "" : "none" }}
      >
        {suggestions.map(s => (
          <div key={s.id} className="sugge_holder">
            <li
              onClick={() => HandleSelect(s.suggestion)}
              className="suggestion_list"
            >
              {s.removed ? (
                <div id="plholder" className="placeHolder">
                  Suggestion removed
                </div>
              ) : (
                <div
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
                id="rembtnsd"
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
