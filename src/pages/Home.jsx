import React, { useState } from "react";
import Roadmap from "../components/Roadmap";
import Kurumi from "../assets/kurumi.jpg";
import RoadmapCreate from "../components/RoadmapCreate";
import RoadmapDropdown from "../components/RoadmapDropdown";
import RoadmapToggle from "../components/RoadmapToggle"
import { ReactComponent as DarkHomeIcon } from "../assets/dark_home_icon.svg";
import { ReactComponent as BinIcon } from "../assets/Bin.svg" 

const Home = () => {
  const [isRoadmap, setIsRoadmap] = useState(true);
  const [isDeleteClick, setIsDeleteClick] = useState(false);

  const clickRoadmap = () => 
    setIsRoadmap(true)  

  const clickArchive = () => 
    setIsRoadmap(false)

  const deleteRoadmap = () => 
    setIsDeleteClick(!isDeleteClick)

  return (
    <>
      <div className="h-screen overflow-x-hidden">
        <div className="relative flex top-[59px] left-[38px] w-fit h-fit">
          <div className="mr-[13px]">
            <DarkHomeIcon/>
          </div>          
          <div className="font-inter font-extrabold text-[40px] text-[#09275B] leading-[48px]">
            Home
          </div>
        </div>
        <div className="relative flex top-[133px] justify-center items-center h-[266px]">
          <div className="relative inline-block my-4">
            <div className="relative flex flex-col bg-[#FFFFFF] w-[1118px] h-[266px] pb-[20px] font-bold appearance-none border border-[#D9D9D9] rounded-[30px] overflow-x-hidden">
              <div className="relative flex items-center justify-start left-[50px] top-[10px] w-fit h-fit my-[10px]">
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
              <div className="relative flex flex-col left-[50px] top-[10px] w-[700px] h-fit my-[10px]">
                <div className="font-inter font-light text-[40px] leading-[48px]">
                  Kurumi Tokisaki (Codename: Nightmare)
                </div>
              </div>
              <div className="relative flex flex-col left-[50px] top-[10px] w-[630px] h-fit my-[10px]">
                <a href="https://date-a-live.fandom.com/wiki/Kurumi_Tokisaki" className="font-inter font-light text-[#034DCF] text-[25px] leading-[30px]">
                  https://date-a-live.fandom.com/wiki/Kurumi_Tokisaki
                </a>                
              </div>    
            </div>
            <div className="absolute left-[785px] top-[34px] bg-[#FFFFFF] w-[308px] h-[308px] rounded-[308px] border border-[#D9D9D9]">
              <img src={Kurumi} className="rounded-[308px]"/>
            </div>
          </div>
        </div>
        <RoadmapToggle showRoadmap={clickRoadmap} showArchive={clickArchive} isRoadmap={isRoadmap}/>
        {/*Roadmaps*/}
        <div className="relative flex left-[0px] top-[250px] justify-center items-start">
          <div className="relative w-[1152px] h-fit">
            <div className="relative flex justify-start items-start">
              <div className="absolute flex">
                <div className="relative inline-block"> 
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
                    <RoadmapDropdown onDelete={deleteRoadmap}/>
                  </div>
                  <div className="inline-block">
                    <Roadmap
                    creator_name="FingTheMan" 
                    owner_name="Wuttikorn" 
                    title="Dying From Capstone" 
                    created_at="03/17/2023" 
                    edited_at="03/18/2023" 
                    views_counts={177013} />
                    <RoadmapDropdown onDelete={deleteRoadmap}/>
                  </div>                  
                </div>         
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDeleteClick && 
      <div className="absolute flex left-0 justify-center items-center w-full h-screen bg-gray-300 bg-opacity-[0.58] z-10">
        <div className="w-[852px] h-[281px]">
          <div className="relative flex flex-col w-[852px] h-[281px]">
            <div className="w-full h-[78px] bg-[#00286E] rounded-t-[20px]">
              <div className="relative flex justify-center items-center left-[23px] top-[10px] w-fit">
                <BinIcon className="mr-[13px]"/>
                <div className="font-inter font-extrabold text-[36px] text-[#FFFFFF]">Confirm Deletion</div>
              </div>
            </div>
            <div className="w-full h-[203px] bg-[#F0F3F4] rounded-b-[20px]">
              <div className="relative top-[33px] left-[48px] w-[732px] h-fit">
                <div className="font-nunito-sans font-bold text-[32px] text-[#333333] leading-[44px]">Are you sure that you want to permanently delete the selected roadmap?</div>
                <div className="relative flex left-[490px] w-[293px] h-[43px]">
                  <button onClick={deleteRoadmap} className="relative flex justify-center items-center mr-[13px] text-[#525252] hover:text-[#FFFFFF] border border-[#525252] rounded-[30px] w-[137px] hover:bg-[#e30b0b] hover:border-none">
                    <div className="font-nunito-sans font-extrabold text-[20px] leading-[27px]">
                      Cancel
                    </div>
                  </button>
                  <button onClick={deleteRoadmap} className="relative flex justify-center items-center text-[#FDFDFB] bg-[#00286E] hover:bg-[#038a1c] border rounded-[30px] w-[137px]">
                    <div className="font-nunito-sans font-extrabold text-[20px] leading-[27px]">
                      Delete
                    </div>
                  </button>
                </div>       
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};

export default Home;
