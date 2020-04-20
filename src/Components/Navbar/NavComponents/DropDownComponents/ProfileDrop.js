import React, { useContext, useCallback } from "react";
import "./sass/profiledrop_style.scss";
import {
  AvatarSvg,
  ArrowSvg,
  SSvg,
  YSSvg,
  SASvg,
  SOSvg,
  TSvg,
  LangSvg,
  SettingsSvg,
  DataSvg,
  HelpSvg,
  FeedSvg,
  KeyboardSvg,
  LocaSvg,
} from "../Svg";
import { NavContext, ThemeContext } from "../../../../Context";
import { ReturnTheme } from "../../../../utils/utils";

// Using Memo to prevent unnecessary re-renders

const Location = React.memo(({ loca }) => {
  const location_ = loca.filter((loca) => loca.checked);
  return <div className="">{`: ${location_[0].loca}`}</div>;
});

const Language = React.memo(({ lang }) => {
  const Language_ = lang.filter((lang) => lang.checked);
  return (
    <div className="pro_top_wrap__text_wrap__txt--lang">
      {Language_[0].lang}
    </div>
  );
});

const ProfileDrop = React.memo(({ handleShowSemiDrop }) => {
  // Navbar context
  const { locaState, langState, accountState, restrictState } = useContext(
    NavContext
  );
  const [loca] = locaState;
  const [lang] = langState;
  const [acc] = accountState;
  const [restrict] = restrictState;
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  const IsCurrentAccount = useCallback(acc.filter((acc) => acc.isCurrent)[0], [
    acc,
  ]);

  const line = `line line--${ReturnTheme(Theme)}`;
  const wrapper_x = `pro_top_wrap pro_top_wrap--${ReturnTheme(Theme)}`;
  const arte_ = `pro_bottom_wrap__text_wrap pro_bottom_wrap__text_wrap--${ReturnTheme(
    Theme
  )}`;

  return (
    <div
      id="profile_drop"
      className={`pro_menu pro_menu--${ReturnTheme(Theme)}`}
    >
      <div className="pro_menu__header">
        <div className="image_container">
          <img
            className="image_container__img"
            src={IsCurrentAccount.img}
            height="40"
            width="40"
            alt="Avatar"
          />
        </div>
        <div className="pro_header_text">
          <div className="pro_header_text__name">{IsCurrentAccount.name}</div>
          <div className="pro_header_text__email">{IsCurrentAccount.email}</div>
          <div
            className={`pro_header_text__blue_text pro_header_text__blue_text--${ReturnTheme(
              Theme
            )}`}
          >
            Manage your Google Account
          </div>
        </div>
      </div>
      <div className={`line line--${ReturnTheme(Theme)}`}></div>
      <div className="pro_menu__body">
        <div className={wrapper_x}>
          <div className="pro_top_wrap__logo">
            <AvatarSvg />
          </div>
          <div className="pro_top_wrap__text_wrap">
            <div className="pro_top_wrap__text_wrap__txt">Your channel</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="pro_top_wrap__logo">
            <SSvg />
          </div>
          <div className="pro_top_wrap__text_wrap">
            <div className="pro_top_wrap__text_wrap__txt">Paid memberships</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="pro_top_wrap__logo">
            <YSSvg />
          </div>
          <div className="pro_top_wrap__text_wrap">
            <div className="pro_top_wrap__text_wrap__txt">YouTube Studio</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="pro_top_wrap__logo">
            <SASvg />
          </div>
          <div
            onClick={() => handleShowSemiDrop("SADrop")}
            className="pro_top_wrap__text_wrap"
          >
            <div className="pro_top_wrap__text_wrap__txt">Switch account</div>
            <div className="pro_top_wrap__logo">
              <ArrowSvg />
            </div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="pro_top_wrap__logo">
            <SOSvg />
          </div>
          <div className="pro_top_wrap__text_wrap">
            <div className="pro_top_wrap__text_wrap__txt">Sign out</div>
          </div>
        </div>
        <div
          style={{ margin: "5px 0", paddingTop: "1px", height: "2px" }}
          className={line}
        ></div>
        <div className={wrapper_x}>
          <div className="pro_top_wrap__logo">
            <TSvg />
          </div>
          <div
            onClick={() => handleShowSemiDrop("ThemeDrop")}
            className="pro_top_wrap__text_wrap"
          >
            <div className="pro_top_wrap__text_wrap__txt">{`Dark theme: ${
              Theme ? "On" : "Off"
            }`}</div>
            <div className="pro_top_wrap__logo">
              <ArrowSvg />
            </div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="pro_top_wrap__logo">
            <LangSvg />
          </div>
          <div
            onClick={() => handleShowSemiDrop("LangDrop")}
            className="pro_top_wrap__text_wrap"
          >
            <div className="pro_top_wrap__text_wrap__txt">
              Language: <Language lang={lang} />
            </div>
            <div className="pro_top_wrap__logo">
              <ArrowSvg />
            </div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="pro_top_wrap__logo">
            <LocaSvg />
          </div>
          <div
            onClick={() => handleShowSemiDrop("LocaDrop")}
            className="pro_top_wrap__text_wrap"
          >
            <div className="pro_top_wrap__text_wrap__txt">
              Location <Location loca={loca} />
            </div>
            <div className="pro_top_wrap__logo">
              <ArrowSvg />
            </div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="pro_top_wrap__logo">
            <SettingsSvg default_={true} />
          </div>
          <div className="pro_top_wrap__text_wrap">
            <div className="pro_top_wrap__text_wrap__txt">Settings</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="pro_top_wrap__logo">
            <DataSvg />
          </div>
          <div className="pro_top_wrap__text_wrap">
            <div className="pro_top_wrap__text_wrap__txt">
              Your data in YouTube
            </div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="pro_top_wrap__logo">
            <HelpSvg default_={true} />
          </div>
          <div className="pro_top_wrap__text_wrap">
            <div className="pro_top_wrap__text_wrap__txt">Help</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="pro_top_wrap__logo">
            <FeedSvg default_={true} />
          </div>
          <div className="pro_top_wrap__text_wrap">
            <div className="pro_top_wrap__text_wrap__txt">Send feedback</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="pro_top_wrap__logo">
            <KeyboardSvg />
          </div>
          <div className="pro_top_wrap__text_wrap">
            <div className="pro_top_wrap__text_wrap__txt">
              Keyboard shortcuts
            </div>
          </div>
        </div>
        <div
          style={{ margin: "5px 0", paddingTop: "1px", height: "2px" }}
          className={line}
        ></div>
        <div className="pro_bottom_wrap">
          <div
            onClick={() => handleShowSemiDrop("RestrictDrop")}
            className={arte_}
          >
            <div className="pro_bottom_wrap__text_wrap--res">
              {`Restricted Mode: ${restrict.isRestrict ? "On" : "Off"}`}
            </div>
            <div className="arrow_">
              <ArrowSvg />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileDrop;
