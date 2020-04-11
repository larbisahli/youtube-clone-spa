import React, { useContext, useCallback } from "react";
import "./profiledrop_style.scss";
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
import { ReturnTheme } from "../../../../config";

// Using Memo to prevent unnecessary re-renders

const Location = React.memo(({ loca }) => {
  const location_ = loca.filter((loca) => loca.checked);
  return <div className="loca_">{`: ${location_[0].loca}`}</div>;
});

const Language = React.memo(({ lang }) => {
  const Language_ = lang.filter((lang) => lang.checked);
  return <div className="lang_">{Language_[0].lang}</div>;
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

  const line = `line_b line_b-${ReturnTheme(Theme)}`;
  const wrapper_x = `wrapper_x wrapper_x-${ReturnTheme(Theme)}`;
  const arte_ = `arte_ arte_-${ReturnTheme(Theme)}`;

  return (
    <div
      id="profile_drop"
      className={`profile_Container profile_Container-${ReturnTheme(Theme)}`}
    >
      <div className="intro_container">
        <div className="image_container">
          <img
            className="img_profile"
            src={IsCurrentAccount.img}
            height="40"
            width="40"
            alt="Avatar"
          />
        </div>
        <div className="intro_text">
          <div className="name_">{IsCurrentAccount.name}</div>
          <div className="email_">{IsCurrentAccount.email}</div>
          <div className={`blue_text ${ReturnTheme(Theme)}`}>
            Manage your Google Account
          </div>
        </div>
      </div>
      <div className={`line_a line_a-${ReturnTheme(Theme)}`}></div>
      <div className="f_container">
        <div className={wrapper_x}>
          <div className="_logo_">
            <AvatarSvg />
          </div>
          <div className="arte_">
            <div className="_text_">Your channel</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <SSvg />
          </div>
          <div className="arte_">
            <div className="_text_">Paid memberships</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <YSSvg />
          </div>
          <div className="arte_">
            <div className="_text_">YouTube Studio</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <SASvg />
          </div>
          <div onClick={() => handleShowSemiDrop("SADrop")} className="arte_">
            <div className="_text_">Switch account</div>
            <div className="_logo_">
              <ArrowSvg />
            </div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <SOSvg />
          </div>
          <div className="arte_">
            <div className="_text_">Sign out</div>
          </div>
        </div>
        <div className={line}></div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <TSvg />
          </div>
          <div
            onClick={() => handleShowSemiDrop("ThemeDrop")}
            className="arte_"
          >
            <div className="_text_">{`Dark theme: ${
              Theme ? "On" : "Off"
            }`}</div>
            <div className="_logo_">
              <ArrowSvg />
            </div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <LangSvg />
          </div>
          <div onClick={() => handleShowSemiDrop("LangDrop")} className="arte_">
            <div className="_text_">
              Language: <Language lang={lang} />
            </div>
            <div className="_logo_">
              <ArrowSvg />
            </div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <LocaSvg />
          </div>
          <div onClick={() => handleShowSemiDrop("LocaDrop")} className={arte_}>
            <div className="_text_">
              Location <Location loca={loca} />
            </div>
            <div className="_logo_">
              <ArrowSvg />
            </div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <SettingsSvg />
          </div>
          <div className="arte_">
            <div className="_text_">Settings</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <DataSvg />
          </div>
          <div className="arte_">
            <div className="_text_">Your data in YouTube</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <HelpSvg />
          </div>
          <div className="arte_">
            <div className="_text_">Help</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <FeedSvg />
          </div>
          <div className="arte_">
            <div className="_text_">Send feedback</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <KeyboardSvg />
          </div>
          <div className="arte_">
            <div className="_text_">Keyboard shortcuts</div>
          </div>
        </div>
        <div className={line}></div>
        <div className="wrapper_y">
          <div
            onClick={() => handleShowSemiDrop("RestrictDrop")}
            className={arte_}
          >
            <div className="s_text">
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
