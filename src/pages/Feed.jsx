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
          <input
            type="search"
            className=" static shadow appearance-none border rounded-3xl py-4 pl-16 px-4 pr4 w-fi text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="InputSearch"
            placeholder="Search"
            onChange={(event) => setSearch(event.target.value)}
          />
          <span className="absolute left-6 bottom-4">
            <SearchIcon />
          </span>
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
