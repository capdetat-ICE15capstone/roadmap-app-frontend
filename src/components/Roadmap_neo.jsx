import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import placeholderImage from "../assets/roadmap_assets/Placeholder_Image.png"
import { ReactComponent as EyeIcon } from "../assets/roadmap_assets/eye_Icon.svg"
import { ReactComponent as ShareIcon } from "../assets/roadmap_assets/Share.svg"
import { ReactComponent as LikeIcon } from "../assets/roadmap_assets/ThumbsUp.svg"
import { axiosInstance } from '../functions/axiosInstance';
import { shortenString } from '../functions/formatFunction';
import { nodeShapeGenerator } from '../functions/viewFunction';
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

  const [roadmap, setRoadmap] = useState();
  const [isFetched, setIsFetched] = useState(false);

  function fetchRoadmap() {
    axiosInstance.get(`/roadmap/${rid}`)
      .then(response => {
        // console.log(response.data);
        setRoadmap(response.data);
        setIsFetched(true);
      })
      .catch(error => {
        console.error(error);
      })
  }

  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    fetchRoadmap();
  }, []);

  if (isFetched) {
    return (
      <>
        <div>
          <Link to={`/view/${rid}`} >
            <div className='flex flex-col bg-white rounded-3xl shadow-md w-60 p-2 hover:transform hover:scale-110 transition duration-150'>
              <div className='flex flex-col bg-[#e6eefc] rounded-2xl'>
                <div className='flex justify-center pt-8 px-8 space-x-[25px] w-full h-24 overflow-hidden'>
                  {roadmap.shapes.map((shape, index) => {
                    const zIndex = 10 - index;
                    return (
                      <div key={index} className="relative" style={{ zIndex }}>
                        <div className="absolute top-[40%] -left-1/4 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                          {(index > '0') && <hr className="w-[75px] h-1 bg-black border-0" />}
                        </div>
                        <div className="absolute top-1/2 left-[100%] transform -translate-x-1/2 -translate-y-3/4 -z-10">
                          {(index === (shape.length - 1)) && <hr className="w-[75px] h-1 border-0 opacity-0" />}
                        </div>
                        <div className='relative'>
                          <button value={index} className=''>
                            {nodeShapeGenerator(shape, roadmap.colors[index], index, roadmap.shapes.length)}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className='flex justify-between p-2'>
                  <div className='text-xs font-bold truncate'>
                    {creator_name}
                  </div>
                  <div className='text-xs text-gray-600'>
                    Updated: {edited_at_format}
                  </div>
                </div>
              </div>
              <div className='flex flex-col space-y-1 m-1'>
                <div className=' flex flex-row justify-between items-center'>
                  <div className=' text-md font-bold truncate w-[100%]'>
                    {title ? title : "no name"}
                  </div>
                </div>
                <div className='flex flex-row justify-between items-center'>
                  <div className='flex flex-row'>
                    <div className='text-xs'>
                      Owner :
                    </div>
                    <button className='z-10 text-xs hover:text-blue-600 ml-1 ' onClick={handleClick}>
                      {owner_name}
                    </button>
                  </div>
                  <div className='text-xs text-gray-500'>
                    Created : {created_at_format}
                  </div>
                </div>
                <div className='flex flex-row justify-between items-center'>
                  <div className='static flex flex-row items-center left-[5%]'>
                    <span>
                      <EyeIcon className="flex stroke-1 stroke-gray-700 w-3/4 h-3/4 " />
                    </span>
                    <div className='text-xs text-gray-700'>
                      : {views_count} views
                    </div>
                  </div>
                  <div className='z-10 static flex flex-row justify-center space-x-4 text-xs right-[5%]'>
                    <div className='z-10 flex flex-row items-center'>
                      <ShareIcon /> : {forks_count}
                    </div>
                    <div className='z-10 flex flex-row items-center'>
                      <LikeIcon /> : {stars_count}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }

};

export default Roadmap;