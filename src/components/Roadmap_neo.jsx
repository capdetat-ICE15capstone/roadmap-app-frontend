import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import placeholderImage from "../assets/roadmap_assets/Placeholder_Image.png"
import { ReactComponent as EyeIcon } from "../assets/roadmap_assets/eye_Icon.svg"
import { ReactComponent as ShareIcon } from "../assets/roadmap_assets/Share.svg"
import { ReactComponent as LikeIcon } from "../assets/roadmap_assets/ThumbsUp.svg"

const Roadmap = ({ owner_id, creator_id, owner_name, creator_name, rid, views_count, stars_count, forks_count, created_at, edited_at, title }) => {

  //parameters of roadmap
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

  // change created_at to dd/mm/yy format
  const date = new Date(created_at);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; 
  const year = date.getUTCFullYear().toString().substr(-2);
  const created_at_format = `${day}/${month}/${year}`;

  // change edited_at to dd/mm/yy format
  const date2 = new Date(edited_at);
  const day2 = date2.getUTCDate();
  const month2 = date2.getUTCMonth() + 1; 
  const year2 = date2.getUTCFullYear().toString().substr(-2);
  const edited_at_format = `${day2}/${month2}/${year2}`;

  //navigage to roadmap owner's home page on click
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/home/${owner_id}`);
  };

  return (
    <>
      <div>
        <Link to={`/view/${owner_id}`} >
          <div className='flex flex-col bg-white rounded-3xl shadow-md w-[280px] h-[300px] p-2 space-y-1 hover:transform hover:scale-110 transition duration-150'>
            <div className='relative'>
              <img src={placeholderImage} className="rounded-2xl h-full w-full" />
              <div className='absolute bottom-[5%] left-[5%] text-xs font-bold'>
                {creator_name}
              </div>
              <div className='absolute bottom-[5%] right-[5%] text-xs text-gray-600'>
                Last updated: {edited_at_format}
              </div>
            </div>
            <div className='flex flex-col space-y-1 m-1'>
              <div className='flex flex-row justify-between items-center overflow-hidden'>
                <div className='text-lg font-bold truncate hover:truncate'>
                  {title}
                </div>
                <div className='flex flex-row gap-4'>
                  <div className='text-xs flex flex-wrap items-center gap-1'>
                    <span><ShareIcon /></span> : {forks_count}
                  </div>
                  <div className='text-xs flex flex-wrap items-center gap-1'>
                    <span><LikeIcon /></span>: {stars_count}
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row'>
                  <div className='text-sm'>
                    Owner :
                  </div>
                  <button className='z-10 text-sm hover:text-blue-600 ml-1 ' onClick={handleClick}>
                    {owner_name}
                  </button>
                </div>
                <div className='text-xs text-gray-500'>
                  Created : {created_at_format}
                </div>
              </div>
              <div className='flex flex-row items-center'>
                <span>
                  <EyeIcon className="flex stroke-1 stroke-gray-700 w-3/4 h-3/4 " />
                </span>
                <div className='text-xs text-gray-700'>
                  : {views_count} views
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Roadmap;