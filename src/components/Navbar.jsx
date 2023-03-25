import React from "react";
import { Outlet, NavLink } from 'react-router-dom';

// Image/Logo SVG
import { ReactComponent as Logo } from "../assets/logo.svg"
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
      <NavLink className={`py-5 flex justify-center content-middle hover:bg-yellow-500 hover:scale-105 transition duration-200 ${props.parentDivClass}`} to={props.to}>
        <div className={`overflow-hidden whitespace-nowrap flex ${props.childDivClass}`}>
          <props.SvgIcon className={`w-6 h-auto inline ${props.iconClass}`} />
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
          <div className="flex flex-col h-screen bg-nav-black justify-between w-36">
            <div className="flex flex-col">
              <Logo className="justify-self-center self-center h-20" />
              <NavItem SvgIcon={HomeLogo} displayName="Home" to="/" />
              <NavItem SvgIcon={SettingLogo} displayName="Setting" to="/setting" />
              <NavItem SvgIcon={CalendarLogo} displayName="Calendar" to="/calendar" />
            </div>
            <NavItem SvgIcon={UserLogo} displayName="Username" to="/profile"
              parentDivClass="bg-nav-gray py-7" />
          </div>
        </div>
        <div className="flex flex-col w-full max-w-full overflow-scroll">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navbar;
