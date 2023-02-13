import React from "react";
import { Outlet, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div className="flex">
        <div className="flex flex-col box-content h-screen bg-nav-black w-20 p-7">
            <span className="text-white font-bold text-xl mx-auto">Sidebar</span>
            <NavLink className="items-center pt-10 text-white font-bold mx-auto" to="/">Home</NavLink>
            <NavLink className="pt-7 text-white font-bold mx-auto" to="/setting">Setting</NavLink>
            <NavLink className="items-center pt-7 text-white font-bold mx-auto" to="/calendar">Calendar</NavLink>
            <NavLink className="pt-7 text-white font-bold mt-auto mx-auto" to="/profile">User</NavLink>
        </div>
        <div className="flex flex-col">
            <div className="box-content w-screen h-10 bg-nav-gray p-4 text-white font-bold text-xl">Top bar</div>
            <Outlet/>
        </div>
      </div>
      
    </>
  );
};

export default Navbar;
