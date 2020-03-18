import React, { useContext, useCallback } from "react";
import "./profile_drop.scss";
import {
  AvatarIcon,
  ArrowIcon,
  SIcon,
  YSIcon,
  SAIcon,
  SOIcon,
  TIcon,
  LangIcon,
  SettingsIcon,
  DataIcon,
  HelpIcon,
  FeedIcon,
  KeyboardIcon,
  LocaIcon
} from "../Icons";
import { NavContext } from "../../../../Context/NavContext";
import { ThemeContext } from "../../../../Context/ThemeContext";

// Using Memo to prevent unnecessary re-renders

const Location = React.memo(({ loca }) => {
  const location_ = loca.filter(loca => loca.checked);
  return <div className="loca_">{`: ${location_[0].loca}`}</div>;
});

const Language = React.memo(({ lang }) => {
  const Language_ = lang.filter(lang => lang.checked);
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

  const IsCurrentAccount = useCallback(acc.filter(acc => acc.isCurrent)[0], [
    acc
  ]);

  const line = `line_b line_b-${Theme ? "dark" : "light"}`;

  const wrapper_x = `wrapper_x wrapper_x-${Theme ? "dark" : "light"}`;

  const arte_ = `arte_ arte_-${Theme ? "dark" : "light"}`;

  return (
    <div
      id="profile_drop"
      className={`profile_Container profile_Container-${
        Theme ? "dark" : "light"
      }`}
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
          <div className={`blue_text ${Theme ? "db" : "lb"}`}>
            Manage your Google Account
          </div>
        </div>
      </div>
      <div className={`line_a line_a-${Theme ? "dark" : "light"}`}></div>
      <div className="f_container">
        <div className={wrapper_x}>
          <div className="_logo_">
            <AvatarIcon />
          </div>
          <div className="arte_">
            <div className="_text_">Your channel</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <SIcon />
          </div>
          <div className="arte_">
            <div className="_text_">Paid memberships</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <YSIcon />
          </div>
          <div className="arte_">
            <div className="_text_">YouTube Studio</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <SAIcon />
          </div>
          <div onClick={() => handleShowSemiDrop("SADrop")} className="arte_">
            <div className="_text_">Switch account</div>
            <div className="_logo_">
              <ArrowIcon />
            </div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <SOIcon />
          </div>
          <div className="arte_">
            <div className="_text_">Sign out</div>
          </div>
        </div>
        <div className={line}></div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <TIcon />
          </div>
          <div
            onClick={() => handleShowSemiDrop("ThemeDrop")}
            className="arte_"
          >
            <div className="_text_">{`Dark theme: ${
              Theme ? "On" : "Off"
            }`}</div>
            <div className="_logo_">
              <ArrowIcon />
            </div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <LangIcon />
          </div>
          <div onClick={() => handleShowSemiDrop("LangDrop")} className="arte_">
            <div className="_text_">
              Language: <Language lang={lang} />
            </div>
            <div className="_logo_">
              <ArrowIcon />
            </div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <LocaIcon />
          </div>
          <div onClick={() => handleShowSemiDrop("LocaDrop")} className={arte_}>
            <div className="_text_">
              Location <Location loca={loca} />
            </div>
            <div className="_logo_">
              <ArrowIcon />
            </div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <SettingsIcon />
          </div>
          <div className="arte_">
            <div className="_text_">Settings</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <DataIcon />
          </div>
          <div className="arte_">
            <div className="_text_">Your data in YouTube</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <HelpIcon />
          </div>
          <div className="arte_">
            <div className="_text_">Help</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <FeedIcon />
          </div>
          <div className="arte_">
            <div className="_text_">Send feedback</div>
          </div>
        </div>
        <div className={wrapper_x}>
          <div className="_logo_">
            <KeyboardIcon />
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
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileDrop;
