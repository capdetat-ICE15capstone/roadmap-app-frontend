import React, { useState, useEffect, useRef } from 'react';
import Roadmap from "../components/Roadmap";
import SearchBar from "../components/SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import UserBanner from "../components/UserBanner";

const SearchPage = () => {
  const [showRoadmapResult, setShowRoadmapResult] = useState(false);
  const [showUserResult, setShowUserResult] = useState(false);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchValue = location.state?.userSearch || '';
  const searchType = location.state?.searchType || '';

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

  useEffect(() => {
    // Run your function here
    console.log("SearchPage mounted");
    if (searchType === "roadmap") {
      setShowUserResult(false);
      setShowRoadmapResult(true);
    } else if (searchType === "user") {
      setShowRoadmapResult(false);
      setShowUserResult(true);
    }

  }, []);

  // search
  const handleSubmit = (event) => {
    event.preventDefault();
    //setRoadmapArray([]);
    //setPage(1);
    //fetchData();
    setSearch(document.getElementById("InputSearch").value);
    const searchValue = document.getElementById("InputSearch").value;
    classifyInput(searchValue);
    navigate('/search', { state: { userSearch: searchValue } });
  };

  // fetch roadmap data
  const fetchData = async () => {
    if (isFetching) return; // return if a fetch is already in progress
    setIsFetching(true); // set isFetching to true to indicate a fetch is starting
    try {
      console.log("fetch")
      const response = await fetch(`http://localhost:3000/multipleRoadmaps`);
      const data = await response.json();
      let newArray = [];
      data.forEach((data) => {
        newArray = newArray.concat(data.roadmapArray);
      });
      setRoadmapArray(prevArray => [...prevArray, ...newArray]);
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false); // set isFetching to false to indicate a fetch is complete
  };

  return (
    <>
      <div className='flex flex-col h-full w-full bg-white overflow-y-auto relative'>
        {/*Top (title & search bar)*/}
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
        {showRoadmapResult && (
          <div>
            <h1>Roadmap Result</h1>
            <p>This is the content for Roadmap Result.</p>
          </div>
        )}
        {showUserResult && (
          <div>
            <h1>User Result</h1>
            <p>This is the content for User Result.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;





