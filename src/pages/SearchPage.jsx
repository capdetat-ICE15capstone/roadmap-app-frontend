import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import Roadmap from "../components/Roadmap";
import RoadmapNeo from "../components/Roadmap_neo";
import SearchBar from "../components/SearchBar";
import UserBanner from "../components/UserBanner";

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

  // classify user input (roadmap(""), user("@""), tag("#""))
  const classifyInput = (input) => {
    // User search
    if (input.charAt(0) === "@") {
      const username = input.substring(1);
      const type = "user";
      setShowRoadmapResult(false);
      setShowUserResult(true);
      console.log(`Searching for user ${username}`);
      return type;
      // Tag search  
    } else if (input.charAt(0) === "#") {
      const tag = input.substring(1);
      const type = "tag";
      setShowUserResult(false);
      setShowRoadmapResult(true);
      console.log(`Searching for tag ${tag}`);
      return type;
      // Roadmap search
    } else {
      const type = "roadmap";
      setShowUserResult(false);
      setShowRoadmapResult(true);
      console.log(`Searching for roadmap ${input}`);
      return type;
    }
  }

  // search
  const handleSubmit = (event) => {
    event.preventDefault();
    //setRoadmapArray([]);
    //setUserArray([]);
    setSearch(document.getElementById("InputSearch").value);
    const searchValue = document.getElementById("InputSearch").value;
    const searchType = classifyInput(searchValue);
    //fetchData(searchType);
    console.log("navigate activated" + searchValue + searchType);
    navigate('/search', { state: { userSearch: searchValue, searchType: searchType} });
    
  };

  // fetch data (roadmap or user)
  const fetchData = async (type) => {
    if (isFetching) return; // return if a fetch is already in progress
    setIsFetching(true); // set isFetching to true to indicate a fetch is starting
    try {
      // search roadmap case
      if (type === "roadmap") {
        console.log("fetch")
        const response = await fetch(`http://localhost:3000/multipleRoadmaps`);
        const data = await response.json();
        let newArray = [];
        data.forEach((data) => {
          newArray = newArray.concat(data.roadmapArray);
        });
        setRoadmapArray(prevArray => [...prevArray, ...newArray]);
        // search tag case
      } else if (type === "tag") {
        console.log("fetch")
        const response = await fetch(`http://localhost:3000/multipleRoadmaps`);
        const data = await response.json();
        let newArray = [];
        data.forEach((data) => {
          newArray = newArray.concat(data.roadmapArray);
        });
        setRoadmapArray(prevArray => [...prevArray, ...newArray]);
        // search user case
      } else if (type === "user") {
        console.log("fetch")
        const response = await fetch(`http://localhost:3000/searchUsers`);
        const data = await response.json();
        let newArray = [];
        data.forEach((data) => {
          newArray = newArray.concat(data.userArray);
        });
        setUserArray(prevArray => [...prevArray, ...newArray]);
      }
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false); // set isFetching to false to indicate a fetch is complete
  };

  // Run when enter search page 
  useEffect(() => {
    console.log("SearchPage mounted");
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    if (searchType === "roadmap") {
      setRoadmapArray([]);
      fetchData(searchType);
      console.log("USEEFFECT roadmap")
      setShowUserResult(false);
      setShowRoadmapResult(true);
      return;
    } else if (searchType === "tag") {
      setRoadmapArray([]);
      fetchData(searchType);
      console.log("USEEFFECT tag")
      setShowUserResult(false);
      setShowRoadmapResult(true);
      return;
    } else if (searchType === "user") {
      setUserArray([]);
      fetchData(searchType);
      console.log("USEEFFECT user")
      setShowRoadmapResult(false);
      setShowUserResult(true);
      return;
    }
    return;
  }, [search]);

  return (
    <>
      <div className='flex flex-col h-full w-full bg-white overflow-y-auto relative'>
        {/* Top (title & search bar)*/}
        <div className='flex justify-center sticky top-0 z-50 bg-white pt-8 pb-2'>
          <div className='flex w-3/4 justify-center'>
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
                className="relative inline-block my-4"
                onSubmit={handleSubmit}
              >
                <SearchBar />
                <button type="submit" className="bg-[#00286E] hover:bg-[#011C4B] text-white font-bold appearance-none border rounded-3xl px-12 py-4 ml-2 leading-tight focus:outline-none focus:shadow-outline">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Bottom (show roadmap or user banner)*/}
        {/* roadmaps */}
        {showRoadmapResult && (
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
        {/* user banners */}
        {showUserResult && (
          <div>
            <div className='my-8'>
              <div className=''>
                {userArray.map((user, index) => (
                  <UserBanner
                    key={index}
                    owner_id={user.owner_id}
                    owner_name={user.owner_name}
                    user_exp={user.user_exp}
                    avatar_id={user.avatar_id}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;





