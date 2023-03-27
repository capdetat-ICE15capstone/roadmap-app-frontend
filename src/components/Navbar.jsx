import React from "react";
import { Outlet, NavLink } from 'react-router-dom';

// Image/Logo SVG
import { ReactComponent as Logo } from "../assets/logo.svg"
import { ReactComponent as FeedLogo } from "../assets/navbar_assets/feed_icon.svg"
import { ReactComponent as HomeLogo } from "../assets/navbar_assets/home_icon.svg"
import { ReactComponent as CalendarLogo } from "../assets/navbar_assets/calendar_icon.svg"
import { ReactComponent as SettingLogo } from "../assets/navbar_assets/setting_icon.svg"
import { ReactComponent as UserLogo } from "../assets/navbar_assets/username_icon.svg"
import { ReactComponent as BellIcon } from "../assets/navbar_assets/bell_icon.svg"
import { ReactComponent as BookIcon } from "../assets/navbar_assets/book_icon.svg"

const NavItem = (props) => {
  // iconClass, navLinkClass, SvgIcon, to, parentDivClass, childDivClass
  return (
    <>
      <NavLink className={`py-3 flex justify-center content-middle hover:bg-yellow-500 hover:scale-105 transition duration-200 ${props.parentDivClass}`} to={props.to}>
        <div className={`overflow-hidden whitespace-nowrap flex ${props.childDivClass}`}>
          <props.SvgIcon className={`w-full h-auto inline ${props.iconClass}`} />
          <div className={`font-nunito-sans text-white font-bold ml-2 justify-self-center ${props.navLinkClass}`} to={props.to}>{props.displayName}</div>
        </div>
      </NavLink>
    </>
  )
}

const Navbar = () => {
  return (
    <>
      <div className="flex fixed h-screen w-screen">
        <div className="md:visible collapse">
          <div className="flex flex-col h-screen bg-nav-blue justify-between">
            <div className="flex flex-col">
              <Logo className="justify-self-center self-center h-12 m-4" />
              <NavItem SvgIcon={HomeLogo} to="/" />
              <NavItem SvgIcon={FeedLogo}  to="/feed" />
              <NavItem SvgIcon={SettingLogo} to="/setting" />
              <NavItem SvgIcon={CalendarLogo} to="/calendar" />
            </div>
            <NavItem SvgIcon={UserLogo} to="/profile"
              parentDivClass="bg-blue-800 py-5" />
          </div>
        </div>
        <div className="flex flex-col grow">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navbar;
