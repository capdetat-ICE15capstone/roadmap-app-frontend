import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';

// Image/Logo SVG
import { ReactComponent as Logo } from "../assets/logo.svg"
import { ReactComponent as FeedLogo } from "../assets/navbar_assets/feed_icon.svg"
import { ReactComponent as HomeLogo } from "../assets/navbar_assets/home_icon.svg"
import { ReactComponent as CalendarLogo } from "../assets/navbar_assets/calendar_icon.svg"
import { ReactComponent as SettingLogo } from "../assets/navbar_assets/setting_icon.svg"
import { ReactComponent as BookIcon } from "../assets/navbar_assets/book_icon.svg"
import { ReactComponent as ShopIcon } from "../assets/shapes/shopping_bag_white.svg"
import { ReactComponent as Logout } from "../assets/shapes/logout.svg";
import { axiosInstance } from "../functions/axiosInstance";

const NavItem = (props) => {
  return (
    <>
      <NavLink className={`relative flex items-center max-md:justify-center md:justify-start md:pl-8 w-full h-16 ${props.baseColor} hover:bg-sub-blue hover:scale-105 hover:z-10 transition group duration-200`} to={props.to}>
        <div className="flex items-center space-x-4">
          <div className="flex shrink-0">
            <props.SvgIcon className="w-10" />
          </div>
          <div className="flex flex-grow max-md:hidden text-white font-bold">
            {props.displayName}
          </div>
        </div>
        <div className="md:hidden max-xs:hidden absolute top-1/2 xs:left-[170%] transform -translate-x-1/2 -translate-y-1/2 py-2 px-3 rounded-md transition-all duration-100 scale-0 origin-left bg-nav-blue text-white font-bold group-hover:scale-100">{props.displayName}</div>
      </NavLink>
    </>
  )
}

