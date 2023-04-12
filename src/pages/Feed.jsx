import React, { useState, useEffect, useRef } from 'react';
import Roadmap from "../components/Roadmap";
import RoadmapNeo from "../components/Roadmap_neo";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import { axiosInstance } from '../functions/axiosInstance';

const Feed = () => {
  const [search, setSearch] = useState("");
  const [roadmapArray, setRoadmapArray] = useState([]);
  const isMountedRef = useRef(false);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const [sortViewAsc, setSortViewAsc] = useState(true);
  const [sortByCreatedAt, setSortByCreatedAt] = useState(false);


  // classify user input (roadmap(""), user("@""), tag("#""))
  const classifyInput = (input) => {
    // Search for USER case
    if (input.charAt(0) === "@") {
      const username = input.substring(1);
      const type = "user"
      console.log(`Searching for user ${username}`);
      return type
      // Search for TAG case  
    } else if (input.charAt(0) === "#") {
      const tag = input.substring(1);
      const type = "tag"
      console.log(`Searching for tag ${tag}`);
      return type
      // Search for ROADMAP case
    } else {
      const type = "roadmap"
      console.log(`Searching for roadmap ${input}`);
      return type
    }
  }

  // naviage the user to SearchPage
  const handleSubmit = (event) => {
    event.preventDefault();
    setRoadmapArray([]);
    setSearch(document.getElementById("InputSearch").value);
    const searchValue = document.getElementById("InputSearch").value;
    const searchType = classifyInput(searchValue);
    navigate('/search', { state: { userSearch: searchValue, searchType: searchType } });
    //console.log("search: " + document.getElementById("InputSearch").value);
  };

  async function getRecommendRoadmap() {
    const route = "/feed/recommendation";
    try {
      const startTime = performance.now(); // get the start time
      const response = await axiosInstance.get(route);
      const endTime = performance.now(); // get the end time
      const elapsedTime = endTime - startTime; // calculate the elapsed time in milliseconds
      console.log(`Time elapsed: ${elapsedTime} ms`); // log the elapsed time
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // fetch roadmap data
  const fetchData = async () => {
    if (isFetching) return; // return if a fetch is already in progress
    setIsFetching(true); // set isFetching to true to indicate a fetch is starting
    try {
      console.log("fetch");
      const response = await getRecommendRoadmap();
      const newArray = [...response];
      setRoadmapArray(prevArray => [...prevArray, ...newArray]);
      console.log("below is array");
      console.log(roadmapArray);
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false); // set isFetching to false to indicate a fetch is complete
  };

  // fetch data when page is changed and when feed is reloaded
  useEffect(() => {
    // use to stop fetching twice when feed page is reloaded
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    setRoadmapArray([]);
    fetchData();
  }, []);

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
        {/*Search Result*/}
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
    </>
  );
};

export default Feed;
//                         npx json-server --watch json_server_test/db.json