import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchButton from "../components/Button";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import Roadmap from "../components/Roadmap";
import Roadmap2 from "../components/Roadmap2";
import RoadmapCreate from "../components/RoadmapCreate";

const Home = () => {
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
          <RoadmapCreate />
        </div>
        <div className="inline-block">
          <Roadmap />
        </div>
        <div className="inline-block">
          <Roadmap />
        </div>
        <div className="inline-block">
          <Roadmap2 
          username="Thanapat" 
          ownerName="Tripipat" 
          roadmapName="React skill issue" 
          createdDate="03/17/2023" 
          updateDate="today bich" 
          views={6338098421} />
        </div>
      </div>
    </>
  );
};

export default Home;
