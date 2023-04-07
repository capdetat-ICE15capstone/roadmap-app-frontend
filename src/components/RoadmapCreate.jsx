import React from "react";
import { ReactComponent as PlusIcon } from "../assets/roadmap_assets/plus_Icon.svg"
import { Link } from "react-router-dom";

const RoadmapCreate = () => {
    return (
        <Link to={"/create"} className="relative flex items-center justify-center w-[200px] h-[220px] mr-16 my-8 border-dashed border-2 border-gray-400 rounded-[48px]">
            <PlusIcon className="absolute w-16 h-16" />
        </Link>
    );
};
export default RoadmapCreate;