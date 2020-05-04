import React, { useContext, useCallback } from "react";
import "./sass/semidrop_style.scss";
import { BackArrowSvg, CheckedSvg, AddAccSvg, SOSvg } from "../Svg";
import { ThemeContext, NavContext } from "../../../../Context";
import { ReturnTheme } from "../../../../utils";
import { LazyLoad } from "../../../ComponentsUtils";
// Using Memo to prevent unnecessary re-renders

const SADrop = React.memo(({ handleGoBackDrop, isCurrent, show }) => {
  // Navbar context
  const { accountState } = useContext(NavContext);
  const [acc, setAcc] = accountState;
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const HandleProChange = useCallback(
    (id) => {
      setAcc([
        ...acc.map((acc) => {
          acc.isCurrent = false;
          if (acc.accId === id) {
            acc.isCurrent = !acc.isCurrent;
          }
          return acc;
        }),
      ]);
    },
    [acc, setAcc]
  );

  const IsCurrentAccount = useCallback(acc.filter((acc) => acc.isCurrent)[0], [
    acc,
  ]);

  const sa_acc = `sa_acc_wrap sa_acc_wrap--${ReturnTheme(Theme)}`;

  return (
    <div
      id="switch_acc_drop"
      style={{ display: show ? "" : "none" }}
      className={`semiDrop semiDrop--${ReturnTheme(Theme)}`}
    >
      <LazyLoad render={show}>
        <div className="semiDrop__header">
          <button
            onClick={handleGoBackDrop}
            className="semiDrop__header__arrow"
          >
            <BackArrowSvg isCurrent={isCurrent} />
          </button>
          <div className="semiDrop__header__text">Accounts</div>
        </div>
        <div className={`line line--${ReturnTheme(Theme)}`}></div>
        <div className="semiDrop__main_wrapper">
          <div className="sa_email">{IsCurrentAccount.email}</div>
          {acc.map((acc, index) => {
            return (
              <div
                onClick={() => HandleProChange(acc.accId)}
                key={index}
                className={sa_acc}
              >
                <div className="sa_thumb">
                  <img
                    className="sa_thumb__img"
                    height="40"
                    width="40"
                    src={acc.img}
                    alt="_avatar_"
                  />
                </div>
                <div className="sa_body">
                  <div className="sa_body__wrap">
                    <div className="sa_body__wrap__name">{acc.name}</div>
                    <div
                      className={`sa_body__wrap__subs sa_body__wrap__subs--${ReturnTheme(
                        Theme
                      )}`}
                    >
                      {acc.subs} subscribers
                    </div>
                  </div>
                  <div
                    className="sa_body__check_area"
                    style={{ display: acc.isCurrent ? "" : "none" }}
                  >
                    <CheckedSvg isCurrent={isCurrent} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{ margin: "5px 0" }}
          className={`line line--${ReturnTheme(Theme)}`}
        ></div>
        <div className="semiDrop__main_wrapper semiDrop__btmpad">
          <div className={sa_acc}>
            <div className="btmpad_icon">
              <AddAccSvg />
            </div>
            <div className="btmpad_text">Add account</div>
          </div>
          <div className={sa_acc}>
            <div className="btmpad_icon">
              <SOSvg />
            </div>
            <div className="btmpad_text">Sign out</div>
          </div>
        </div>
      </LazyLoad>
    </div>
  );
});

export default SADrop;
