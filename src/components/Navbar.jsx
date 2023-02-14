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

const NavItem = ( props ) => {
  // iconClass, navLinkClass, SvgIcon, to, parentDivClass, childDivClass
  return (
    <>
      <div className={`p-5 flex justify-center content-middle ${props.parentDivClass}`}>
        <div className={`overflow-hidden whitespace-nowrap flex ${props.childDivClass}`}>
          <props.SvgIcon className={`w-6 h-auto inline ${props.iconClass}`}/>
          <NavLink className={`font-nunito-sans text-white font-bold ml-2 justify-self-center ${props.navLinkClass}`} to={props.to}>{props.displayName}</NavLink>
        </div>
      </div>
    </>
  )
}

const Navbar = () => {
  return (
    <>
      <div className="flex fixed">
        <div className="flex flex-col h-screen bg-nav-black justify-between">
          <div className="flex flex-col">
            <Logo className="justify-self-center self-center h-20"/>
            <NavItem SvgIcon={HomeLogo} displayName="Home" to="/"/>
            <NavItem SvgIcon={SettingLogo} displayName="Setting" to="/setting"/>
            <NavItem SvgIcon={CalendarLogo} displayName="Calendar" to="/calendar"/>
          </div>
          <NavItem SvgIcon={UserLogo} displayName="Username" to="/profile" 
                  parentDivClass="bg-nav-gray py-7"/>
        </div>
        <div className="flex flex-col">
            <div className="w-screen h-20 bg-nav-gray p-4 flex">
              <div className="flex">
                <BellIcon className="self-center w-10 px-2"/>
                <BookIcon className="self-center px-2 w-10"/>
              </div>
            </div>
            <Outlet/>
        </div>
      </div>
      
    </>
  );
};

export default Navbar;
