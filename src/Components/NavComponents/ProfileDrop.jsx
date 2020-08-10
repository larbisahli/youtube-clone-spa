import React, { memo, Fragment } from "react";
import styles from "./scss/profiledrop.module.scss";
import { SettingsSvg, HelpSvg, FeedSvg } from "../CompSvg";
import { ReactComponent as KeyboardSvg } from "../../assets/icon/Keyboard.svg";
import { ReactComponent as SSvg } from "../../assets/icon/ss.svg";
import { ReactComponent as YSSvg } from "../../assets/icon/ys.svg";
import { ReactComponent as SASvg } from "../../assets/icon/sa.svg";
import { ReactComponent as SOSvg } from "../../assets/icon/so.svg";
import { ReactComponent as TSvg } from "../../assets/icon/t.svg";
import { ReactComponent as LangSvg } from "../../assets/icon/Lang.svg";
import { ReactComponent as DataSvg } from "../../assets/icon/Data.svg";
import { ReactComponent as ArrowSvg } from "../../assets/icon/Arrow.svg";
import { ReactComponent as AvatarSvg } from "../../assets/icon/Avatar.svg";
import { LazyRender } from "../CompUtils";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

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
          <PItem label="Your channel">
            <AvatarSvg />
          </PItem>

          <PItem label="Paid memberships">
            <SSvg />
          </PItem>

          <PItem
            label="Enter your API key"
            isRight={true}
            Theme={Theme}
            onclick={() => handleShowSemiDrop("APIKey")}
          >
            <YSSvg />
          </PItem>

          <PItem
            label="Switch account"
            isRight={true}
            Theme={Theme}
            onclick={() => handleShowSemiDrop("SADrop")}
          >
            <SASvg />
          </PItem>

          <PItem label="Sign out">
            <SOSvg />
          </PItem>

          <div
            style={{ margin: "5px 0", paddingTop: "1px", height: "2px" }}
            className="line"
          ></div>

          <PItem
            label={`Dark theme: ${Theme ? "On" : "Off"}`}
            isRight={true}
            Theme={Theme}
            onclick={() => handleShowSemiDrop("ThemeDrop")}
          >
            <TSvg />
          </PItem>

          <PItem
            label={<Fragment>Language:{<Language lang={lang} />}</Fragment>}
            isRight={true}
            Theme={Theme}
            onclick={() => handleShowSemiDrop("LangDrop")}
          >
            <LangSvg />
          </PItem>

          <PItem
            label={
              <Fragment>
                Location <Location loca={loca} />
              </Fragment>
            }
            isRight={true}
            Theme={Theme}
            onclick={() => handleShowSemiDrop("LocaDrop")}
          >
            <LangSvg />
          </PItem>

          <PItem label="Settings">
            <SettingsSvg Theme={Theme} default_={true} />
          </PItem>

          <PItem label="Your data in YouTube">
            <DataSvg />
          </PItem>

          <PItem label="Help">
            <HelpSvg Theme={Theme} default_={true} />
          </PItem>

          <PItem label="Send feedback">
            <FeedSvg Theme={Theme} default_={true} />
          </PItem>

          <PItem label="Keyboard shortcuts">
            <KeyboardSvg />
          </PItem>

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
                <ArrowSvg />
              </div>
            </div>
          </div>
        </div>
      </LazyRender>
    </div>
  );
};

const Location = memo(({ loca }) => {
  const location_ = loca.filter((loca) => loca.checked);
  return <span>{`: ${location_[0].loca}`}</span>;
});

const Language = memo(({ lang }) => {
  const Language_ = lang.filter((lang) => lang.checked);
  return <div className={cx("txtwrap__txt--lang")}>{Language_[0].lang}</div>;
});

const PItem = ({
  isRight = false,
  children,
  label,
  Theme = null,
  onclick = () => {},
}) => {
  return (
    <div onClick={onclick} className={styles.block_wrapper}>
      <div className={styles.block_wrapper__logo}>{children}</div>
      <div className={styles.txtwrap}>
        <div className={styles.txtwrap__txt}>{label}</div>
      </div>
      {isRight && (
        <div className={styles.block_wrapper__logo}>
          <ArrowSvg />
        </div>
      )}
    </div>
  );
};

export default memo(ProfileDrop);
