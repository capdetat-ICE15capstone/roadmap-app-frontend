import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import placeholderImage from "../assets/roadmap_assets/Placeholder_Image.png"
import { ReactComponent as EyeIcon } from "../assets/roadmap_assets/eye_Icon.svg"

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

  //navigage to roadmap owner's home page on click
  const navigate = useNavigate();

  return (
    <>
      <div>
        <button onClick={() => navigate('/view')}>
          <div className='flex flex-col bg-white rounded-3xl shadow-md w-[200px] h-[220px] p-2 space-y-1'>
            <div className='relative'>
              <img src={placeholderImage} className="rounded-2xl h-full w-full" />
              <div className='absolute bottom-[5%] left-[5%] text-xs'>
                test
              </div>
              <div className='absolute bottom-[5%] right-[5%] text-xs'>
                test
              </div>
            </div>
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
          </div>
        </button>
      </div>
    </>
  );
};

export default Roadmap;