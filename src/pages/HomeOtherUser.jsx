import React, { useState } from "react";
import Roadmap from "../components/Roadmap";
import Kurumi from "../assets/kurumi.jpg";
import RoadmapToggle from "../components/RoadmapToggle"
import { ReactComponent as DarkHomeIcon } from "../assets/dark_home_icon.svg";
import { ReactComponent as BinIcon } from "../assets/Bin.svg"
import { ReactComponent as LockIcon } from "../assets/Lock.svg"

const HomeOtherUser = () => {
  const [isRoadmap, setIsRoadmap] = useState(true);
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isPublic, setIsPublic] = useState(false);

  function shortenString(str, maxLength) {
    if (str.length > maxLength) {
      // Shorten the string to the maximum length
      str = str.slice(0, maxLength) + '...';
    }
    return str;
  }

  const clickRoadmap = () => {
    setIsRoadmap(true)
    setIsActive(true)  
  }

  const clickArchive = () => {
    setIsRoadmap(false)
    setIsActive(false)
  }

  const deleteRoadmap = () => 
    setIsDeleteClick(!isDeleteClick)

  return (
    <>
      <div className="flex flex-col h-screen overflow-scroll overflow-x-hidden">
        <div className="relative flex top-[59px] left-[38px] w-fit h-fit">
          <div className="mr-[13px]">
            <DarkHomeIcon/>
          </div>          
          <div className="font-inter font-bold text-3xl text-[#09275B]">
            Home
          </div>
        </div>
        <div className="flex flex-col w-3/4 m-auto mt-[133px]">
          <div className="flex w-full justify-center">
            <div className="flex justify-between justify-self-center border border-[#D9D9D9] min-w-[260px] w-3/4 rounded-[30px] mb-8">
              <div className="flex flex-col justify-start w-1/2">
                <div className="flex flex-wrap items-center mx-6 mr-12 justify-start h-fit my-[20px]">
                  <div className="relative mr-4">
                    <div className="font-inter font-bold text-lg text-[#09275B]">
                      Kurumi
                    </div>
                  </div>
                  {isPublic && <div className="flex justify-between bg-[#034DCF] text-white font-bold h-fit rounded-[30px]">
                    <div className="flex mx-[10px] justify-start items-center">
                      <div className="font-inter text-[#FFFFFF]">
                        Level:
                      </div>
                    </div>     
                    <div className="flex mx-[10px] justify-start items-center">
                      <div className="font-inter text-[#FFFFFF]">
                        10
                      </div>
                    </div>               
                  </div>}
                </div>
                {isPublic?
                <div className="flex flex-col">
                  <div className="mx-6 mt-[10px] mb-[20px]">
                    <div className="font-inter font-light">
                      Kurumi Tokisaki (Codename: Nightmare) 
                    </div>
                  </div>
                  <div className="mx-6 my-[10px]">
                    <a href="https://date-a-live.fandom.com/wiki/Kurumi_Tokisaki" className="font-inter font-light text-[#034DCF]">
                    {shortenString("https://date-a-live.fandom.com/wiki/Kurumi_Tokisaki", 30)}
                    </a>                
                  </div>            
                </div>:
                <div className="flex justify-center items-center mb-[20px]">
                  <div className="flex justify-center items-center w-[75px] min-w-[75px] h-[75px] rounded-[75px] border-[3px] border-[#000000] scale-50">
                    <LockIcon />
                  </div>
                  <div className="font-inter font-bold text-lg">
                    This account is private
                  </div>
                </div>}              
              </div>
              <div className="flex justify-end w-fit max-w-[200px] h-fit max-h-[200px] ml-4">
                <img src={Kurumi} className="rounded-full border border-[#5f4545]"/>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <div className="flex w-3/4 justify-start">
              <RoadmapToggle showRoadmap={clickRoadmap} showArchive={clickArchive} isRoadmap={isRoadmap}/>
            </div>            
          </div>          
          <div className="flex w-full justify-center">
            {isPublic? 
            <div className="flex w-3/4 justify-start">
              <div className="flex flex-wrap justify-start items-start w-fit max-w-[1152px] h-fit m-0">                
                <div>
                  <Roadmap 
                  creator_name="Thanapat" 
                  owner_name="Tripipat" 
                  title="React skill issue" 
                  created_at="03/17/2023" 
                  edited_at="today bich" 
                  views_counts={1}
                  isActive={isActive}
                  deleteFunction={deleteRoadmap} />
                </div>
                <div>
                  <Roadmap
                  creator_name="FingTheMan" 
                  owner_name="Wuttikorn" 
                  title="Dying From Capstone" 
                  created_at="03/17/2023" 
                  edited_at="03/18/2023" 
                  views_counts={2}
                  isActive={isActive}
                  deleteFunction={deleteRoadmap} />
                </div>            
              </div>
            </div>:
            <div className="flex flex-col w-3/4 min-w-[260px] rounded-[30px] mt-8 justify-center items-center bg-[#F0F3F4] h-[462px] mb-[20px]">
              <div className="flex justify-center items-center w-[75px] h-[75px] rounded-[75px] border-[3px] border-[#000000]">
                <LockIcon />
              </div>
              <div className="font-inter font-bold text-lg">
                This account is private
              </div>
            </div>}
          </div>
        </div>       
      </div>
    </>
  );
};

export default HomeOtherUser;