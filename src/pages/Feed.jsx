import React, { useState, useEffect, useRef } from 'react';
import Roadmap from "../components/Roadmap";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

const Feed = () => {

  const [search, setSearch] = useState("");
  const [roadmapArray, setRoadmapArray] = useState([]);
  const isMountedRef = useRef(false);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setRoadmapArray([]);
    //fetchData();
    setSearch(document.getElementById("InputSearch").value);
    const searchValue = document.getElementById("InputSearch").value;
    navigate('/search', { state: { userSearch: searchValue } });
    console.log("search: " + document.getElementById("InputSearch").value);
  };

  //fetch roadmap data from API
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

  // fetch data when page is changed and when feed is reloaded
  useEffect(() => {
    // use to stop fetching twice when feed page is reloaded
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    fetchData();
  }, []);

  return (
    <>
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
      {/*Search Result*/}
      <div className="relative flex flex-wrap mx-4 overflow-y-scroll ">
        {roadmapArray.map((roadmap, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
            <Roadmap
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
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
//                         npx json-server --watch json_server_test/db.json