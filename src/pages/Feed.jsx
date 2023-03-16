import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import Roadmap from "../components/Roadmap";
import RoadmapCreate from "../components/RoadmapCreate";

const Feed = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("search:" + search);
  };
  return (
    <>
      {/*Search bar*/}
      <form className="mx-auto" id="searchForm" onSubmit={handleSubmit}>
        <div
          className="relative inline-block my-4"
          onSubmit={handleSubmit}
        >
          <SearchBar/>
          <button
            type="submit"
            className="bg-[#DF5E76] hover:bg-[#BE4057] text-white font-bold appearance-none border rounded-3xl px-12 py-4 ml-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </div>
      </form>
      {/*Roadmaps*/}
      <div className="relative inline-block mx-4">
        <div className="inline-block">
          <RoadmapCreate/>
        </div>
        <div className="inline-block">
          <Roadmap/>
        </div>
      </div>
    </>
  );
};

export default Feed;
