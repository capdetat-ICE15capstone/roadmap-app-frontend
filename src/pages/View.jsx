import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Circle } from "../assets/shapes/circle.svg";
import { ReactComponent as Square } from "../assets/shapes/square.svg";
import { ReactComponent as Triangle } from "../assets/shapes/triangle.svg";
import { ReactComponent as Bell } from "../assets/shapes/bell.svg";

export default function View() {
  const navigate = useNavigate();

  const user_id = 123456;

  // check owner profile picture == null?
  // server check if the user that request this roadmap is the owner. If not, some of the field returned e.g. prof-pic, exp will return with either null or none.

  const [current, setCurrent] = useState('0');
  const [currentViewNode, setcurrentViewNode] = useState('-1');
  const [isOwner, setIsOwner] = useState(false);
  const [detailToggle, setDetailToggle] = useState(true);
  const [saveToggle, setSaveToggle] = useState(false);
  const [nodeViewToggle, setNodeViewToggle] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [currentSubtasks, setCurrentSubtasks] = useState({});
  const [liked, setLiked] = useState(false);
  const [completeButton, setCompleteButton] = useState(false);

  // const [myProfile, setMyProfile] = useState({
  //   "profile": {
  //     "username": "zack",
  //     "is_premium": false,
  //     "is_active": true,
  //     "points": 0,
  //     "profile_picture_id": 0,
  //     "is_private": false,
  //     "exp": 0,
  //     "bio": null
  //   },
  //   "roadmaps": [],
  //   "archived_roadmaps": []
  // });

  // When request forking, check if roadmap has more than 16 nodes... if roadmap has more than 16 nodes, check if the user has premium. If not, prompt clone failure.\
  // Also check for roadmaps.length?

  // const [roadmap, setRoadmap] = useState(
  //   {
  //     "title": "Alpha male training",
  //     "description": "What is your Buggati color",
  //     "roadmap_deadline": "2023-04-03T02:45:24.100000",
  //     "is_before_start_time": true,
  //     "reminder_time": 0,
  //     "is_private": false,
  //     "rid": 17,
  //     "views_count": 0,
  //     "stars_count": 0,
  //     "forks_count": 0,
  //     "edited_at": "2023-04-03T03:06:47",
  //     "owner_id": 19,
  //     "creator_id": 19,
  //     "owner_name": null,
  //     "creator_name": null,
  //     "owner_profile_picture_id": null,
  //     "creator_profile_picture_id": null,
  //     "next_task": {
  //       "title": "Convert to Islam",
  //       "description": "Allah",
  //       "start_time": "2023-04-03T03:01:42.600000",
  //       "deadline": "2023-04-03T03:01:42.600000",
  //       "shape": "triangle",
  //       "color": "blue",
  //       "tid": 52,
  //       "is_done": false,
  //       "subtasks": []
  //     },
  //     "tasks_name": [
  //       "Convert to Islam"
  //     ],
  //     "shapes": [
  //       "triangle"
  //     ],
  //     "colors": [
  //       "blue"
  //     ],
  //     "tags": [],
  //     "task_relation": [
  //       52
  //     ],
  //     "archive_date": null,
  //     "exp": 0
  //   }
  // );

  const [roadmap, setRoadmap] = useState({
    'name': 'Lorem Ipsum Roadmap',
    'description': 'Morbi facilisis finibus lacus quis aliquam. Vestibulum turpis nibh, imperdiet non gravida quis, pretium vitae est. Phasellus in sollicitudin quam, id lacinia nisl.',
    'publicity': true,
    'owner-id': 123456,
    'is-active': true,
    'like': 99,
    'tasks': [
      {
        'id': '1',
        'name': 'First Task',
        'description': 'Task descriptions. This is the task for the first milestone.',
        'startDate': '20200110',
        'dueDate': '20200115',
        'nodeColor': '#7DC5E3',
        'nodeShape': 'circle',
        'subtasks': [
          {
            'id': '1',
            'detail': 'Morbi Uno finibus lacus quis aliquam.',
            'status': true,
          },
          {
            'id': '2',
            'detail': 'Vestibulum turpis nibh.',
            'status': true,
          }
        ]
      },
      {
        'id': '2',
        'name': 'Second Task',
        'description': 'Task descriptions. This is the task for the second milestone.',
        'startDate': '20200115',
        'dueDate': '20200120',
        'nodeColor': '#E4688D',
        'nodeShape': 'square',
        'subtasks': [
          {
            'id': '1',
            'detail': 'Morbi facilisis finibus lacus quis aliquam.',
            'status': true,
          },
          {
            'id': '2',
            'detail': 'Vestibulum turpis nibh.',
            'status': false,
          }
        ]
      },
      {
        'id': '3',
        'name': 'Third Task',
        'description': 'Task descriptions. This is the task for the third milestone.',
        'startDate': '20200120',
        'dueDate': '20200121',
        'nodeColor': '#F3B21A',
        'nodeShape': 'triangle',
        'subtasks': [
          {
            'id': '1',
            'detail': 'Morbi Trio finibus lacus quis aliquam.',
            'status': false,
          },
          {
            'id': '2',
            'detail': 'Vestibulum turpis nibh.',
            'status': false,
          }
        ]
      }
    ]
  });

  function likeRoadmap() {
    let res = { ...roadmap };
    if (liked) {
      res.like -= 1;
      setLiked(false);
    } else {
      res.like += 1;
      setLiked(true);
    }
    setRoadmap(res);
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
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill={currentNodeColor} />
          </svg>
        );
      case "circle":
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill={currentNodeColor} />
          </svg>
        );
      case "triangle":
        return (
          <svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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

  useEffect(() => {
    if (user_id === roadmap['owner-id']) {
      setIsOwner(true);
      for (var i = 0; i < roadmap.tasks.length; i++) {
        for (var j = 0; j < roadmap.tasks[i].subtasks.length; j++) {
          if (roadmap.tasks[i].subtasks[j].status === false) {
            console.log("current task " + roadmap.tasks[i].id);
            setCurrent(roadmap.tasks[i].id);
            setCurrentSubtasks({ 'subtasks': [...roadmap.tasks[i].subtasks] });
            return;
          }
        }
      }
      setCurrent('-1');
      if (roadmap['is-active'] === true) {
        setCompleteButton(true);
      }
    }
  }, [roadmap]);

  // now gotta modify this code to update per node (task/milestone) to save resources. 

  function saveRoadmap() {
    setSaveToggle(!saveToggle);
    let res = { ...roadmap };
    console.log(res);
    res.tasks[current - 1].subtasks = [...currentSubtasks['subtasks']];
    setRoadmap(res);
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
                <button onClick={() => navigate("/create", { 'state': { 'roadmap': roadmap } })} className="bg-nav-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
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
            {isOwner === false && (
              <div className="flex space-x-1">
                <button onClick={() => navigate("/create", { 'state': { 'roadmap': roadmap } })} className="bg-nav-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
                  Clone
                </button>
                <button onClick={() => likeRoadmap()} className={`${(liked) ? 'bg-sub-blue' : 'bg-gray-300'} grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold`} type="button">
                  Like
                </button>
                <button onClick={() => setDetailToggle(!detailToggle)} className="bg-gray-300 grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
                  i
                </button>
              </div>
            )}
          </div>
          <div className={`${(detailToggle) ? 'visible' : 'hidden'}`}>
            <div className='flex flex-col rounded-2xl text-sm space-y-2'>
              <div className='font-bold'>
                Publicity: {roadmap.publicity ? "Public" : "Private"}
              </div>
              <div>
                {roadmap.description}
              </div>
            </div>
          </div>
          <div className='flex flex-col bg-gray-100 rounded-2xl p-4 overflow-x-auto'>
            <div className='flex justify-end mx-2'>
              <button className='flex text-lg'>
                <Bell />
              </button>
            </div>
            {isOwner === true && (
              <div className='flex mx-8 mb-12 space-x-[25px]'>
                {roadmap.tasks.map((task, index) => {
                  const zIndex = 10 - index;
                  return (
                    <div key={task.id} className="relative" style={{ zIndex }}>
                      <div className="absolute top-1/2 -left-1/4 transform -translate-x-1/2 -translate-y-3/4 -z-10">
                        {(task.id !== '1') && <hr className="w-[75px] h-1 bg-black border-0" />}
                      </div>
                      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30px] text-xs text-center font-bold'>
                        {task.name}
                      </div>
                      <button onClick={() => {
                        setcurrentViewNode(task.id);
                        setNodeViewToggle(!nodeViewToggle);
                      }}>
                        {(task.id < current || task.id === '-1') && (
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
            {isOwner === false && (
              <div className='flex mx-8 mb-12 space-x-[25px]'>
                {roadmap.tasks.map((task, index) => {
                  const zIndex = 10 - index;
                  return (
                    <div key={task.id} className="relative" style={{ zIndex }}>
                      <div className="absolute top-1/2 -left-1/4 transform -translate-x-1/2 -translate-y-3/4 -z-10">
                        {(task.id !== '1') && <hr className="w-[75px] h-1 bg-black border-0" />}
                      </div>
                      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30px] text-xs text-center font-bold'>
                        {task.name}
                      </div>
                      <button onClick={() => setcurrentViewNode(task.id)}>
                        {nodeShapeGenerator(task.nodeShape, task.nodeColor)}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <div className='flex justify-between'>
              <div className='flex text-sm'>
                0 Views
              </div>
              <div className='flex text-sm'>
                Latest update: 000000
              </div>
            </div>
          </div>
          {isOwner === true && current > '0' && (
            <div className='flex flex-col bg-gray-100 rounded-2xl shadow-sm space-y-4'>
              <div className='flex flex-row space-x-4 justify-between'>
                <div className='flex flex-col space-y-2 w-1/2 p-4'>
                  <div className='font-bold'>
                    {roadmap.tasks[current - 1].name}
                  </div>
                  <div className='text-sm'>
                    {roadmap.tasks[current - 1].description}
                  </div>
                  <div className='flex space-x-2'>
                    <div className='grow font-bold text-center p-2'>
                      Start: {roadmap.tasks[current - 1].startDate}
                    </div>
                    <div className='grow font-bold text-center p-2'>
                      Due: {roadmap.tasks[current - 1].dueDate}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col space-y-2 w-1/2 p-4 bg-gray-50 rounded-r justify-between'>
                  <div className='flex flex-col justify-center space-y-2 text-sm'>
                    {currentSubtasks.subtasks.map(subtask => {
                      return (
                        <label key={subtask.id}>
                          <input
                            type="checkbox"
                            className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded"
                            checked={subtask.status}
                            onChange={() => {
                              let res = { ...currentSubtasks };
                              res.subtasks[subtask.id - 1].status = !subtask.status;
                              setCurrentSubtasks(res);
                              console.log(currentSubtasks['subtasks']);
                            }}
                          />
                          {subtask.detail}
                        </label>
                      )
                    })}
                  </div>
                  {roadmap.tasks[current - 1].id === current && (
                    <div className='flex justify-end space-x-2'>
                      <button onClick={() => setSaveToggle(!saveToggle)} className="bg-gray-400 w-1/2 text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {isOwner === false && (
            <div className='flex flex-col bg-gray-100 rounded-2xl shadow-sm space-y-4'>
              {currentViewNode < '0' && (
                <div className='flex flex-row space-x-4 justify-between m-8'>
                  Click on each milestones to view its details
                </div>
              )}
              {currentViewNode > '0' && (
                <div className='flex flex-row space-x-4 justify-between'>
                  <div className='flex flex-col space-y-2 w-1/2 p-4'>
                    <div className='font-bold'>
                      {roadmap.tasks[currentViewNode - 1].name}
                    </div>
                    <div className='text-sm'>
                      {roadmap.tasks[currentViewNode - 1].description}
                    </div>
                    <div className='flex space-x-2'>
                      <div className='grow font-bold text-center p-2'>
                        Start: {roadmap.tasks[currentViewNode - 1].startDate}
                      </div>
                      <div className='grow font-bold text-center p-2'>
                        Due: {roadmap.tasks[currentViewNode - 1].dueDate}
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col space-y-2 w-1/2 p-4 bg-gray-50 rounded-r'>
                    <div className='flex flex-col justify-center space-y-2 text-sm'>
                      {roadmap.tasks[currentViewNode - 1].subtasks.map(subtask => {
                        return (
                          <label key={subtask.id}>
                            {subtask.detail}
                          </label>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {completeButton && (
            <div className='flex flex-col justify-center bg-gray-100 rounded-2xl shadow-sm space-y-4 p-4'>
              <div className='flex justify-center font-bold'>
                Congratulations! You have complete all the milestones in your roadmap. Click on the "complete" button to archive your roadmap.
              </div>
              <div className='flex justify-center'>
                  <button onClick={() => completeRoadmap()} className="bg-sub-blue w-1/4 text-white px-4 py-2 rounded-full text-sm font-bold" type="button">
                    Complete
                  </button>
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
              <div className="flex flex-col rounded-2xl p-4 bg-white space-y-4 shadow-lg">
                <div className='flex flex-row'>
                  <div className='flex flex-col space-y-2 w-1/2 p-4'>
                    <div className='font-bold'>
                      {roadmap.tasks[currentViewNode - 1].name}
                    </div>
                    <div className='text-sm'>
                      {roadmap.tasks[currentViewNode - 1].description}
                    </div>
                    <div className='flex space-x-2'>
                      <div className='grow font-bold text-center p-2'>
                        Start: {roadmap.tasks[currentViewNode - 1].startDate}
                      </div>
                      <div className='grow font-bold text-center p-2'>
                        Due: {roadmap.tasks[currentViewNode - 1].dueDate}
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col w-1/2 p-4 justify-center space-y-2 text-sm'>
                    {roadmap.tasks[currentViewNode - 1].subtasks.map(subtask => {
                      return (
                        <label key={subtask.id}>
                          {subtask.detail}
                        </label>
                      )
                    })}
                  </div>
                </div>
                <div className='flex space-x-2'>
                  <button onClick={() => setNodeViewToggle(!nodeViewToggle)} className="bg-gray-400 w-full text-white px-4 py-2 rounded-full text-sm font-bold" type="button">
                    Close
                  </button>
                </div>
              </div>
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