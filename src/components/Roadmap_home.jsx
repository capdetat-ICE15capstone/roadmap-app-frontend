import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Roadmap from "../components/Roadmap_neo"
import { ReactComponent as DropdownIcon } from "../assets/roadmapDropdown_assets/dropdown_icon.svg"
import { axiosInstance } from '../functions/axiosInstance';
import Prompt from './Prompt';

const Roadmap_home = ({ owner_id, owner_name, creator_id, creator_name, rid, views_count, stars_count, forks_count, created_at, edited_at, title, handleArchive, handleDelete }) => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className='relative w-[240px] h-[232px] hover:transform hover:scale-110 transition duration-150'>
        <div className="absolute top-[146px] right-[14px]">
          <div className="flex flex-col justify-center">
            <button onMouseEnter={toggleMenu} className="flex rotate-90 justify-center items-center p-2 rounded-[20px] bg-white hover:bg-gray-300 transition-all">
              <DropdownIcon />
            </button>
            {isOpen && (
              <div onMouseLeave={toggleMenu} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-18 flex flex-col bg-[#FFFFFF] rounded-xl shadow-md z-50 hover:scale-110 transition duration-150">
                <button onClick={() => navigate(`/edit/${rid}`)} className="text-sm font-bold p-2 rounded-t-xl hover:bg-gray-300">
                  Edit
                </button>
                <button onClick={() => handleArchive(rid)} className="text-sm font-bold p-2 hover:bg-gray-300">
                  Archive
                </button>
                <button onClick={() => handleDelete(rid)} className="text-sm text-red-500 font-bold p-2 rounded-b-xl hover:bg-gray-300">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <Roadmap
          owner_id={owner_id}
          creator_id={creator_id}
          owner_name={owner_name}
          creator_name={creator_name}
          rid={rid}
          views_count={views_count}
          stars_count={stars_count}
          forks_count={forks_count}
          created_at={created_at}
          edited_at={edited_at}
          title={title}
        />
      </div>
    </>
  )

};

export default Roadmap_home;