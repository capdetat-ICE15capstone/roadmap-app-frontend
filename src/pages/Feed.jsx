import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchButton from "../components/Button";
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
          <SearchButton/>
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
