import React, { useState } from "react";
import Roadmap from "../components/Roadmap";
import Kurumi from "../assets/kurumi.jpg";
import RoadmapCreate from "../components/RoadmapCreate";
import RoadmapDropdown from "../components/RoadmapDropdown";

const Home = () => {
  const [isRoadmap, setIsRoadmap] = useState(true);

  const clickRoadmap = () => 
    setIsRoadmap(true)  

  const clickArchive = () => 
    setIsRoadmap(false)

  return (
    <>
      <div className="relative flex top-[133px] justify-center items-center h-[266px]">
        <div className="relative inline-block my-4">
          <div className="relative flex flex-row bg-[#FFFFFF] w-[1118px] h-[266px] font-bold appearance-none border border-[#D9D9D9] rounded-[30px]">
            <div className="relative flex items-center justify-center left-[30px] top-[0px] h-fit m-[20px]">
              <div className="relative mr-4">
                <div className="font-inter font-extrabold text-[40px] text-[#09275B] leading-[48px]">
                  Kurumi
                </div>
              </div>
              <div className="relative flex flex-col justify-center bg-[#034DCF] text-white font-bold w-[223px] h-[57px] rounded-[30px]">
                <div className="absolute flex justify-start items-center left-[19px]">
                  <div className="font-inter font-bold text-[30px] text-[#FFFFFF] leading-[36px]">
                    Level:
                  </div>
                </div>    
                <div className="absolute flex justify-end items-center right-[28px]">
                  <div className="font-inter font-bold text-[30px] text-[#FFFFFF] leading-[36px]">
                    10
                  </div>
                </div>               
              </div>
            </div>    
            <div className="absolute left-[785px] top-[34px] bg-[#FFFFFF] w-[308px] h-[308px] rounded-[308px] z-[20] border border-[#D9D9D9]">
              <img src={Kurumi} className="rounded-[308px]"/>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex top-[200px] justify-center items-start h-fit">
        <div className="relative flex left-[-320px] justify-center items-center w-[448px]">
          <button onClick={clickRoadmap} className="absolute flex left-[0px] justify-start items-center">
            <div className="font-inter font-extrabold text-[32px] text-[#09275B] leading-[39px]">
              Roadmap
            </div>            
          </button>
          <button onClick={clickArchive} className="absolute flex justify-end right-[0px] items-center">
            <div className="font-inter font-extrabold text-[32px] text-[#09275B] leading-[39px]">
              Archive
            </div>    
          </button>
          <div className="absolute flex top-[23px] left-[0px] bg-[#D9D9D9] w-[491px] h-[7px] rounded-[15px]">
            {isRoadmap ? <div className="absolute bg-[#09275B] w-[159px] h-[7px] rounded-[15px]"></div> : <div className="absolute right-0 bg-[#09275B] w-[159px] h-[7px] rounded-[15px]"></div>}
          </div>
        </div>
      </div>      
      {/*Roadmaps*/}
      <div className="relative flex top-[250px] justify-center items-start">
        <div className="absolute flex">
          <div className="relative inline-block mx-8"> 
            {isRoadmap && <div className="inline-block">
              <RoadmapCreate />
            </div>}
            <div className="inline-block">
              <Roadmap 
              creator_name="Thanapat" 
              owner_name="Tripipat" 
              title="React skill issue" 
              created_at="03/17/2023" 
              edited_at="today bich" 
              views_counts={6338098421} />
              <RoadmapDropdown />
            </div>
            <div className="inline-block">
              <Roadmap
              creator_name="FingTheMan" 
              owner_name="Wuttikorn" 
              title="Dying From Capstone" 
              created_at="03/17/2023" 
              edited_at="03/18/2023" 
              views_counts={177013} />
              <RoadmapDropdown />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;