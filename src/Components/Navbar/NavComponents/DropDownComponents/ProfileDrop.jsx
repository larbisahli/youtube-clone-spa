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
import { LazyRender } from "../../../ComponentsUtils";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

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
  const CurrentAccount = accounts.filter((acc) => acc.isCurrent)[0];

  return (
    <div
      id="profile_drop"
      style={{ display: show ? "" : "none" }}
      className={styles.container}
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
          <div className={styles.txtwrap__blue_text}>
            Manage your Google Account
          </div>
        </div>
      </div>
      <div className={"line"}></div>
      <LazyRender render={show}>
        <div className={styles.body}>
          <div className={styles.block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <AvatarSvg Theme={Theme} />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Your channel</div>
            </div>
          </div>
          <div className={styles.block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <SSvg Theme={Theme} />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Paid memberships</div>
            </div>
          </div>
          <div className={styles.block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <YSSvg Theme={Theme} />
            </div>

            <div
              onClick={() => handleShowSemiDrop("APIKey")}
              className={styles.txtwrap}
            >
              <div className={styles.txtwrap__txt}>Enter your API key</div>
              <div className={styles.block_wrapper__logo}>
                <ArrowSvg Theme={Theme} />
              </div>
            </div>
          </div>
          <div className={styles.block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <SASvg Theme={Theme} />
            </div>
            <div
              onClick={() => handleShowSemiDrop("SADrop")}
              className={styles.txtwrap}
            >
              <div className={styles.txtwrap__txt}>Switch account</div>
              <div className={styles.block_wrapper__logo}>
                <ArrowSvg Theme={Theme} />
              </div>
            </div>
          </div>
          <div className={styles.block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <SOSvg Theme={Theme} />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Sign out</div>
            </div>
          </div>
          <div
            style={{ margin: "5px 0", paddingTop: "1px", height: "2px" }}
            className="line"
          ></div>
          <div className={styles.block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <TSvg Theme={Theme} />
            </div>
            <div
              onClick={() => handleShowSemiDrop("ThemeDrop")}
              className={styles.txtwrap}
            >
              <div className={styles.txtwrap__txt}>{`Dark theme: ${
                Theme ? "On" : "Off"
              }`}</div>
              <div className={styles.block_wrapper__logo}>
                <ArrowSvg Theme={Theme} />
              </div>
            </div>
          </div>
          <div className={styles.block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <LangSvg Theme={Theme} />
            </div>
            <div
              onClick={() => handleShowSemiDrop("LangDrop")}
              className={styles.txtwrap}
            >
              <div className={styles.txtwrap__txt}>
                Language: <Language lang={lang} />
              </div>
              <div className={styles.block_wrapper__logo}>
                <ArrowSvg Theme={Theme} />
              </div>
            </div>
          </div>
          <div className={styles.block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <LocaSvg Theme={Theme} />
            </div>
            <div
              onClick={() => handleShowSemiDrop("LocaDrop")}
              className={styles.txtwrap}
            >
              <div className={styles.txtwrap__txt}>
                Location <Location loca={loca} />
              </div>
              <div className={styles.block_wrapper__logo}>
                <ArrowSvg Theme={Theme} />
              </div>
            </div>
          </div>
          <div className={styles.block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <SettingsSvg Theme={Theme} default_={true} />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Settings</div>
            </div>
          </div>
          <div className={styles.block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <DataSvg Theme={Theme} />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Your data in YouTube</div>
            </div>
          </div>
          <div className={styles.block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <HelpSvg Theme={Theme} default_={true} />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Help</div>
            </div>
          </div>
          <div className={styles.block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <FeedSvg Theme={Theme} default_={true} />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Send feedback</div>
            </div>
          </div>
          <div className={styles.block_wrapper}>
            <div className={styles.block_wrapper__logo}>
              <KeyboardSvg Theme={Theme} />
            </div>
            <div className={styles.txtwrap}>
              <div className={styles.txtwrap__txt}>Keyboard shortcuts</div>
            </div>
          </div>
          <div
            style={{ margin: "5px 0", paddingTop: "1px", height: "2px" }}
            className="line"
          ></div>
          <div className={styles.bottom_wrapper}>
            <div
              onClick={() => handleShowSemiDrop("RestrictDrop")}
              className={styles.text_wrap}
            >
              <div className={cx("text_wrap--res")}>
                {`Restricted Mode: ${restrict.isRestrict ? "On" : "Off"}`}
              </div>
              <div>
                <ArrowSvg Theme={Theme} />
              </div>
            </div>
          </div>
        </div>
      </LazyRender>
    </div>
  );
};

export default memo(ProfileDrop);
