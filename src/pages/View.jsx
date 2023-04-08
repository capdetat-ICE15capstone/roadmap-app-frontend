import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from "../functions/axiosInstance";
import { getRoadmap } from "../functions/roadmapFunction"

import { ReactComponent as Circle } from "../assets/shapes/circle.svg";
import { ReactComponent as Square } from "../assets/shapes/square.svg";
import { ReactComponent as Triangle } from "../assets/shapes/triangle.svg";
import { ReactComponent as Bell } from "../assets/shapes/bell.svg";

export default function View() {
  const navigate = useNavigate();
  const { roadmap_id } = useParams();

  const user_id = 123456;

  // check owner profile picture == null?
  // server check if the user that request this roadmap is the owner. If not, some of the field returned e.g. prof-pic, exp will return with either null or none.

  const [current, setCurrent] = useState('0');
  const [currentViewNode, setcurrentViewNode] = useState('-1');
  const [isOwner, setIsOwner] = useState(true);
  const [detailToggle, setDetailToggle] = useState(true);
  const [saveToggle, setSaveToggle] = useState(false);
  const [nodeViewToggle, setNodeViewToggle] = useState(false);
  const [liked, setLiked] = useState(false);
  const [completeButton, setCompleteButton] = useState(false);

  const [currentTask, setCurrentTask] = useState(
    {
      "name": "",
      "description": "",
      "startDate": "",
      "dueDate": "",
      "nodeShape": "",
      "nodeColor": "",
      "id": null,
      "isDone": null,
      "subtasks": []
    }
  );

  const [roadmap, setRoadmap] = useState(
    {
      "name": "Title",
      "description": "Description",
      "roadmap_deadline": "",
      "is_before_start_time": null,
      "reminder_time": 0,
      "is_private": null,
      "rid": null,
      "views_count": 0,
      "stars_count": 0,
      "forks_count": 0,
      "edited_at": "",
      "owner_id": null,
      "creator_id": null,
      "owner_name": null,
      "creator_name": null,
      "owner_profile_picture_id": null,
      "creator_profile_picture_id": null,
      "next_task": {
        "title": "",
        "description": "",
        "start_time": "",
        "deadline": "",
        "shape": "",
        "color": "",
        "tid": null,
        "is_done": null,
        "subtasks": []
      },
      "tasks_name": [
      ],
      "shapes": [
      ],
      "colors": [
      ],
      "tags": [],
      "task_relation": [
      ],
      "archive_date": null,
      "exp": 0,
      "tasks": []
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

  function completeRoadmap() {
    let res = { ...roadmap };
    res['is-active'] = false;
    setRoadmap(res);
    setCompleteButton(false);
  }

  function nodeShapeGenerator(nodeShape, nodeColor, node_id) {
    let currentNodeColor = "";
    if (node_id !== null && roadmap['is-active'] === true) {
      if (node_id < current) {
        currentNodeColor = "#707070";
      } else if (node_id > current) {
        currentNodeColor = "#A0A0A0"
      } else {
        currentNodeColor = nodeColor;
      }
    } else {
      currentNodeColor = nodeColor;
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
    try {
      const res = await getRoadmap(rid);
      console.log(res.rid);
      setRoadmap(res);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRoadmap(roadmap_id);
  }, []);

  async function getUserID() {
    const route = `/user/user`;
    axiosInstance.get(route)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

function updateSubtasks() {
    roadmap.next_task.subtasks.map((element) => {
      console.log(element);
      updateSubtask(element);
    });
  }

  function shortenString(str, maxLength) {
    if (str.length > maxLength) {
      // Shorten the string to the maximum length
      str = str.slice(0, maxLength) + '...';
    }
    return str;
  }

  function convertDateTimeString(str) {
    const dateObj = new Date(str);
    const formattedDateTime = dateObj.toLocaleString();
    return formattedDateTime;
  }

  // save logic: push save and then reload page?
  // if that is the case, then we need to implement a button that can only 
  // be activated when subtasks are all checked... (new dedicated useState to store subtasks?)

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
                  {!roadmap.is_private ? "Public" : "Private"}
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
                        setcurrentViewNode(index);
                        setNodeViewToggle(!nodeViewToggle);
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
                    {roadmap.next_task.subtasks.map((subtask, index) => {
                      return (
                        <label key={index}>
                          <input
                            type="checkbox"
                            className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded"
                            defaultChecked={subtask.is_done}
                            onChange={() => {
                              console.log(subtask.is_done);
                              let res = {...roadmap};
                              console.log(res.next_task.subtasks[index].is_done);
                              res.next_task.subtasks[index].is_done = !res.next_task.subtasks[index].is_done;
                              setRoadmap(res);
                            }}
                          />
                          {subtask.title}
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