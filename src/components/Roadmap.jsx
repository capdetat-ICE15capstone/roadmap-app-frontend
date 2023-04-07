import React, { useState } from 'react';
import PropTypes from 'prop-types';
import placeholderImage from "../assets/roadmap_assets/Placeholder_Image.png"
import RoadmapDropdown from './RoadmapDropdown';
import { ReactComponent as EyeIcon } from "../assets/roadmap_assets/eye_Icon.svg"
import { Link } from "react-router-dom";


const Roadmap = ({ owner_id, creator_id, owner_name, creator_name, rid, views_counts, stars_count, forks_count, created_at, edited_at, title, isActive, isOwner, deleteFunction}) => {
  Roadmap.propTypes = {
    owner_id: PropTypes.number,
    creator_id: PropTypes.number,
    owner_name: PropTypes.string,
    creator_name: PropTypes.string,
    rid: PropTypes.number,
    views_count: PropTypes.number,
    stars_count: PropTypes.number,
    forks_count: PropTypes.number,
    created_at: PropTypes.string,
    edited_at: PropTypes.string,
    title: PropTypes.string
  };

  return (
    <>
      <div className='flex flex-col bg-white rounded-3xl shadow-md w-[200px] h-[220px] m-8 p-2 space-y-1'>
        <Link to={'/view/:id'} className='relative'>
          <img src={placeholderImage} className="rounded-2xl h-full w-full" />
          <div className='absolute bottom-[5%] left-[5%] text-xs'>
            test
          </div>
          <div className='absolute bottom-[5%] right-[5%] text-xs'>
            test
          </div>
        </Link>
        <div className='flex flex-col space-y-1 m-1'>
          <div className='flex flex-row justify-between'>
            <div className='text-xs font-bold'>
              Roadmap...
            </div>
            <div className='text-xs'>
              Fork: 69
            </div>
            <div className='text-xs'>
              Star: 420
            </div>
          </div>
          <div className='flex flex-row justify-between'>
            <div className='text-xs'>
              Owner: Amigo
            </div>
            <div className='text-xs text-gray-500'>
              Created: 1/1/1
            </div>
          </div>
          <div className='flex flex-row'>
            <div className='text-xs'>
              Views: 69420
            </div>
          </div>
        </div>
        {isOwner &&
          <div className='relative flex left-[165px] -top-[20px]'>
          <RoadmapDropdown onDelete={deleteFunction}/>
        </div>}
      </div>
    </>
  );
};

export default Roadmap;