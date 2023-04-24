import React, { useState, useEffect, useRef } from 'react';
import RoadmapNeo from "../components/Roadmap_neo";
import SearchBar from "../components/SearchBar";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import { axiosInstance } from '../functions/axiosInstance';
import UserBanner from '../components/UserBanner';
import Prompt from '../components/Prompt';
import { motion } from 'framer-motion';
import DropdownMenuItem from '../components/DropdownMenuItem';
import { completeQuestCheckFeed } from './Activity';

import { getRoadmap, getRid, getTagRid, getUid, getUser, classifyInput } from '../functions/feedFunction';
import SpinnerNeo from '../components/SpinnerNeo';

const Feed = () => {
  const isMountedRef = useRef(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const [currentRoadmapList, setCurrentRoadmapList] = useState([]);
  const [currentUserList, setCurrentUserList] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const [searchTypeName, setSearchTypeName] = useState("roadmap");
  const [displayType, setDisplayType] = useState("roadmap");

  const handleSubmit = () => {
    const searchTerm = document.getElementById("InputSearch").value;
    const searchType = classifyInput(searchTerm);

    if (searchTerm === "") {
      getRecommendRoadmap();
      setSearchTypeName('Roadmap');
      return;
    }

    switch (true) {
      case ('user' === searchType):
        searchUser(searchTerm);
        setSearchTypeName('User');
        return;
      case ('roadmap' === searchType):
        searchRoadmap(searchTerm);
        setSearchTypeName('Roadmap');
        return;
      case ('tag' === searchType):
        searchWithTag(searchTerm);
        setSearchTypeName('Roadmap');
        return;
      default:
        return;
    }
  };

  async function searchRoadmap(searchValue) {
    setIsFetching(true);
    try {
      const ridResponse = await getRid(searchValue); // use searchValue to get an array of rid
      // case : rid is found => use rid to fetch for roadmap data and set roadmapFound to true
      if (ridResponse.search_result && ridResponse.search_result.length > 0) {
        console.log("found");
        const ridString = ridResponse.search_result.join(`,`); // join members in ridData(array) together as a string
        const response = await getRoadmap(encodeURIComponent(ridString));
        setCurrentRoadmapList([...response]);
        setDisplayType("roadmap");
      } else {
        console.log('not found');
        // case : rid not found => don't fetch and set roadmapFound to false
        setDisplayType("empty");
      }
      setIsFetching(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function searchUser(searchValue) {
    setIsFetching(true);
    try {
      const uidResponse = await getUid(searchValue); // use searchValue to get an array of uid
      // case : uid is found => use uid to fetch for user data and set userFound to true
      if (uidResponse.search_result && uidResponse.search_result.length > 0) {
        const uidString = encodeURIComponent(uidResponse.search_result.join(`,`));
        const response = await getUser(uidString);
        setCurrentUserList([...response]);
        setDisplayType("user");
        // case : uid not found => don't fetch and set userFound to false
      } else {
        setDisplayType("empty");
      }
      setIsFetching(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function searchWithTag(searchValue) {
    setIsFetching(true);
    try {
      const ridResponse = await getTagRid(searchValue); // use searchValue to get an array of rid
      // case : rid is found => use rid to fetch for roadmap data and set roadmapFound to true
      if (ridResponse.search_result && ridResponse.search_result.length > 0) {
        const ridString = encodeURIComponent(ridResponse.search_result.join(`,`));
        const response = await getRoadmap(ridString);
        setCurrentRoadmapList([...response]);
        setDisplayType("roadmap");
        // case : rid not found => don't fetch and set roadmapFound to false
      } else {
        setDisplayType("empty");
      }
      setIsFetching(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function getRecommendRoadmap() {
    setIsFetching(true);
    setDisplayType("roadmap");
    const route = "/feed/recommendation";
    try {
      const response = await axiosInstance.get(route);
      setCurrentRoadmapList(response.data);
      console.log(response.data);
      setHasFetched(true);
      setIsFetching(false);
    } catch (error) {
      console.error(error);
    }
  }

  // fetch data when page is changed and when feed is reloaded
  useEffect(() => {
    // use to stop fetching twice when feed page is reloaded
    if (!isMountedRef.current) {
      isMountedRef.current = true;
    } else {
      return;
    }
    getRecommendRoadmap();

    completeQuestCheckFeed();
  }, []);

  const DateAscending = (array) => {
    console.log(array)
    array.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    setIsOpen(false);
  }

  const DateDecending = (array) => {
    array.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setIsOpen(false);
  }

  const ViewAscending = (array) => {
    array.sort((a, b) => a.views_count - b.views_count);
    setIsOpen(false);
  }

  const ViewDecending = (array) => {
    array.sort((a, b) => b.views_count - a.views_count);
    setIsOpen(false);
  }

  return (
    <>
      {hasFetched &&
        <>
          {/*Top (title & search bar)*/}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              type: "easeInOut",
              duration: "0.3"
            }}
            className='flex flex-col items-center h-full w-full'
          >
            <div className='flex justify-between items-center w-4/5 h-10 mt-10 mx-8 mb-8 space-x-4'>
              {/*Feed Title*/}
              <div className='max-md:hidden flex j items-center shrink-0 h-full text-4xl font-extrabold text-nav-blue space-x-2'>
                <SearchIcon className="flex h-8 w-8 fill-[#09275B]" />
                <div className=''>
                  Feed
                </div>
              </div>
              {/*Search bar*/}
              <SearchBar onSubmit={() => handleSubmit()} />
              <div className='flex flex-row items-center gap-2'>
                <div className="relative">
                  <button
                    className="bg-gray-300 py-2 px-4 rounded-md"
                    onMouseEnter={toggleMenu}
                  >
                    Sort
                  </button>
                  {isOpen && (
                    <div
                      className="absolute top-full left-1/2 tranfrom -translate-x-1/2 -translate-y-1/2 z-30 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 mt-2"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      onMouseLeave={toggleMenu}
                    >
                      <DropdownMenuItem label="Newer" onSelect={DateAscending} array={currentRoadmapList} />
                      <DropdownMenuItem label="Older" onSelect={DateDecending} array={currentRoadmapList} />
                      <DropdownMenuItem label="More Views" onSelect={ViewDecending} array={currentRoadmapList} />
                      <DropdownMenuItem label="Less Views" onSelect={ViewAscending} array={currentRoadmapList} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/*Search Result*/}
            {displayType === "roadmap" && (
              <div className='flex flex-col h-full w-full items-center overflow-y-auto'>
                <div className='flex flex-col justify-center items-center w-[90%] py-4 space-y-8'>
                  <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {currentRoadmapList.map((roadmap, index) => {
                      return (
                        <div
                          key={index}
                          className='hover:transform hover:scale-110 transition duration-150'
                        >
                          <RoadmapNeo
                            roadmap={roadmap}
                          />
                        </div>
                      )
                    })}
                    <div className="pb-4" />
                  </div>
                </div>
              </div>
            )}
            {displayType === "user" && (
              <>
                <div className='flex flex-col h-full w-full items-center bg-white overflow-y-auto'>
                  <div className='flex flex-col justify-center items-center w-[90%] py-4 space-y-8'>
                    {currentUserList.map((user, index) => (
                      <UserBanner
                        key={index}
                        uid={user.uid}
                        username={user.username}
                        profile_picture_id={user.profile_picture_id}
                        exp={user.exp}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
            {displayType === "empty" && (
              <>
                <div className='flex flex-col h-full w-full items-center overflow-y-auto'>
                  <div className='flex flex-col justify-center items-center w-[90%] py-4 space-y-8'>
                  </div>
                </div>
                <Prompt visible={true} title={"Error"} message={searchTypeName + ' Not Found'} positiveText="Return" positiveFunction={() => getRecommendRoadmap()} />
              </>
            )}
          </motion.div >
        </>
      }
      <SpinnerNeo visible={isFetching} />
    </>
  );
};

export default Feed;