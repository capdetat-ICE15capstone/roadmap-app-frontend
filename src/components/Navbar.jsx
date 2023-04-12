import React from "react";
import { Outlet, NavLink } from 'react-router-dom';

// Image/Logo SVG
import { ReactComponent as Logo } from "../assets/logo.svg"
import { ReactComponent as FeedLogo } from "../assets/navbar_assets/feed_icon.svg"
import { ReactComponent as HomeLogo } from "../assets/navbar_assets/home_icon.svg"
import { ReactComponent as CalendarLogo } from "../assets/navbar_assets/calendar_icon.svg"
import { ReactComponent as SettingLogo } from "../assets/navbar_assets/setting_icon.svg"
import { ReactComponent as UserLogo } from "../assets/navbar_assets/username_icon.svg"
import { ReactComponent as BookIcon } from "../assets/navbar_assets/book_icon.svg"

const NavItem = (props) => {
  return (
    <>
      <NavLink className={`relative flex items-center max-md:justify-center md:justify-start md:pl-8 w-full h-16 ${props.baseColor} hover:bg-sub-blue hover:scale-105 transition group duration-200`} to={props.to}>
        <div className="flex items-center gap-4">
          <div className="flex shrink-0">
            <props.SvgIcon className="w-10" />
          </div>
          <div className="flex flex-grow max-md:hidden text-white font-bold">
            {props.displayName}
          </div>
        </div>
        <div className="md:hidden absolute top-1/2 left-[170%] transform -translate-x-1/2 -translate-y-1/2 py-2 px-3 rounded-md transition-all duration-100 scale-0 origin-left bg-nav-blue text-white font-bold group-hover:scale-100">{props.displayName}</div>
      </NavLink>
    </>
  )
}

const Navbar = () => {
  return (
    <>
      <div className="fixed flex h-screen w-screen">
        <div className="flex flex-col items-center justify-between max-md:w-18 md:w-[180px] bg-nav-blue shrink-0 z-50">
          <div className="w-full">
            <div className="w-full flex justify-center items-center bg-base-blue px-4 gap-4">
              <Logo className="my-2" />
              <div className=" w-[60%] max-md:hidden text-white text-xl font-bold">
                MileMap
              </div>
            </div>
            <NavItem SvgIcon={HomeLogo} displayName="Home" baseColor="bg-nav-blue" to="/" />
            <NavItem SvgIcon={FeedLogo} displayName="Feed" baseColor="bg-nav-blue" to="/feed" />
            <NavItem SvgIcon={BookIcon} displayName="Quest" baseColor="bg-nav-blue" to="/quest" />
            <NavItem SvgIcon={CalendarLogo} displayName="Shop" baseColor="bg-nav-blue" to="/shop" />
            <NavItem SvgIcon={SettingLogo} displayName="Setting" baseColor="bg-nav-blue" to="/setting" />
          </div>
          <div className="w-full">
            <NavItem SvgIcon={UserLogo} displayName="Profile" baseColor="bg-blue-900" to="/" />
          </div>
        </div>
        <div className="flex flex-col flex-grow z-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navbar;
