import React from "react"

const RoadmapToggle = ({ showRoadmap, showArchive, isRoadmap }) => {
  return (
    <>
      <div className="flex flex-col w-[250px] space-y-2">
        <div className="flex justify-between">
          <button onClick={showRoadmap} className="font-inter font-bold text-lg">
            <span className="pl-2">Roadmap</span>
          </button>
          <button onClick={showArchive} className="font-inter font-bold text-lg">
            <span className="pr-4">Archive</span>
          </button>
        </div>
        <div className="relative">
          <div className="bg-[#D9D9D9] w-[250px] h-[7px] rounded-[15px]" />
          <div className={`${isRoadmap ? '-translate-x-[125px]' : 'translate-x-[25px]'} absolute top-1/2 left-1/2 transform -translate-y-1/2 bg-[#09275B] w-[100px] h-[7px] rounded-[15px] transition-all`}></div>
        </div>
      </div>
    </>
  )
}

export default RoadmapToggle;