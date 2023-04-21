import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";

const SearchBar = ({ onSubmit }) => {
  return (
    <>
      <form className='flex space-x-2 relative' onSubmit={(e) => {e.preventDefault(); onSubmit();}}>
        <input
          id="InputSearch"
          type="text"
          className="shadow appearance-none border rounded-3xl w-3/4 py-2 px-3 pl-12 text-gray-700 focus:outline-none focus:shadow-outline"
          placeholder="Search"
        />
        <button onClick={onSubmit} type="button" className="bg-sub-blue text-white w-1/4 shadow font-bold py-2 rounded-full transition ease-in-out hover:bg-blue-900 duration-300">
          Go
        </button>
        <SearchIcon className="absolute top-1/2 left-4 tranform -translate-x-1/2 -translate-y-1/2"/>
      </form>
    </>
  );
};

export default SearchBar;
