import React, { memo } from "react";
import style from "./sass/profiledrop.module.scss";
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
import { ReturnTheme, GetClassName } from "../../../../utils";
import { LazyLoad } from "../../../ComponentsUtils";
import { useSelector } from "react-redux";

// Using Memo to prevent unnecessary re-renders

const Location = memo(({ loca }) => {
  const location_ = loca.filter((loca) => loca.checked);
  return <span>{`: ${location_[0].loca}`}</span>;
});

const Language = memo(({ lang }) => {
  const Language_ = lang.filter((lang) => lang.checked);
  return <div className={style["txtwrap__txt--lang"]}>{Language_[0].lang}</div>;
});

const ProfileDrop = memo(({ handleShowSemiDrop, show }) => {
  //
  const lang = useSelector((state) => state.Navbar.language);
  const loca = useSelector((state) => state.Navbar.location);
  const accounts = useSelector((state) => state.Navbar.accounts);
  const restrict = useSelector((state) => state.Navbar.restrictMode);
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  //
  const CurrentAccount = accounts.filter((acc) => acc.isCurrent)[0];
  //
  const line = `line line--${ReturnTheme(Theme)}`;
  const block_wrapper = GetClassName(style, "block_wrapper", Theme);
  const arte_ = GetClassName(style, "text_wrap", Theme);

  return (
    <div
      id="profile_drop"
      style={{ display: show ? "" : "none" }}
      className={GetClassName(style, "container", Theme)}
    >
      <div className={style.header}>
        <div className={style.pronail}>
          <img
            className={style.pronail__img}
            src={CurrentAccount.img}
            height="40"
            width="40"
            alt="Avatar"
          />
        </div>
        <div className={style.txtwrap}>
          <div className={style.txtwrap__name}>{CurrentAccount.name}</div>
          <div className={style.txtwrap__email}>{CurrentAccount.email}</div>
          <div className={GetClassName(style, "txtwrap__blue_text", Theme)}>
            Manage your Google Account
          </div>
        </div>
      </div>
      <div className={`line line--${ReturnTheme(Theme)}`}></div>
      <LazyLoad render={show}>
        <div className={style.body}>
          <div className={block_wrapper}>
            <div className={style.block_wrapper__logo}>
              <AvatarSvg />
            </div>
            <div className={style.txtwrap}>
              <div className={style.txtwrap__txt}>Your channel</div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={style.block_wrapper__logo}>
              <SSvg />
            </div>
            <div className={style.txtwrap}>
              <div className={style.txtwrap__txt}>Paid memberships</div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={style.block_wrapper__logo}>
              <YSSvg />
            </div>
            <div className={style.txtwrap}>
              <div className={style.txtwrap__txt}>YouTube Studio</div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={style.block_wrapper__logo}>
              <SASvg />
            </div>
            <div
              onClick={() => handleShowSemiDrop("SADrop")}
              className={style.txtwrap}
            >
              <div className={style.txtwrap__txt}>Switch account</div>
              <div className={style.block_wrapper__logo}>
                <ArrowSvg />
              </div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={style.block_wrapper__logo}>
              <SOSvg />
            </div>
            <div className={style.txtwrap}>
              <div className={style.txtwrap__txt}>Sign out</div>
            </div>
          </div>
          <div
            style={{ margin: "5px 0", paddingTop: "1px", height: "2px" }}
            className={line}
          ></div>
          <div className={block_wrapper}>
            <div className={style.block_wrapper__logo}>
              <TSvg />
            </div>
            <div
              onClick={() => handleShowSemiDrop("ThemeDrop")}
              className={style.txtwrap}
            >
              <div className={style.txtwrap__txt}>{`Dark theme: ${
                Theme ? "On" : "Off"
              }`}</div>
              <div className={style.block_wrapper__logo}>
                <ArrowSvg />
              </div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={style.block_wrapper__logo}>
              <LangSvg />
            </div>
            <div
              onClick={() => handleShowSemiDrop("LangDrop")}
              className={style.txtwrap}
            >
              <div className={style.txtwrap__txt}>
                Language: <Language lang={lang} />
              </div>
              <div className={style.block_wrapper__logo}>
                <ArrowSvg />
              </div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={style.block_wrapper__logo}>
              <LocaSvg />
            </div>
            <div
              onClick={() => handleShowSemiDrop("LocaDrop")}
              className={style.txtwrap}
            >
              <div className={style.txtwrap__txt}>
                Location <Location loca={loca} />
              </div>
              <div className={style.block_wrapper__logo}>
                <ArrowSvg />
              </div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={style.block_wrapper__logo}>
              <SettingsSvg default_={true} />
            </div>
            <div className={style.txtwrap}>
              <div className={style.txtwrap__txt}>Settings</div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={style.block_wrapper__logo}>
              <DataSvg />
            </div>
            <div className={style.txtwrap}>
              <div className={style.txtwrap__txt}>Your data in YouTube</div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={style.block_wrapper__logo}>
              <HelpSvg default_={true} />
            </div>
            <div className={style.txtwrap}>
              <div className={style.txtwrap__txt}>Help</div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={style.block_wrapper__logo}>
              <FeedSvg default_={true} />
            </div>
            <div className={style.txtwrap}>
              <div className={style.txtwrap__txt}>Send feedback</div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={style.block_wrapper__logo}>
              <KeyboardSvg />
            </div>
            <div className={style.txtwrap}>
              <div className={style.txtwrap__txt}>Keyboard shortcuts</div>
            </div>
          </div>
          <div
            style={{ margin: "5px 0", paddingTop: "1px", height: "2px" }}
            className={line}
          ></div>
          <div className={style.bottom_wrapper}>
            <div
              onClick={() => handleShowSemiDrop("RestrictDrop")}
              className={arte_}
            >
              <div className={style["text_wrap--res"]}>
                {`Restricted Mode: ${restrict.isRestrict ? "On" : "Off"}`}
              </div>
              <div>
                <ArrowSvg />
              </div>
            </div>
          </div>
        </div>
      </LazyLoad>
    </div>
  );
});

export default ProfileDrop;
