import React, { memo } from "react";
import styles from "./scss/profiledrop.module.scss";
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
import { LazyRender } from "../../../ComponentsUtils";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

// Using Memo to prevent unnecessary re-renders

const Location = memo(({ loca }) => {
  const location_ = loca.filter((loca) => loca.checked);
  return <span>{`: ${location_[0].loca}`}</span>;
});

const Language = memo(({ lang }) => {
  const Language_ = lang.filter((lang) => lang.checked);
  return <div className={cx("txtwrap__txt--lang")}>{Language_[0].lang}</div>;
});

const ProfileDrop = ({ handleShowSemiDrop, show }) => {
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
  const block_wrapper = GetClassName(styles, "block_wrapper", Theme);
  const arte_ = GetClassName(styles, "text_wrap", Theme);

  return (
    <div
      id="profile_drop"
      style={{ display: show ? "" : "none" }}
      className={GetClassName(styles, "container", Theme)}
    >
      <div className={styles.header}>
        <div className={styles.pronail}>
          <img
            className={styles.pronail__img}
            src={CurrentAccount.img}
            height="40"
            width="40"
            alt="Avatar"
          />
        </div>
        <div className={styles.txtwrap}>
          <div className={styles.txtwrap__name}>{CurrentAccount.name}</div>
          <div className={styles.txtwrap__email}>{CurrentAccount.email}</div>
          <div className={GetClassName(styles, "txtwrap__blue_text", Theme)}>
            Manage your Google Account
          </div>
        </div>
      </div>
      <div className={`line line--${ReturnTheme(Theme)}`}></div>
      <LazyRender render={show}>
        <div className={styles.body}>
          <div className={block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <AvatarSvg />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Your channel</div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <SSvg />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Paid memberships</div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <YSSvg />
            </div>

            <div
              onClick={() => handleShowSemiDrop("APIKey")}
              className={styles.txtwrap}
            >
              <div className={styles.txtwrap__txt}>Enter your API key</div>
              <div className={styles.block_wrapper__logo}>
                <ArrowSvg />
              </div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <SASvg />
            </div>
            <div
              onClick={() => handleShowSemiDrop("SADrop")}
              className={styles.txtwrap}
            >
              <div className={styles.txtwrap__txt}>Switch account</div>
              <div className={styles.block_wrapper__logo}>
                <ArrowSvg />
              </div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <SOSvg />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Sign out</div>
            </div>
          </div>
          <div
            style={{ margin: "5px 0", paddingTop: "1px", height: "2px" }}
            className={line}
          ></div>
          <div className={block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <TSvg />
            </div>
            <div
              onClick={() => handleShowSemiDrop("ThemeDrop")}
              className={styles.txtwrap}
            >
              <div className={styles.txtwrap__txt}>{`Dark theme: ${
                Theme ? "On" : "Off"
              }`}</div>
              <div className={styles.block_wrapper__logo}>
                <ArrowSvg />
              </div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <LangSvg />
            </div>
            <div
              onClick={() => handleShowSemiDrop("LangDrop")}
              className={styles.txtwrap}
            >
              <div className={styles.txtwrap__txt}>
                Language: <Language lang={lang} />
              </div>
              <div className={styles.block_wrapper__logo}>
                <ArrowSvg />
              </div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <LocaSvg />
            </div>
            <div
              onClick={() => handleShowSemiDrop("LocaDrop")}
              className={styles.txtwrap}
            >
              <div className={styles.txtwrap__txt}>
                Location <Location loca={loca} />
              </div>
              <div className={styles.block_wrapper__logo}>
                <ArrowSvg />
              </div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <SettingsSvg default_={true} />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Settings</div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <DataSvg />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Your data in YouTube</div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <HelpSvg default_={true} />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Help</div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <FeedSvg default_={true} />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Send feedback</div>
            </div>
          </div>
          <div className={block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <KeyboardSvg />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Keyboard shortcuts</div>
            </div>
          </div>
          <div
            style={{ margin: "5px 0", paddingTop: "1px", height: "2px" }}
            className={line}
          ></div>
          <div className={styles.bottom_wrapper}>
            <div
              onClick={() => handleShowSemiDrop("RestrictDrop")}
              className={arte_}
            >
              <div className={cx("text_wrap--res")}>
                {`Restricted Mode: ${restrict.isRestrict ? "On" : "Off"}`}
              </div>
              <div>
                <ArrowSvg />
              </div>
            </div>
          </div>
        </div>
      </LazyRender>
    </div>
  );
};

export default memo(ProfileDrop);
