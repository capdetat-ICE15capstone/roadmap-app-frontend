import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { ReactComponent as Triangle } from "../assets/triangleArrow.svg";
import { getProfilePictureSrc } from "../components/SettingProfileImageSelector";
import { motion } from 'framer-motion';

const UserBanner = ({ uid, username, exp, profile_picture_id }) => {
  UserBanner.propTypes = {
    uid: PropTypes.number,
    username: PropTypes.string,
    profile_picture_id: PropTypes.number,
    exp: PropTypes.number,
  };

  const userLevel = Math.floor(exp / 100);

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      whileInView={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className='w-[75%]'
    >
      <Link to={`/home/${uid}`} className="flex justify-between items-center w-full px-4 h-28 border-t-neutral-500 bg-slate-100 hover:bg-slate-200 shadow hover:transform hover:scale-[1.01] transition duration-100">
        <div className='flex items-center w-[60%] space-x-8'>
          <img src={getProfilePictureSrc(profile_picture_id)} className='flex w-16 h-16 rounded-full shrink-0' />
          <div className='flex items-center font-bold text-2xl w-2/5 max-w-sm'>
            {username}
          </div>
          <div className="flex items-center justify-between w-2/5 max-w-sm px-2 py-4 text-sm font-bold text-white bg-blue-700 rounded-full">
            <div className='max-sm:hidden mx-2'>
              LVL:
            </div>
            <div className='mx-2'>
              {userLevel}
            </div>
          </div>
        </div>
        <Triangle className="max-sm:hidden w-3 h-3 transform rotate-90 right-8 fill-current text-[#00286E]" />
      </Link>
    </motion.div>
  );
};

export default UserBanner;
