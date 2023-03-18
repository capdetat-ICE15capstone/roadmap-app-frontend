import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchButton from "../components/Button";
import Roadmap from "../components/Roadmap";

const Feed = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("search: " + document.getElementById("roadmapName").value);
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
    <div className="relative inline-block mx-4">
      <div className="inline-block">
        <Roadmap
        userName="BomberMan"
        ownerName="Unknown" 
        roadmapName="Commiting Suicide" 
        createdDate="10/26/2022" 
        updateDate="02/16/2023" 
        views={69} />
      </div>
      <div className="inline-block">
        <Roadmap 
        userName="OctopusLarry"
        ownerName="Fing" 
        roadmapName="Downloading Minecraft" 
        createdDate="04/26/2020" 
        updateDate="07/16/2021" 
        views={420} />
      </div>
      <div className="inline-block">
        <Roadmap
        userName="Lonely_Fing" 
        ownerName="Nantawitaya" 
        roadmapName="Playing Paladins" 
        createdDate="05/02/2018" 
        updateDate="03/18/2023" 
        views={177013} />
      </div>
    </div>
    </>
  )
}

export default Feed;