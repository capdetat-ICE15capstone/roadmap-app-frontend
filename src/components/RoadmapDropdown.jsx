import React, { useState } from "react"
import { ReactComponent as DropdownIcon } from "../assets/roadmapDropdown_assets/dropdown_icon.svg"

const RoadmapDropdown = ({onDelete}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => 
        setIsOpen(!isOpen);

    return (
        <>
            <div className="absolute flex justify-center">
                <button onClick={handleClick} className="relative flex justify-center items-center top-[-70px] left-[310px] w-[20px] h-[20px] rounded-[20px] hover:bg-[rgb(238,234,234)]">                
                    <DropdownIcon/>
                </button>
                {isOpen && 
                <div className="absolute flex flex-col top-[-30px] left-[200px] mb-4 bg-[#FFFFFF] font-bold appearance-none border rounded-xl leading-tight w-60 h-36">
                    <button className="relative flex items-center h-12 rounded-t-xl hover:bg-[#808080]">
                        <div className="relative left-[15px] font-inter font-bold text-[20px] leading-none">
                            View Roadmap
                        </div>
                    </button>
                    <button className="relative flex items-center h-12 hover:bg-[#808080]">
                        <div className="relative left-[15px] font-inter font-bold text-[20px] leading-none">
                            Edit Roadmap
                        </div>
                    </button>
                    <button onClick={onDelete} className="relative flex items-center h-12 rounded-b-xl hover:bg-[#808080]">
                        <div className="relative left-[15px] font-inter font-bold text-[20px] text-[#EF1414] leading-none">
                            Delete Roadmap
                        </div>
                    </button>
                </div>}         
            </div>
        </>
    )
}

export default RoadmapDropdown;