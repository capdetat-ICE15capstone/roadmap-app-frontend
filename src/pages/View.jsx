import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from "../functions/axiosInstance";
import { getRoadmap } from '../functions/roadmapFunction';
import { shortenString, convertDateTimeString } from '../functions/formatFunction';

import { ReactComponent as Circle } from "../assets/shapes/circle.svg";
import { ReactComponent as Square } from "../assets/shapes/square.svg";
import { ReactComponent as Triangle } from "../assets/shapes/triangle.svg";
import { ReactComponent as Bell } from "../assets/shapes/bell.svg";

export default function View() {
  const navigate = useNavigate();
  const { roadmap_id } = useParams();

  const [isOwner, setIsOwner] = useState(true);
  const [detailToggle, setDetailToggle] = useState(true);
  const [saveToggle, setSaveToggle] = useState(false);
  const [nodeViewToggle, setNodeViewToggle] = useState(false);
  const [liked, setLiked] = useState(false);
  const [completeButton, setCompleteButton] = useState(false);

  const [currentTask, setCurrentTask] = useState(
    {
      "title": "string",
      "description": "string",
      "start_time": "2023-04-09T11:38:12.380Z",
      "deadline": "2023-04-09T11:38:12.380Z",
      "shape": "string",
      "color": "string",
      "tid": 0,
      "is_done": true,
      "subtasks": [
        {
          "title": "string",
          "stid": 0,
          "is_done": true
        }
      ]
    }
  );

  const [tasks, setTasks] = useState(
    {
      "currentTask": '0',
      "taskList": [
        {
          "title": "string",
          "description": "string",
          "start_time": "2023-04-09T11:38:12.380Z",
          "deadline": "2023-04-09T11:38:12.380Z",
          "shape": "string",
          "color": "string",
          "tid": 0,
          "is_done": true,
          "subtasks": [
            {
              "title": "string",
              "stid": 0,
              "is_done": true
            }
          ]
        }
      ]
    }
  );

  const [roadmap, setRoadmap] = useState(
    {
      "title": "string",
      "description": "string",
      "roadmap_deadline": "2023-04-09T11:01:10.188Z",
      "is_before_start_time": true,
      "reminder_time": 0,
      "is_private": true,
      "rid": 0,
      "views_count": 0,
      "stars_count": 0,
      "forks_count": 0,
      "edited_at": "2023-04-09T11:01:10.188Z",
      "owner_id": 0,
      "creator_id": 0,
      "owner_name": "string",
      "creator_name": "string",
      "owner_profile_picture_id": 0,
      "creator_profile_picture_id": 0,
      "next_task": {
        "title": "string",
        "description": "string",
        "start_time": "2023-04-09T11:01:10.188Z",
        "deadline": "2023-04-09T11:01:10.188Z",
        "shape": "string",
        "color": "string",
        "tid": 0,
        "is_done": true,
        "subtasks": [
          {
            "title": "string",
            "stid": 0,
            "is_done": true
          }
        ]
      },
      "tasks_name": [
        "string"
      ],
      "shapes": [
        "string"
      ],
      "colors": [
        "string"
      ],
      "tags": [
        "string"
      ],
      "task_relation": [
        0
      ],
      "tasks": [
        {
          "title": "string",
          "description": "string",
          "start_time": "2023-04-09T11:01:10.188Z",
          "deadline": "2023-04-09T11:01:10.188Z",
          "shape": "string",
          "color": "string",
          "tid": 0,
          "is_done": true,
          "subtasks": [
            {
              "title": "string",
              "stid": 0,
              "is_done": true
            }
          ]
        }
      ],
      "archive_date": "2023-04-09T11:01:10.190Z",
      "exp": 0
    }
  );

  async function likeRoadmap() {
    const route = `/roadmaps/like`;
    try {
      const response = await axiosInstance
        .put(route, {
          rid: roadmap.rid,
        }, { timeout: 0 })
        .then((res) => res.data)
        .catch(() => {
          throw new Error("error");
        });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  function nodeShapeGenerator(nodeShape, nodeColor, status) {
    let currentNodeColor = "";
    switch (status) {
      case "complete":
        currentNodeColor = "";
        break;
      case "onGoing":
        currentNodeColor = "";
        break;
      case "onComing":
        currentNodeColor = "";
        break;
      default:
        currentNodeColor = "blue";
        break;
    }
    switch (nodeShape) {
      case "square":
        return (
          <svg className="hover:scale-110 transition group duration-100" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill={currentNodeColor} />
          </svg>
        );
      case "circle":
        return (
          <svg className="hover:scale-110 transition group duration-100" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill={currentNodeColor} />
          </svg>
        );
      case "triangle":
        return (
          <svg className="hover:scale-110 transition group duration-100" width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 0L49.2487 48H0.751289L25 0Z" fill={currentNodeColor} />
          </svg>
        );
      default:
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="black" />
          </svg>
        );
    }
  }

  async function fetchRoadmap(rid) {
    const route = `/roadmap/${rid}`;
    axiosInstance.get(route)
      .then((response) => {
        const fetchedRoadmap = response.data;
        const taskList = [];
        const current_tid = response.data.next_task.tid;

        setRoadmap(response.data);

        fetchedRoadmap['task_relation'].forEach((tid) => {
          const route = `/task/${tid}`;
          axiosInstance.get(route)
            .then((response) => {
              taskList.push(response.data);
              setTasks({
                "currentTask": current_tid,
                "taskList": taskList,
              })
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function checkUserAccess(owner_id) {
    const route = `/user/user`;
    axiosInstance.get(route)
      .then((response) => {
        const user_id = response.data.uid;
        (user_id === owner_id) ? setIsOwner(true) : setIsOwner(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    // fetchRoadmap(roadmap_id);
    getRoadmap(roadmap_id)
      .then((response) => {
        setRoadmap(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    checkUserAccess(roadmap.owner_id);
    console.log(roadmap);
    if ("tasks" in roadmap) {
      const currentNodeID = roadmap.next_task.tid;
      roadmap.tasks.forEach((task) => {
        if (task.id === currentNodeID) {
          console.log(task.id, "equals", currentNodeID);
          setCurrentTask(task);
        }
      });
    }
  }, [roadmap]);

  useEffect(() => {
    console.log(currentTask);
  }, [currentTask]);

  // now gotta modify this code to update per node (task/milestone) to save resources. 

  function saveRoadmap() {
    // send data to server
  }

  function completeTask() {
    // check for completion first. If not, return something to inform user.
    // otherwise, send completion to server.
  }

  async function updateSubtask(subtask) {
    const route = `/subtask/`;

    try {
      const response = await axiosInstance
        .put(route, subtask, { timeout: 0 })
        .then((res) => res.data)
        .catch(() => {
          throw new Error("error");
        });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateSubtasks() {
    const route = `/subtask/`;
    currentTask.subtasks.forEach((subtask) => {
      axiosInstance.put(route, {
        "title": subtask.detail,
        "stid": subtask.id,
        "is_done": subtask.status
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  return (
    <>
      <div className='flex h-full bg-white overflow-y-scroll py-8'>
        <div className="w-5/6 flex-col m-auto space-y-6">
          <div className='flex justify-between items-center'>
            <div className='text-3xl font-extrabold'>
              {roadmap.name}
            </div>
            {isOwner === true && (
              <div className="flex space-x-1">
                <button onClick={() => navigate("/create", { 'state': { 'roadmap': roadmap } })} className="bg-sub-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
                  Clone
                </button>
                <button onClick={() => navigate("/edit", { 'state': { 'roadmap': roadmap } })} className="bg-gray-300 grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
                  Edit
                </button>
                <button onClick={() => setDetailToggle(!detailToggle)} className="bg-gray-300 grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
                  i
                </button>
              </div>
            )}
          </div>
          <div className={`${(detailToggle) ? 'visible' : 'hidden'}`}>
            <div className='flex flex-col rounded-2xl text-sm space-y-2'>
              <div className='flex space-x-2'>
                <div className='border-solid border-[1px] rounded-full px-2 py-1 text-xs border-gray-300'>
                  {!roadmap.isPublic ? "Public" : "Private"}
                </div>
                <div className='border-solid border-[1px] rounded-full px-2 py-1 text-xs border-gray-300'>
                  Tags
                </div>
              </div>
              <div>
                {roadmap.description}
              </div>
            </div>
          </div>
          <div className='flex flex-col relative bg-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)] rounded-2xl p-8'>
            {isOwner === true && (
              <div className='z-50'>
                <Bell className='absolute right-[3%] top-[7%]' />
                <div className='absolute left-[3%] bottom-[7%] text-sm'>
                  Views: {roadmap.views_count}
                </div>
                <div className='absolute right-[3%] bottom-[7%] text-sm'>
                  Latest update: {convertDateTimeString(roadmap.edited_at)}
                </div>
              </div>
            )}
            {isOwner === true && (
              <div className='flex px-8 pt-4 pb-12 space-x-[25px] overflow-x-auto'>
                {roadmap.tasks.map((task, index) => {
                  const zIndex = 10 - index;
                  return (
                    <div key={index} className="relative" style={{ zIndex }}>
                      <div className="absolute top-1/2 -left-1/4 transform -translate-x-1/2 -translate-y-3/4 -z-10">
                        {(index > '0') && <hr className="w-[75px] h-1 bg-black border-0" />}
                      </div>
                      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30px] text-xs text-center font-bold'>
                        {shortenString(task.name, 14)}
                      </div>
                      <button onClick={() => {
                      }}>
                        {(task.isDone) && (
                          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-3xl text-center select-none'>
                            ✓
                          </div>
                        )}
                        {nodeShapeGenerator(task.nodeShape, task.nodeColor, task.id)}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {isOwner === true && roadmap.next_task !== null && (
            <div className='flex flex-col bg-white rounded-2xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)] space-y-4'>
              <div className='flex flex-row space-x-4 justify-between'>
                <div className='flex flex-col space-y-2 w-1/2 p-4'>
                  <div className='text-md font-bold'>
                    {roadmap.next_task.title}
                  </div>
                  <div className='text-sm'>
                    {roadmap.next_task.description}
                  </div>
                  <div className='flex space-x-2'>
                    <div className='grow font-bold text-center text-xs p-2'>
                      Start: {convertDateTimeString(roadmap.next_task.start_time)}
                    </div>
                    <div className='grow font-bold text-center text-xs p-2'>
                      Due: {convertDateTimeString(roadmap.next_task.deadline)}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col space-y-2 w-1/2 p-4 bg-gray-50 rounded-r-2xl justify-between'>
                  <div className='flex flex-col justify-center space-y-2 text-sm'>
                    {currentTask.subtasks.map((subtask, index) => {
                      return (
                        <label key={index}>
                          <input
                            type="checkbox"
                            className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded"
                            defaultChecked={subtask.status}
                            onChange={() => {
                              let updatedTask = { ...currentTask };
                              updatedTask.subtasks[index].status = !updatedTask.subtasks[index].status;
                              setCurrentTask(updatedTask);
                            }}
                          />
                          {subtask.detail}
                        </label>
                      )
                    })}
                  </div>
                  {(true) && (
                    <div className='flex flex-col md:flex-row md:justify-end gap-2'>
                      <button onClick={() => updateSubtasks()} className="bg-main-blue md:w-1/4 text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
                        Save
                      </button>
                      {(false) && (
                        <button onClick={() => console.log("activate 'completeRoadmap' and check for completion first.")} className="bg-gray-400 md:w-1/2 text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
                          Complete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {saveToggle && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex flex-col rounded-2xl p-4 bg-white space-y-4 shadow-lg">
                <div>
                  Are you sure you want to save?
                </div>
                <div className='flex space-x-2'>
                  <button onClick={() => setSaveToggle(!saveToggle)} className="bg-gray-400 w-1/2 text-white px-4 py-2 rounded-full text-sm font-bold" type="button">
                    Cancel
                  </button>
                  <button onClick={() => saveRoadmap()} className="bg-sub-blue w-1/2 text-white px-4 py-2 rounded-full text-sm font-bold" type="button">
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-black opacity-50 w-full h-full"></div>
          </div>
        )}
        {nodeViewToggle && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 z-10 flex items-center justify-center">

            </div>
            <div className="bg-black opacity-50 w-full h-full"></div>
          </div>
        )}
      </div >
      <button onClick={() => setIsOwner(!isOwner)} className="bg-nav-blue text-white px-4 py-2 font-semilight text-sm font-bold" type="button">
        CHANGE VIEW MODE (FOR DEVELOPMENT)
      </button>
    </>
  )
}