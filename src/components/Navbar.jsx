import React from "react";
import { Outlet, NavLink } from 'react-router-dom'

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
          <NavLink className={`font-nunito-sans text-white font-bold ml-2 justify-self-center ${props.navLinkClass}`} to={props.to}>{props.displayName}</NavLink>
        </div>
      </NavLink>
    </>
  )
}

const Navbar = () => {
  return (
    <>
      <div className="flex fixed h-screen w-screen">
        <div className="flex flex-col h-screen bg-nav-black justify-between w-0 md:w-36">
          <div className="flex flex-col">
            <Logo className="justify-self-center self-center h-20" />
            <NavItem SvgIcon={HomeLogo} displayName="Home" to="/" />
            <NavItem SvgIcon={SettingLogo} displayName="Setting" to="/setting" />
            <NavItem SvgIcon={CalendarLogo} displayName="Calendar" to="/calendar" />
          </div>
          <NavItem SvgIcon={UserLogo} displayName="Username" to="/profile"
            parentDivClass="bg-nav-gray py-7" />
        </div>
        <div className="flex flex-col grow">
          <div className="sticky top-0 left-0 h-20 bg-nav-gray p-4 flex justify-end">
            <div className="flex">
              <BellIcon className="self-center w-10 px-2 hover:scale-110 transition duration-300" />
              <BookIcon className="self-center px-2 w-10 hover:scale-110 transition duration-300" />
            </div>
            
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navbar;
