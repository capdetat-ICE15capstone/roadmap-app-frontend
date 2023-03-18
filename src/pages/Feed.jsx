import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchButton from "../components/Button";
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
          <RoadmapCreate />
        </div>
        <div className="inline-block">
          <Roadmap 
          username="Thanapat" 
          ownerName="Tripipat" 
          roadmapName="React skill issue" 
          createdDate="03/17/2023" 
          updateDate="today bich" 
          views={6338098421} />
        </div>
        <div className="inline-block">
          <Roadmap 
          username="FingTheMan" 
          ownerName="Wuttikorn" 
          roadmapName="Dying From Capstone" 
          createdDate="03/17/2023" 
          updateDate="03/18/2023" 
          views={177013} />
        </div>
      </div>
    </>
  );
};

export default Feed;