const Navbar = () => {
  const navigate = useNavigate();

  const [isPremium, setIsPremium] = useState(true);
  const isMountedRef = useRef(false);

  const checkIsPremium = async () => {
    try {
      const response = await axiosInstance.get('/home/me');
      setIsPremium(response.data.profile.is_premium);
    } catch (error) {
      console.error(error);
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    if (localStorage.getItem('saved_email') !== null && localStorage.getItem('saved_password') !== null) {
      localStorage.removeItem('saved_email');
      localStorage.removeItem('saved_password');
    }
    navigate('/login');
  }

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
    } else {
      return;
    }
    checkIsPremium();
  }, []);

  return (
    <>
      <div className="fixed flex max-xs:flex-col xs:flex-row-reverse h-full w-full">
        <div className="flex xs:hidden max-xs:visible">
          <div className="flex items-center justify-between bg-nav-blue w-full h-16">
            <div className="flex items-center h-full ml-4 space-x-2">
              <Logo className="p-2" />
              <div className="text-white text-3xl font-bold">
                MileMap
              </div>
            </div>
            <div className="w-20">
              <NavItem SvgIcon={Logout} displayName="Profile" baseColor="bg-base-blue" to="/" />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow h-full bg-white overflow-x-hidden">
        {!isPremium && 
          <motion.div className="flex justify-center h-fit min-h-[100px] bg-nav-blue"
            initial={{ display: "none" }}
            animate={{ display: "flex" }}
            transition={{
              type: "easeInOut",
              delay: "2"
            }}
          > 
            <AnimatePresence>
              <Link to={`/premium`} className="relative flex flex-col items-center min-w-[180px] w-2/3 h-full mx-auto bg-base-blue">
                <motion.div className="absolute flex w-full h-full justify-center items-center font-inter font-semibold max-md:text-2xl text-4xl text-[#FFFFFF]"
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    repeat: "infinity",
                    repeatType: "reverse",
                    repeatDelay: "20",
                    delay: "2",
                    duration: "1",
                    times: [0, 0.5, 3.5, 4]
                  }}>
                  Hate our ad?
                </motion.div>
                <motion.div className="absolute flex flex-col w-full h-full justify-center items-center font-inter font-semibold max-xs:text-base max-md:text-lg text-2xl text-[#FFFFFF]"
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    repeat: "infinity",
                    repeatType: "reverse",
                    repeatDelay: "20",
                    delay: "2",
                    duration: "1",
                    times: [4, 4.5, 9.5, 10]
                  }}>
                  <div className="flex justify-between items-center w-[90%]">
                    <div>
                      <div className="mb-2">
                        Premium account is the answer
                      </div>
                      <div className="flex justify-center bg-[#FFFFFF] text-[#000000] max-xs:text-xs text-base min-w-fit w-1/4 h-fit rounded-full">
                        Click Here
                      </div>        
                    </div>
                    <div>
                      <Logo/>
                    </div>
                  </div>
                </motion.div>
                <motion.div className="absolute flex w-full h-full justify-center items-center font-inter font-semibold max-md:text-2xl text-4xl text-[#FFFFFF]"
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    repeat: "infinity",
                    repeatType: "reverse",
                    repeatDelay: "20",
                    delay: "2",
                    duration: "1",
                    times: [10, 10.5, 13.5, 14]
                  }}>
                  Bored of ad display?
                </motion.div>
                <motion.div className="absolute flex flex-col w-full h-full justify-center items-center font-inter font-semibold max-xs:text-base max-md:text-lg text-2xl text-[#FFFFFF]"
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    repeat: "infinity",
                    repeatType: "reverse",
                    repeatDelay: "20",
                    delay: "2",
                    duration: "1",
                    times: [14, 14.5, 19.5, 20]
                  }}>
                  <div className="flex justify-between items-center w-[90%]">
                    <div>
                      <div className="mb-2">
                        What are you waiting for, buy premium
                      </div>
                      <div className="flex justify-center bg-[#FFFFFF] text-[#000000] max-xs:text-xs text-base min-w-fit w-1/4 h-fit rounded-full">
                        Click Here
                      </div>
                    </div>
                    <div>
                      <Logo/>  
                    </div>                   
                  </div>
                </motion.div>
              </Link>
            </AnimatePresence>            
          </motion.div>}
          <div className="overflow-y-auto z-10">
            <Outlet />
          </div>
        </div>
        <div className="flex xs:hidden max-xs:visible bg-nav-blue">
          <NavItem SvgIcon={HomeLogo} displayName="Home" baseColor="bg-nav-blue" to="/" />
          <NavItem SvgIcon={FeedLogo} displayName="Feed" baseColor="bg-nav-blue" to="/feed" />
          <NavItem SvgIcon={BookIcon} displayName="Activity" baseColor="bg-nav-blue" to="/activity" />
          <NavItem SvgIcon={ShopIcon} displayName="Shop" baseColor="bg-nav-blue" to="/shop" />
          <NavItem SvgIcon={SettingLogo} displayName="Setting" baseColor="bg-nav-blue" to="/setting" />
        </div>
        <div className="max-xs:hidden flex flex-col items-center justify-between max-md:w-18 md:w-[180px] bg-nav-blue shrink-0">
          <div className="w-full">
            <div className="w-full flex justify-center items-center bg-base-blue px-4 space-x-4 h-[100px]">
              <Logo className="my-2" />
              <div className=" w-[60%] max-md:hidden text-white text-xl font-bold">
                MileMap
              </div>
            </div>
            <div className="flex flex-col">
              <NavItem SvgIcon={HomeLogo} displayName="Home" baseColor="bg-nav-blue" to="/" />
              <NavItem SvgIcon={FeedLogo} displayName="Feed" baseColor="bg-nav-blue" to="/feed" />
              <NavItem SvgIcon={BookIcon} displayName="Activity" baseColor="bg-nav-blue" to="/activity" />
              <NavItem SvgIcon={ShopIcon} displayName="Shop" baseColor="bg-nav-blue" to="/shop" />
              <NavItem SvgIcon={SettingLogo} displayName="Setting" baseColor="bg-nav-blue" to="/setting" />
            </div>
          </div>
          <button className="w-full" onClick={() => handleLogout()}>
            <NavItem SvgIcon={Logout} displayName="Log Out" baseColor="bg-base-blue" to="/login" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
