import React, { useState } from "react";
import { useNavigate } from "react-router";
import Roadmap from "../components/Roadmap";
import DuoSubpageSelector from "../components/DuoSubPageSelector";

import { ReactComponent as DarkHomeIcon } from "../assets/dark_home_icon.svg";

const Activity = () => {
    const [currentTab, setCurrentTab] = useState("1");

    return (
        <div className="flex-col">
            {/* page title */}
            <div className="flex m-[38px] mt-[59px]">
                <div className="">
                    <DarkHomeIcon/>
                </div>          
                <div className="font-inter font-extrabold text-[40px] text-[#09275B] leading-[48px]">
                    Activity
                </div>
            </div>

            {/* duo sub page selector */}
            <div className='mx-20'>
                <DuoSubpageSelector tab1Name="Task" tab2Name="Quest" setCurrentTab={setCurrentTab} currentTab={currentTab}/>
            </div>
            
            {/* conditional render */}
            <div className='flex mx-40 w-20 bg-green-200'>
                {currentTab === "1" 
                ? <RenderTask/> 
                : <RenderQuest/>
                }
            </div>
        </div>
    )
}

const RenderTask = () => {
    const taskData = [
        {
            name: "Task-Roadmap",
            due_date: "24/2/2023",
            xp: 100,
            rid: 1
        },
        {
            name: "ayoooo",
            due_date: "28/2/2023",
            xp: 100,
            rid: 3
        },
        {
            name: "aaaaaaaaarghhhhhh",
            due_date: "33/2/2023",
            xp: 100,
            rid: 2
        }
    ];

    return (
        <div className='grow bg-blue-200'>
            <div className="flex justify-between">
                <div className="w-20 bg-red-200">a</div>
                <div className="w-10 bg-red-200">a</div>
                <div className="w-5 bg-red-200">a</div>
            </div>
        </div>
    )
}

const RenderQuest = () => {
    return (
        <div>
            aaaa
        </div>
    )
}

export default Activity;