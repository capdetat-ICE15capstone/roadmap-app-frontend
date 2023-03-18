import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchButton from "../components/Button";
import Roadmap from "../components/Roadmap";
import Roadmap2 from "../components/Roadmap2";

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
      </>
    )
}

export default Feed;