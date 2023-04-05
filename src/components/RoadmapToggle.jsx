import React, { useState } from "react"

const RoadmapToggle = ({showRoadmap, showArchive, isRoadmap}) => {
    return (
        <>
            <div className="flex flex-col justify-center items-stretch w-[40%] h-fit mx-8 mb-[45px]">
                <div className="flex justify-between min-w-[400px]">
                    <button onClick={showRoadmap} className="flex justify-start items-center">
                        <div className="font-inter font-extrabold text-[32px] leading-[39px]">
                            Roadmap
                        </div>            
                    </button>
                    <button onClick={showArchive} className="flex justify-end items-center">
                        <div className="font-inter font-extrabold text-[32px] leading-[39px]">
                            Archive
                        </div>    
                    </button>
                </div>
                <div className="flex bg-[#D9D9D9] w-full min-w-[400px] h-[7px] rounded-[15px]">
                    {isRoadmap ? <div className="relative left-0 bg-[#09275B] w-1/3 h-[7px] rounded-[15px]"></div> : <div className="relative left-2/3 bg-[#09275B] w-1/3 h-[7px] rounded-[15px]"></div>}
                </div>
            </div>      
        </>
    )
}

export default RoadmapToggle;