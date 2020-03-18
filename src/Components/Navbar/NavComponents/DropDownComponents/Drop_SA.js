import React, { useContext, useCallback } from "react";
import "./SA.scss";
import { BackArrow, CheckedIcon, AddAccIcon, SOIcon } from "../Icons";
import { NavContext } from "../../../../Context/NavContext";
import { ThemeContext } from "../../../../Context/ThemeContext";
// Using Memo to prevent unnecessary re-renders

const SADrop = React.memo(({ handleGoBackDrop, isCurrent }) => {
  // Navbar context
  const { accountState } = useContext(NavContext);
  const [acc, setAcc] = accountState;
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const HandleProChange = useCallback(
    id => {
      setAcc([
        ...acc.map(acc => {
          acc.isCurrent = false;
          if (acc.accId === id) {
            acc.isCurrent = !acc.isCurrent;
          }
          return acc;
        })
      ]);
    },
    [acc, setAcc]
  );

  const IsCurrentAccount = useCallback(acc.filter(acc => acc.isCurrent)[0], [
    acc
  ]);

  const sa_acc = `sa_acc sa_acc-${Theme ? "dark" : "light"}`;

  return (
    <div
      id="switch_acc_drop"
      className={`semiDrop_container semiDrop_container-${
        Theme ? "dark" : "light"
      }`}
    >
      <div className="sa_wrapper">
        <button onClick={handleGoBackDrop} className="sa_arrow">
          <BackArrow isCurrent={isCurrent} />
        </button>
        <div className="sa_text">Accounts</div>
      </div>
      <div className="line_"></div>
      <div className="main_wrapper">
        <div className="sa_email">{IsCurrentAccount.email}</div>
        {acc.map((acc, index) => {
          return (
            <div
              onClick={() => HandleProChange(acc.accId)}
              key={index}
              className={sa_acc}
            >
              <div className="sa_img">
                <img
                  className="sap"
                  height="40"
                  width="40"
                  src={acc.img}
                  alt="_avatar_"
                />
              </div>
              <div className="ssa_tr">
                <div className="sa_t">
                  <div className="sa_name">{acc.name}</div>
                  <div className={`sa_sub sa_sub-${Theme ? "dark" : "light"}`}>
                    {acc.subs} subscribers
                  </div>
                </div>
                <div
                  className="sa_checked"
                  style={{ display: acc.isCurrent ? "" : "none" }}
                >
                  <CheckedIcon isCurrent={isCurrent} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={`line line-${Theme ? "dark" : "light"}`}></div>
      <div className="main_wrapper btmpad">
        <div className={sa_acc}>
          <div className="ad_icon">
            <AddAccIcon />
          </div>
          <div className="ad_text">Add account</div>
        </div>
        <div className={sa_acc}>
          <div className="ad_icon">
            <SOIcon />
          </div>
          <div className="ad_text">Sign out</div>
        </div>
      </div>
    </div>
  );
});

export default SADrop;
