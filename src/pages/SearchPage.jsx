import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import Roadmap from "../components/Roadmap";
import RoadmapNeo from "../components/Roadmap_neo";
import SearchBar from "../components/SearchBar";
import UserBanner from "../components/UserBanner";
import { axiosInstance } from '../functions/axiosInstance';

const SearchPage = () => {
  const [showRoadmapResult, setShowRoadmapResult] = useState(false);
  const [showUserResult, setShowUserResult] = useState(false);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchValue = location.state?.userSearch || '';
  const searchType = location.state?.searchType || '';
  const [isFetching, setIsFetching] = useState(false);
  const isMountedRef = useRef(false);
  const [roadmapArray, setRoadmapArray] = useState([]);
  const [userArray, setUserArray] = useState([]);
  const [roadmapFound, setRoadmapFound] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [sortViewAsc, setSortViewAsc] = useState(true);
  const [sortByCreatedAt, setSortByCreatedAt] = useState(false);


  // classify user input (roadmap(""), user("@"), tag("#"))
  const classifyInput = (input) => {
    // case : search for USER 
    if (input.charAt(0) === "@") {
      const username = input.substring(1);
      const type = "user";
      setShowRoadmapResult(false);
      setShowUserResult(true);
      console.log(`Searching for user ${username}`);
      return type;
      // case : search for TAG 
    } else if (input.charAt(0) === "#") {
      const tag = input.substring(1);
      const type = "tag";
      setShowUserResult(false);
      setShowRoadmapResult(true);
      console.log(`Searching for tag ${tag}`);
      return type;
      // case : search for ROADMAP 
    } else {
      const type = "roadmap";
      setShowUserResult(false);
      setShowRoadmapResult(true);
      console.log(`Searching for roadmap ${input}`);
      return type;
    }
  }

  // Reload searchPage with new searchValue and searchType
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(document.getElementById("InputSearch").value);
    const searchValue = document.getElementById("InputSearch").value;
    const searchType = classifyInput(searchValue);
    console.log("navigate activated " + searchValue + " " + searchType);
    navigate('/search', { state: { userSearch: searchValue, searchType: searchType } });
  };

  // use roadmap name (searchValue) to get an array of corresponding rid
  async function getRid(searchValue) {
    const route = "/search/roadmap?title=" + searchValue;
    try {
      const response = await axiosInstance.get(route);
      console.log("Below is getRid RESPONSE DATA : ")
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // use roadmap tag (searchValue) to get an array of corresponding rid
  async function getTagRid(searchValue) {
    const route = "/search/%23" + searchValue.substring(1);
    try {
      const response = await axiosInstance.get(route);
      console.log("Below is getTagRid RESPONSE DATA : ")
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // use a string of rids (rids) to get corresponding roadmap data
  async function getRoadmap(rids) {
    const route = "/feed/roadmap?rids=" + rids;
    try {
      const response = await axiosInstance.get(route);
      console.log("Below is getRoadmap RESPONSE DATA : ")
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // use username (searchValue) to get an array of corresponding uid
  async function getUid(searchValue) {
    const route = "/search/users?username=" + searchValue.substring(1);
    try {
      const response = await axiosInstance.get(route);
      console.log("Below is getUid RESPONSE DATA : ")
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // use a string of uids (uids) to get corresponding roadmap data
  async function getUser(uids) {
    const route = "/feed/user?uids=" + uids;
    try {
      const response = await axiosInstance.get(route);
      console.log("Below is getUser RESPONSE DATA : ")
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // fetch roadmap data or user data according to user search input
  const fetchData = async (type) => {
    if (isFetching) return; // return if a fetch is already in progress
    setIsFetching(true); // set isFetching to true to indicate a fetch is starting
    try {
      // search roadmap case
      if (type === "roadmap") {
        console.log("fetch using roadmap")
        const ridResponse = await getRid(searchValue); // use searchValue to get an array of rid
        // case : rid is found => use rid to fetch for roadmap data and set roadmapFound to true
        if (ridResponse.search_result && ridResponse.search_result.length > 0) {
          console.log('ridResponse is NOT EMPTY');
          setRoadmapFound(true);
          const ridString = ridResponse.search_result.join(`,`); // join members in ridData(array) together as a string
          const ridString2 = encodeURIComponent(ridString);
          const response = await getRoadmap(ridString2);
          const data = await response;
          const newArray = [...data];
          setRoadmapArray(prevArray => [...prevArray, ...newArray]);
          // case : rid not found => don't fetch and set roadmapFound to false
        } else {
          console.log('ridResponse is EMPTY');
          setRoadmapFound(false);
        }
        // search tag case
      } else if (type === "tag") {
        console.log("fetch using tag")
        const ridResponse = await getTagRid(searchValue); // use searchValue to get an array of rid
        // case : rid is found => use rid to fetch for roadmap data and set roadmapFound to true
        if (ridResponse.search_result && ridResponse.search_result.length > 0) {
          console.log('ridResponse is NOT EMPTY');
          setRoadmapFound(true);
          const ridString = ridResponse.search_result.join(`,`); // join members in ridData(array) together as a string
          const ridString2 = encodeURIComponent(ridString);
          const response = await getRoadmap(ridString2);
          const data = await response;
          const newArray = [...data];
          setRoadmapArray(prevArray => [...prevArray, ...newArray]);
          // case : rid not found => don't fetch and set roadmapFound to false
        } else {
          console.log('ridResponse is EMPTY');
          setRoadmapFound(false);
        }
        // search user case
      } else if (type === "user") {
        console.log("fetch using user")
        const uidResponse = await getUid(searchValue); // use searchValue to get an array of uid
        // case : uid is found => use uid to fetch for user data and set userFound to true
        if (uidResponse.search_result && uidResponse.search_result.length > 0) {
          console.log('uidResponse is NOT EMPTY');
          setUserFound(true);
          const uidString = uidResponse.search_result.join(`,`); // join members in ridData(array) together as a string
          const uidString2 = encodeURIComponent(uidString);
          const response = await getUser(uidString2);
          const data = await response;
          console.log("Below is data : ")
          console.log(data);
          const newArray = [...data];
          setUserArray(prevArray => [...prevArray, ...newArray]);
          // case : uid not found => don't fetch and set userFound to false
        } else {
          console.log('uidResponse is EMPTY');
          setUserFound(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false); // set isFetching to false to indicate a fetch is complete
  };

  // Run when enter search page 
  useEffect(() => {
    if (!isMountedRef.current) {
      console.log("SearchPage mounted");
      isMountedRef.current = true;
      return;
    }
    if (searchType === "roadmap") {
      setRoadmapArray([]);
      fetchData(searchType);
      setShowUserResult(false);
      setShowRoadmapResult(true);
      return;
    } else if (searchType === "tag") {
      setRoadmapArray([]);
      fetchData(searchType);
      setShowUserResult(false);
      setShowRoadmapResult(true);
      return;
    } else if (searchType === "user") {
      setUserArray([]);
      fetchData(searchType);
      setShowRoadmapResult(false);
      setShowUserResult(true);
      return;
    }
    return;
  }, [search]);

  // sort functions (view, date)
  // sort by view
  const handleSortByView = () => {
    const sortedData = [...roadmapArray].sort((a, b) => {
      return sortViewAsc ? a.views_count - b.views_count : b.views_count - a.views_count;
    });
    setRoadmapArray(sortedData);
    setSortViewAsc(!sortViewAsc);
  };
  // sort by date
  const handleSortByDate = () => {
    const sortedItems = [...roadmapArray].sort((a, b) => {
      if (sortByCreatedAt) {
        return new Date(a.created_at) - new Date(b.created_at);
      } else {
        return new Date(b.created_at) - new Date(a.created_at);
      }
    });
    setRoadmapArray(sortedItems);
    setSortByCreatedAt(!sortByCreatedAt);
  };

  return (
    <>
      <div className='flex flex-col h-full w-full bg-white overflow-y-auto relative'>
        {/* Top (title & search bar)*/}
        <div className='flex justify-center sticky top-0 z-50 bg-white pt-8 pb-2 flex-wrap'>
          <div className='flex w-full md:w-3/4 justify-between'>
            {/*Feed Title*/}
            <div className='flex items-center text-3xl font-bold'>
              <SearchIcon className="flex h-8 w-8 mr-2 mt-2 fill-[#09275B]" />
              <div className='flex text-[#09275B]'>
                Feed
              </div>
            </div>
            {/*Search bar*/}
            <form className="mx-auto" id="searchForm" onSubmit={handleSubmit}>
              <div
                className="flex items-center my-4"
                onSubmit={handleSubmit}
              >
                <SearchBar className/>
                <button type="submit" className="bg-[#00286E] hover:bg-[#011C4B] text-white font-bold appearance-none border rounded-3xl px-6 py-4 ml-2 leading-tight focus:outline-none focus:shadow-outline">
                  Search
                </button>
              </div>
            </form>
            <div className='flex flex-row items-center gap-2'>
              <div className='felx'>
                Sort by:
              </div>
              <button className="flex hover:text-blue-600" onClick={handleSortByView}>
                Popularity
              </button>
              <button className="flex hover:text-blue-600" onClick={handleSortByDate}>
                Date
              </button>
            </div>
          </div>
        </div>
        {/* Bottom (show roadmap or user banner)*/}
        {/* roadmaps */}
        {showRoadmapResult && roadmapFound && (
          <div>
            <div className='flex justify-center my-8'>
              <div className='flex flex-wrap items-start w-3/4 gap-20'>
                {roadmapArray.map((roadmap, index) => (
                  <RoadmapNeo
                    key={index}
                    owner_id={roadmap.owner_id}
                    creator_id={roadmap.creator_id}
                    owner_name={roadmap.owner_name}
                    creator_name={roadmap.creator_name}
                    rid={roadmap.rid}
                    views_count={roadmap.views_count}
                    stars_count={roadmap.stars_count}
                    forks_count={roadmap.forks_count}
                    created_at={roadmap.created_at}
                    edited_at={roadmap.edited_at}
                    title={roadmap.title}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {showRoadmapResult && !roadmapFound && (
          <div className='text-center my-8'>
            <p>Roadmap not found</p>
          </div>
        )}
        {/* user banners */}
        {showUserResult && userFound && (
          <div>
            <div className='my-8'>
              <div className=''>
                {userArray.map((user, index) => (
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
          </div>
        )}
        {showUserResult && !userFound && (
          <div className='text-center my-8'>
            <p>User not found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;