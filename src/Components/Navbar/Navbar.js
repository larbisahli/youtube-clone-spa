import React from "react";
import "./Navbar.scss";
import Menu_icon from "./NavComponents/Icons/Menu_icon";
import YoutubeLogo from "../../Images/Youtube_icon.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="NavContainer">
      <div className="LeftContainer">
        <div className="menuIcon">
          <Menu_icon />
        </div>
        <div className="LogoContainer">
          <Link to="/">
            <img src={YoutubeLogo} alt="Youtube-Clone" className="applogo" />
          </Link>
          <Link to="/">
            <div className="LogoText">YouTube</div>
          </Link>
          <div className="pointer">CLONE</div>
        </div>
      </div>
      <div className="searchContainer">middle</div>
      <div className="RightContainer">right</div>
    </div>
  );
};

export default Navbar;
