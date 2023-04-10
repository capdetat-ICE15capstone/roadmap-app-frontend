import React, { useState } from "react";
import { useEffect } from 'react';
import { axiosInstance } from "../functions/axiosInstance";
import { useNavigate } from "react-router";
import Roadmap from "../components/Roadmap";
import DuoSubpageSelector from "../components/DuoSubPageSelector";
import Spinner from "../components/Spinner";

import { ReactComponent as TriangleIcon } from "../assets/activity_assets/triangle.svg";
import { ReactComponent as BookIcon } from "../assets/activity_assets/book.svg";

const Activity = () => {

    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [taskData, setTaskData] = useState(null);
    const [questData, setQuestData] = useState(null);

    const [currentTab, setCurrentTab] = useState("1");

    useEffect (() => {
        insertDailyQuests();
        const fetchData = async () => {
            const response1 = await getQuest();
            setQuestData(response1);
            const response2 = await getNextTask();
            setTaskData(response2);
            //setData(response);
            //setData(response.data);
        }
        fetchData();
    }, []);

    // use roadmap name (searchValue) to get an array of corresponding rid
    const getNextTask = async (searchValue) => {
        const route = "/search/get_next_task_roadmap";
        try {
            const response = await axiosInstance.get(route, {
                params: {
                    current_datetime: currentDateTime()
                }
            });
            console.log("get_next_task_roadmap : ")
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const RenderTask = (data) => {
        const taskData = formatTaskData(data);
    
        return (
            <div className='grow flex-col'>
                {taskData.map((task) => {
                    return (
                        <button className="flex flex-col w-full hover:bg-gray-100" onClick={() => handleClickTask(task.rid)}>
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
                                    <p className="bg-red-500 rounded-full w-full py-1 text-center text-white text-sm px-3">{"xp: " + task.xp}</p>
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
    
    const RenderQuest = (data) => {
        const questData = formatQuestData(data);
    
        return (
            <div className='grow flex-col'>
                {questData.map((quest) => {
                    return (
                        <button className="flex flex-col w-full" onClick={() => handleClickQuest()} disabled={true}>
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
                                    <p className="bg-yellow-400 rounded-full w-full py-1 text-center text-white text-sm px-3">{"point: " + quest.point}</p>
                                </div>
                                <div className="w-10 my-auto">

                                    
                                </div>
                            </div>
                            <hr className='w-full border-1 border-gray-400'/>
                        </button>
                    )
                })}
            </div>
        )
    }
    
    const handleClickTask = (rid) => {
        navigate(`/view/${rid}`);
        console.log('Button clicked!');
    };
    
    const handleClickQuest = () => {
        console.log('Button clicked!');
    };

    if (!taskData) {
        return <Spinner />;
    }

    return (
        <div className="flex-col">
            {/* page title */}
            <div className="flex m-[38px] mt-[59px] items-center">
                <div className="">
                    <BookIcon/>
                </div>          
                <div className="font-inter font-extrabold text-3xl text-[#09275B] leading-[48px] px-3">
                    Activity
                </div>
            </div>

            {/* duo sub page selector */}
            <div className='w-3/4 max-w-4xl mx-auto -translate-x-8'>
                <DuoSubpageSelector tab1Name="Task" tab2Name="Quest" setCurrentTab={setCurrentTab} currentTab={currentTab}/>
            </div>
            
            {/* conditional render */}
            <div className='flex w-3/4 max-w-4xl mx-auto'>
                {currentTab === "1" 
                ? <RenderTask data={taskData}/> 
                : <RenderQuest data={questData}/>
                }
            </div>
        </div>
    )
}

export const getQuest = async (timeout = 0) => {
    const route = "/quest/get_user_daily_quests";

    try {
        let response = await axiosInstance.get(route, { timeout: timeout });
        console.log(response.data);
        return response;
    } catch (error) {
        console.error("Fail GetQuest()");
    }
}

export const insertDailyQuests = async (timeout = 0) => {
    const route = '/quest/insert_daily_quest/';
    const now = currentDateTime();
    const body1 = {qid: 0, date: now, is_done: false};
    const body2 = {qid: 1, date: now, is_done: false};
    const body3 = {qid: 2, date: now, is_done: false};

    insertDailyQuest(body1);
    insertDailyQuest(body2);
    insertDailyQuest(body3);
}

const insertDailyQuest = async (body, timeout = 0) => {
    const route = '/quest/insert_daily_quest/';

    try {
        console.log("---attempt insert daily quest: " + body.qid + "---");
        console.log(body);
        let response = await axiosInstance.post(route, body, { timeout: timeout });
        console.log(response.data);
        console.log("---success---");
        return response;
    } catch (error) {
        console.log("---fail---");
    }
}

export const currentDateTime = () => {
    const now = new Date();
    const isoString = now.toISOString().slice(0, -5);

    return (
        isoString
    );
}

const formatTaskData = ({data}) => {
    const outputData = Object.keys(data).map((id) => {
        return {
            name: data[id].title,
            due_date: formatTaskDataDueDate(data[id].deadline),
            xp: 100,
            rid: id
        }
    })
    return (
        outputData
    )

    // output format sample
    // const taskData = [
    //     {
    //         name: "Task-Roadmap",
    //         due_date: "24/2/2023",
    //         xp: 100,
    //         rid: 1
    //     },
    //     {
    //         name: "ayoooo",
    //         due_date: "28/2/2023",
    //         xp: 100,
    //         rid: 3
    //     },
    //     {
    //         name: "aaaaaaaaarghhhhhh",
    //         due_date: "33/2/2023",
    //         xp: 100,
    //         rid: 2
    //     }
    // ];
}

const formatTaskDataDueDate = (deadline) => {
    const date = new Date(deadline);
    const output = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    return output;
}

const formatQuestData = ({data}) => {
    data = data.data;
    const comparedData = [
        {
            name: "Daily login",
            point: 25,
            qid: 0,
            des: "/"
        },
        {
            name: "Public a roadmap",
            point: 25,
            qid: 1,
            des: "/"
        },
        {
            name: "Rate a roadmap",
            point: 25,
            qid: 2,
            des: "/"
        }
    ];

    console.log(data);
    const outputData = comparedData.filter((item) => data.includes(item.qid));

    return outputData;
}

const generalCompleteQuest = async (qid, point, timeout = 0) => {
    const route = '/quest/complete_daily_quest/';
    const body = { qid, point };
    console.log(body);

    try {
        let response = await axiosInstance.post(route, body, { timeout: timeout });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

export const completeQuestDailyLogin = () => {
    generalCompleteQuest(0, 25);
}

export const completeQuestPublicRoadmap = () => {
    generalCompleteQuest(1, 25);
}

export const completeQuestRateRoadmap = () => {
    generalCompleteQuest(2, 25);
}

export default Activity;