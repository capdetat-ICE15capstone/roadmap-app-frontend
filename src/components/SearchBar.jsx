import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(search);
  };
  return (
    <div className="inline-block relative" onSubmit={handleSubmit}>
      <input
        type="search"
        className=" static shadow appearance-none border rounded-3xl py-4 pl-16 pr-32 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="InputSearch"
        placeholder="Search"
        onChange={(event) => setSearch(event.target.value)}
      />
      <span className="absolute left-6 bottom-4">
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchBar;
