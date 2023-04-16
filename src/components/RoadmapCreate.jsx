import React from "react";
import { ReactComponent as PlusIcon } from "../assets/roadmap_assets/plus_Icon.svg"
import { Link } from "react-router-dom";

const RoadmapCreate = ({ isPremium, roadmapAmount }) => {
  return (
    <>
      {(isPremium || (!isPremium && roadmapAmount < 3)) && (
        <Link to={"/create"}>
          <div className='flex justify-center items-center w-[240px] h-[232px] border-dashed border-gray-500 border-2 bg-transparent rounded-3xl shadow-md p-2 hover:transform hover:scale-110 transition duration-150'>
            <PlusIcon className="w-16 h-16" />
          </div>
        </Link>
      )}
    </>
  );
};
export default RoadmapCreate;