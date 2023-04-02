import React, { useState } from "react"

const RoadmapToggle = ({showRoadmap, showArchive, isRoadmap}) => {
    return (
        <>
            <div className="relative flex top-[200px] justify-center items-start h-fit">
                <div className="relative flex left-[-320px] justify-center items-center w-[455px]">
                    <button onClick={showRoadmap} className="absolute flex left-[0px] justify-start items-center">
                    <div className="font-inter font-extrabold text-[32px] leading-[39px]">
                        Roadmap
                    </div>            
                    </button>
                    <button onClick={showArchive} className="absolute flex justify-end right-[0px] items-center">
                    <div className="font-inter font-extrabold text-[32px] leading-[39px]">
                        Archive
                    </div>    
                    </button>
                    <div className="absolute flex top-[23px] left-[0px] bg-[#D9D9D9] w-[491px] h-[7px] rounded-[15px]">
                    {isRoadmap ? <div className="absolute bg-[#09275B] w-[159px] h-[7px] rounded-[15px]"></div> : <div className="absolute right-0 bg-[#09275B] w-[159px] h-[7px] rounded-[15px]"></div>}
                    </div>
                </div>
            </div>      
        </>
    )
}

export default RoadmapToggle;