import React, { memo } from "react";
import styles from "./scss/searchdrop.module.scss";
import { LazyRender } from "../../../ComponentsUtils";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

// Using Memo to prevent event handler of resizing to re-render this component
// with the help of useCallback to prevent functions
// [RemoveHandleClick, HandleSelect] from re-creation.

const SearchDropSuggestion = ({
  ShowSearchDrop,
  suggestions,
  searchIsActive,
  RemoveHandleClick,
  HandleSelect,
}) => {
  return (
    <div
      id="sdrop"
      className={styles.container}
      style={{ display: ShowSearchDrop ? "" : "none" }}
    >
      <LazyRender render={ShowSearchDrop}>
        {suggestions.map((s, index) => (
          <div key={index} className={styles.block}>
            <li
              onClick={() => HandleSelect(s.suggestion)}
              className={styles.wrapper}
            >
              {s.removed ? (
                <div id="plholder" className={styles.wrapper__ph}>
                  Suggestion removed
                </div>
              ) : (
                <div
                  className={cx("wrapper__text", {
                    wrapper__atxt: !searchIsActive,
                  })}
                >
                  {s.suggestion}
                </div>
              )}
            </li>
            {!searchIsActive && s.suggestion && (
              <div
                id="rembtnsd"
                onClick={() => RemoveHandleClick(s.id)}
                className={styles.remove}
              >
                Remove
              </div>
            )}
          </div>
        ))}
      </LazyRender>
    </div>
  );
};

export default memo(SearchDropSuggestion);
