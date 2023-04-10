import React, { useEffect, useState } from "react";
import Roadmap from "../components/Roadmap";
import Kurumi from "../assets/kurumi.jpg";
import RoadmapCreate from "../components/RoadmapCreate";
import RoadmapToggle from "../components/RoadmapToggle"
import { ReactComponent as DarkHomeIcon } from "../assets/dark_home_icon.svg";
import { ReactComponent as BinIcon } from "../assets/Bin.svg" 
import { Link } from "react-router-dom";

const Home = () => {
  const [isRoadmap, setIsRoadmap] = useState(true);
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [noOfRoadmap, setNoOfRoadmap] = useState(3);
  const [showPremium, setShowPremium] = useState(false);
  const [isLimit, setIsLimit] = useState(false);  
  const [isPremium, setIsPremium] = useState(false);

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

  const promptPremium = () => 
    setShowPremium(!showPremium)  

  useEffect(() => {
    if (noOfRoadmap >= 3 && !isPremium) {
      setNoOfRoadmap(3)
      setIsLimit(true)
    }
  },[noOfRoadmap, isLimit])

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
                  <div className="flex justify-between bg-[#034DCF] text-white font-bold h-fit rounded-[30px]">
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
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mx-6 mt-[10px] mb-[20px]">
                    <div className="font-inter font-light">
                      Kurumi Tokisaki (Codename: Nightmare) 
                    </div>
                  </div>
                  <div className="mx-6 my-[10px]">
                    <a href="https://date-a-live.fandom.com/wiki/Kurumi_Tokisaki" className="font-inter font-light text-[#034DCF]">
                    {shortenString("https://date-a-live.fandom.com/wiki/Kurumi_Tokisaki", 25)}
                    </a>                
                  </div>            
                </div>              
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
            <div className="flex w-3/4 justify-start">
              <div className="flex flex-wrap justify-start items-start w-fit max-w-[1152px] h-fit m-0">
                {isRoadmap && 
                <div>
                  <RoadmapCreate isLimit={isLimit} onClick={promptPremium} />
                </div>}
                  <Roadmap isActive={isActive} isOwner={true} deleteFunction={deleteRoadmap}/>
                  <Roadmap isActive={isActive} isOwner={true} deleteFunction={deleteRoadmap}/>
              </div>
            </div>
          </div>
        </div>        
        {isDeleteClick && 
        <div className="absolute flex flex-col left-0 justify-center items-center w-full h-full bg-gray-300 bg-opacity-[0.58] z-10">
          <div className="flex justify-start items-center pl-[23px] w-1/2 min-w-[220px] max-w-[790px] h-fit bg-[#00286E] rounded-t-[20px]">
            <div className="flex items-center my-4">
              <BinIcon className="mr-[13px]"/>
              <div className="font-inter font-bold text-3xl text-[#FFFFFF]">Confirm Deletion</div>
            </div>
          </div>
          <div className="flex w-1/2 min-w-[220px] max-w-[790px] h-fit bg-[#F0F3F4] rounded-b-[20px]">
            <div className="flex flex-col h-fit">
              <div className="w-fit mx-10 my-8 font-inter font-bold text-xl text-[#333333] ">Are you sure that you want to permanently delete the selected roadmap?</div>
              <div className="flex justify-end mb-8 px-4 w-full h-[43px]">
                <button onClick={deleteRoadmap} className="flex justify-center items-center mr-[13px] text-[#525252] hover:text-[#FFFFFF] border border-[#525252] rounded-[30px] w-[90px] hover:bg-[#e30b0b] hover:border-none">
                  <div className="font-inter">
                    Cancel
                  </div>
                </button>
                <button onClick={deleteRoadmap} className="flex justify-center items-center text-[#FDFDFB] bg-[#00286E] hover:bg-[#038a1c] border rounded-[30px] w-[90px]">
                  <div className="font-inter">
                    Delete
                  </div>
                </button>
              </div>       
            </div>
          </div>
        </div>}
        {(isLimit && showPremium) &&
        <div className="absolute flex flex-col left-0 justify-center items-center w-full h-full bg-gray-300 bg-opacity-[0.58] z-10">
          <div className="flex justify-start items-center pl-[23px] w-1/2 min-w-[220px] max-w-[790px] h-fit bg-[#00286E] rounded-t-[20px]">
            <div className="flex items-center my-4">
              <BinIcon className="mr-[13px]"/>
              <div className="font-inter font-bold text-3xl text-[#FFFFFF]">Number of roadmaps owned capped!</div>
            </div>
          </div>
          <div className="flex w-1/2 min-w-[220px] max-w-[790px] h-fit bg-[#F0F3F4] rounded-b-[20px]">
            <div className="flex flex-col h-fit">
              <div className="w-fit mx-10 my-8 font-inter font-bold text-xl text-[#333333] ">You have reach the limit of roadmap owned. Please buy premium to gain access to more roadmaps.</div>
              <div className="flex justify-end mb-8 px-4 w-full h-[43px]">
                <button onClick={promptPremium} className="flex justify-center items-center mr-[13px] text-[#525252] hover:text-[#FFFFFF] border border-[#525252] rounded-[30px] w-[90px] hover:bg-[#e30b0b] hover:border-none">
                  <div className="font-inter">
                    Cancel
                  </div>
                </button>
                <Link onClick={promptPremium} to={'/premium'} className="flex justify-center items-center text-[#FDFDFB] bg-[#00286E] hover:bg-[#038a1c] border rounded-[30px] w-[90px]">
                  <div className="font-inter">
                    Ok
                  </div>
                </Link>
              </div>       
            </div>
          </div>
        </div>}
      </div>
    </>
  );
};

export default Home;