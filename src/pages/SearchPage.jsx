import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Roadmap from "../components/Roadmap";
import UserBanner from "../components/UserBanner";
import SearchBar from "../components/SearchBar";

const SearchPage = () => {
    const [search, setSearch] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const searchValue = location.state?.userSearch || '';


    const handleSubmit = (event) => {
        event.preventDefault();
        //setRoadmapArray([]);
        //setPage(1);
        //fetchData();
        setSearch(document.getElementById("InputSearch").value);
        const searchValue = document.getElementById("InputSearch").value;
        navigate('/search', { state: { userSearch: searchValue } });
        console.log("search: " + document.getElementById("InputSearch").value);
    };

    //fetch roadmap data from API
    const fetchData = async () => {
        if (isFetching) return; // return if a fetch is already in progress
        setIsFetching(true); // set isFetching to true to indicate a fetch is starting
        try {
            console.log("fetch")
            const response = await fetch(`http://localhost:3000/multipleRoadmaps`);
            const data = await response.json();
            let newArray = [];
            data.forEach((data) => {
                newArray = newArray.concat(data.roadmapArray);
            });
            setRoadmapArray(prevArray => [...prevArray, ...newArray]);
        } catch (error) {
            console.log(error);
        }
        setIsFetching(false); // set isFetching to false to indicate a fetch is complete
    };

    return (
        <>
            {/*Search bar*/}
            <form className="mx-auto" id="searchForm" onSubmit={handleSubmit}>
                <div
                    className="relative inline-block my-4"
                    onSubmit={handleSubmit}
                >
                    <SearchBar />
                    <button type="submit" className="bg-[#00286E] hover:bg-[#011C4B] text-white font-bold appearance-none border rounded-3xl px-12 py-4 ml-2 leading-tight focus:outline-none focus:shadow-outline">
                        Search
                    </button>
                </div>
            </form>
            <p className="mx-auto">search: {searchValue}</p>
            <p className="mx-auto">vvv Search result vvv</p>

        </>
    );
};

export default SearchPage;





