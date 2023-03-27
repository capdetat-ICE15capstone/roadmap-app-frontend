import React, { useState, useEffect } from 'react';
import Roadmap from "../components/Roadmap";
import SearchBar from "../components/SearchBar";

const Feed = () => {

  const [search, setSearch] = useState("");
  const [roadmapArray, setRoadmapArray] = useState([]);
  const [page, setPage] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("search: " + document.getElementById("InputSearch").value);
  };

  //fetch roadmap data from API
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/multipleRoadmaps`); //`http://localhost:3000/multipleRoadmaps=${page}`
      const data = await response.json();
      let newArray = [];
      data.forEach((data) => {
        newArray = newArray.concat(data.roadmapArray);
      });     
      setRoadmapArray(prevArray => [...prevArray, ...newArray]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  //infinite scroll functionality
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      setPage(prevPage => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          <button type="submit"className="bg-[#00286E] hover:bg-[#011C4B] text-white font-bold appearance-none border rounded-3xl px-12 py-4 ml-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            Search
          </button>
        </div>
      </form>
      {/*Search Result*/}
      <div className="relative flex flex-wrap mx-4 overflow-y-scroll">
        {roadmapArray.map((roadmap, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
            <Roadmap
              creator_name={roadmap.creator_name}
              owner_name={roadmap.owner_name}
              title={roadmap.title}
              created_at={roadmap.created_at}
              edited_at={roadmap.edited_at}
              views_counts={roadmap.views_counts}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
