import React, { useState } from "react"
import { ReactComponent as DropdownIcon } from "../assets/roadmapDropdown_assets/dropdown_icon.svg"
import { Link } from "react-router-dom";

const RoadmapDropdown = ({onDelete}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => 
        setIsOpen(!isOpen);

    return (
        <>
            <div className="flex flex-col justify-center">
                <button onClick={handleClick} className="flex justify-center items-center w-[20px] h-[20px] mb-4 rounded-[20px] hover:bg-[rgb(238,234,234)]">                
                    <DropdownIcon/>
                </button>
                {isOpen && 
                <div className="flex flex-col mb-8 -ml-28 bg-[#FFFFFF] font-bold appearance-none border rounded-xl leading-tight w-60 h-36 z-10">
                    <Link to={'/view/:id'} className="relative flex items-center h-12 rounded-t-xl hover:bg-[#808080]">
                        <div className="relative left-[15px] font-inter text-lg">
                            View Roadmap
                        </div>
                    </Link>
                    <Link to={'/edit/:id'} className="relative flex items-center h-12 hover:bg-[#808080]">
                        <div className="relative left-[15px] font-inter text-lg">
                            Edit Roadmap
                        </div>
                    </Link>
                    <button onClick={onDelete} className="relative flex items-center h-12 rounded-b-xl hover:bg-[#808080]">
                        <div className="relative left-[15px] font-inter text-lg text-[#EF1414]">
                            Delete Roadmap
                        </div>
                    </button>
                </div>}         
            </div>
        </>
    )
}

export default RoadmapDropdown;