import React, { useState } from "react";
import { useNavigate } from "react-router";
import Roadmap from "../components/Roadmap";
import DuoSubpageSelector from "../components/DuoSubPageSelector";

import { ReactComponent as TriangleIcon } from "../assets/activity_assets/triangle.svg";

const Activity = () => {
    const [currentTab, setCurrentTab] = useState("1");

    return (
        <div className="flex-col">
            {/* page title */}
            <div className="flex m-[38px] mt-[59px]">
                <div className="">
                    <TriangleIcon/>
                </div>          
                <div className="font-inter font-extrabold text-3xl text-[#09275B] leading-[48px]">
                    Activity
                </div>
            </div>

            {/* duo sub page selector */}
            <div className='w-3/4 max-w-4xl ml-52'>
                <DuoSubpageSelector tab1Name="Task" tab2Name="Quest" setCurrentTab={setCurrentTab} currentTab={currentTab}/>
            </div>
            
            {/* conditional render */}
            <div className='flex w-3/4 max-w-4xl mx-auto'>
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
        <div className='grow flex-col'>
            {taskData.map((task) => {
                return (
                    <button className="flex flex-col w-full hover:bg-gray-100" onClick={handleClick}>
                        <div className="flex justify-between h-14 w-full my-3">
                            {/* name, due date */}
                            <div className="w-48 h-full flex">
                                <div className="border-l-[3px] border-red-500 h-full w-4"></div>
                                <div className="flex flex-col justify-between text-left">
                                    <p className="text-nav-blue text-lg font-bold">{task.name}</p>
                                    <p className="text-nav-blue text-sm">{"due date: " + task.due_date}</p>
                                </div>
                            </div>
                            {/* xp */}
                            <div className="min-w-[64px] my-auto">
                                <p className="bg-red-500 rounded-full w-full py-1 text-center text-white text-sm">{"xp: " + task.xp}</p>
                            </div>
                            <div className="w-10 my-auto">
                                <TriangleIcon className="ml-[30%]"/>
                                
                            </div>
                        </div>
                        <hr className='w-full border-1 border-gray-400'/>
                    </button>
                )
            })}
        </div>
    )
}

const RenderQuest = () => {
    const questData = [
        {
            name: "Daily login",
            point: 25,
            qid: 1
        },
        {
            name: "Public a roadmap",
            point: 25,
            qid: 2
        },
        {
            name: "Rate a roadmap",
            point: 25,
            qid: 3
        }
    ];

    return (
        <div className='grow flex-col'>
            {questData.map((quest) => {
                return (
                    <button className="flex flex-col w-full hover:bg-gray-100" onClick={handleClick}>
                        <div className="flex justify-between h-14 w-full my-3">
                            {/* name, due date */}
                            <div className="w-48 h-full flex">
                                <div className="border-l-[3px] border-yellow-400 h-full w-4"></div>
                                <div className="flex flex-col justify-between text-left">
                                    <p className="text-nav-blue text-lg font-bold">{quest.name}</p>
                                    <p className="text-nav-blue text-sm">daily quest</p>
                                </div>
                            </div>
                            {/* xp */}
                            <div className="min-w-[64px] my-auto">
                                <p className="bg-yellow-400 rounded-full w-full py-1 text-center text-white text-sm">{"xp: " + quest.point}</p>
                            </div>
                            <div className="w-10 my-auto">
                                <TriangleIcon className="ml-[30%]"/>
                                
                            </div>
                        </div>
                        <hr className='w-full border-1 border-gray-400'/>
                    </button>
                )
            })}
        </div>
    )
}

const handleClick = () => {
    console.log('Button clicked!');
};

export default Activity;