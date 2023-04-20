import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as EyeIcon } from "../assets/roadmap_assets/eye_Icon.svg"
import { ReactComponent as ShareIcon } from "../assets/roadmap_assets/Share.svg"
import { ReactComponent as LikeIcon } from "../assets/roadmap_assets/ThumbsUp.svg"
import { axiosInstance } from '../functions/axiosInstance';
import { nodeShapeGenerator } from '../functions/viewFunction';
import { motion } from 'framer-motion';

const Roadmap = ({ roadmap }) => {

  const [createDate, setCreateDate] = useState();
  const [editDate, setEditDate] = useState();

  // change date to dd/mm/yy format
  function convertDate(dateInput) {
    const date = new Date(dateInput);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear().toString().substr(-2);
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    // change created_at to dd/mm/yy format
    setCreateDate(convertDate(roadmap.created_at));

    // change edited_at to dd/mm/yy format
    setEditDate(convertDate(roadmap.edited_at));

    // update roadmap preview
    fetchRoadmap();
  }, [roadmap])

  //navigage to roadmap owner's home page on click
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/home/${roadmap.owner_id}`);
  };

  const [fetchedRoadmap, setFetchedRoadmap] = useState();
  const [isFetched, setIsFetched] = useState(false);

  function fetchRoadmap() {
    axiosInstance.get(`/roadmap/${roadmap.rid}`)
      .then(response => {
        // console.log(response.data);
        setFetchedRoadmap(response.data);
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
    } else {
      return;
    }
    fetchRoadmap();
  }, []);

  if (isFetched) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            type: "easeInOut",
            duration: "0.3"
          }}
        >
          <Link to={`/view/${roadmap.rid}`} >
            <div className='flex flex-col bg-white border border-gray-300 rounded-3xl shadow-md w-[242px] h-[232px] p-2'>
              <div className='flex flex-col bg-[#e6eefc] rounded-2xl'>
                <div className='flex justify-center pt-8 px-8 space-x-[25px] w-full h-28 overflow-hidden'>
                  {fetchedRoadmap.shapes.map((shape, index) => {
                    if (index > 4) return;
                    const zIndex = fetchedRoadmap.shapes.length - index;
                    return (
                      <div key={index} className="relative" style={{ zIndex }}>
                        <div className="absolute top-[30%] -left-1/4 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                          {(index > '0') && <hr className="w-[75px] h-1 bg-black border-0" />}
                        </div>
                        <div className="absolute top-1/2 left-[100%] transform -translate-x-1/2 -translate-y-3/4 -z-10">
                          {(index === (shape.length - 1)) && <hr className="w-[75px] h-1 border-0 opacity-0" />}
                        </div>
                        <div className='relative'>
                          <button value={index} className=''>
                            {nodeShapeGenerator(shape, fetchedRoadmap.colors[index], index, fetchedRoadmap.shapes.length)}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className='flex flex-nowrap justify-between pb-2 px-2'>
                  <div className='text-xs font-bold'>
                    {roadmap.creator_name}
                  </div>
                  <div className='text-xs text-gray-600'>
                    Updated: {editDate}
                  </div>
                </div>
              </div>
              <div className='flex flex-col pt-[2px] flex-nowrap space-y-1 m-1'>
                <div className=' flex flex-row justify-between items-center'>
                  <div className=' text-md font-bold truncate w-[100%]'>
                    {roadmap.title ? roadmap.title : "no name"}
                  </div>
                </div>
                <div className='flex flex-row flex-nowrap justify-between items-center space-x-1'>
                  <div className='flex flex-row text-xs'>
                    <span className='mr-1'>{"Owner: "}</span><span className='hover:text-blue-600 truncate' onClick={handleClick}>{roadmap.owner_name}</span>
                  </div>
                  <div className='flex-nowrap w-1/2 text-xs text-gray-500 text-right'>
                    Created: {createDate}
                  </div>
                </div>
                <div className='flex flex-row flex-nowrap justify-between items-center'>
                  <div className='static flex flex-row items-center left-[5%] space-x-1'>
                    <EyeIcon className="flex stroke-1 stroke-gray-700" />
                    <div className='text-xs text-gray-700'>
                      : {roadmap.views_count} views
                    </div>
                  </div>
                  <div className='z-10 static flex flex-row justify-center space-x-4 text-xs right-[5%]'>
                    <div className='z-10 flex flex-row items-center space-x-1'>
                      <ShareIcon />
                      <div className='text-xs text-gray-700'>
                        : {roadmap.forks_count}
                      </div>
                    </div>
                    <div className='z-10 flex flex-row items-center space-x-1'>
                      <LikeIcon />
                      <div className='text-xs text-gray-700'>
                        : {roadmap.stars_count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </>
    );
  }

};

export default Roadmap;