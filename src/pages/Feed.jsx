import React, { useState, useEffect, useRef } from 'react';
import RoadmapNeo from "../components/Roadmap_neo";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import { axiosInstance } from '../functions/axiosInstance';
import DropdownSorting from "../components/DropdownSorting";

const DropdownMenuItem = (props) => {
  const handleClick = () => {
    props.onSelect(props.array);
  }

  return (
    <a
      href="#"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={handleClick}
    >
      {props.label}
    </a>
  );
}

const Feed = () => {
  const [search, setSearch] = useState("");
  const [roadmapArray, setRoadmapArray] = useState([]);
  const isMountedRef = useRef(false);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const [sortViewAsc, setSortViewAsc] = useState(true);
  const [sortByCreatedAt, setSortByCreatedAt] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [title, setTitle] = useState("Sort");


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
    console.log("below is array");
    console.log(roadmapArray);
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

  const handleSort = (sortedArray) => {
    setRoadmapArray(sortedArray);
    console.log(sortedArray);
  };

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
      {/*Top (title & search bar)*/}
      <div className='flex justify-center top-0 bg-white pt-8 pb-2'>
        <div className='flex w-3/4 justify-between'>
          {/*Feed Title*/}
          <div className='flex items-center text-3xl font-bold'>
            <SearchIcon className="flex h-8 w-8 mr-2 mt-2 fill-[#09275B]" />
            <div className='flex text-[#09275B]'>
              Feed
            </div>
          </div>
          {/*Search bar*/}
          <form id="searchForm" onSubmit={handleSubmit}>
            <div className='flex'>
              <div className="inline-flex" onSubmit={handleSubmit}>
                <SearchBar className="w-1/2" />
                <button type="submit" className="bg-[#00286E] hover:bg-[#011C4B] text-white font-bold rounded-3xl px-12 py-4 ml-2 leading-tight focus:outline-none focus:shadow-outline">
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className='flex flex-row items-center gap-2'>
            <div className="relative">
              <button
                className="inline-flex array-center justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={toggleMenu}
              >
                <span>{title}</span>
              </button>
              {isOpen && (
                <div
                  className="absolute z-50 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 mt-2"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <DropdownMenuItem label="Date ^" onSelect={DateAscending} array={roadmapArray} />
                  <DropdownMenuItem label="Date v" onSelect={DateDecending} array={roadmapArray} />
                  <DropdownMenuItem label="Views ^" onSelect={ViewAscending} array={roadmapArray} />
                  <DropdownMenuItem label="Views v" onSelect={ViewDecending} array={roadmapArray} />

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-grow w-full bg-white overflow-y-auto'>
        {/*Search Result*/}
        <div className='flex justify-center pt-8 pb-12'>
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