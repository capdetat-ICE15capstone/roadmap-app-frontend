import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { ReactComponent as Triangle } from "../assets/triangleArrow.svg";

const UserBanner = ({ owner_id, owner_name, user_exp, avatar_id }) => {
    UserBanner.propTypes = {
        owner_id: PropTypes.number,
        owner_name: PropTypes.string,
        user_exp: PropTypes.number,
        avatar_id: PropTypes.string,
    };

    const userLevel = Math.floor(user_exp / 100);

    return (
        <Link to={`/home/${owner_id}`} className="flex items-center max-w-screen-md h-28 mx-auto my-2 border-t-neutral-500 bg-slate-100 hover:bg-slate-200 shadow hover:transform hover:scale-[1.01] transition duration-100">
            <img src={avatar_id} alt="Avatar" className="w-20 h-auto rounded-full ml-4" />
            <div className='relative container ml-6 flex items-center'>
                <h2 className="flex items-center text-xl font-medium text-black truncate w-1/2">{owner_name}</h2>
                <h2 className="absolute flex items-center justify-center text-lg font-medium text-white bg-blue-700 w-40 h-12 right-52 rounded-full">Level: {userLevel}</h2>
                <Triangle className="absolute w-3 h-3 transform rotate-90 right-8 fill-current text-[#00286E]"/>
            </div>
        </Link>


    );
};

export default UserBanner;
