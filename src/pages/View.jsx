import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from "../functions/axiosInstance";
import { getRoadmap } from '../functions/roadmapFunction';
import { shortenString, convertDateTimeString } from '../functions/formatFunction';
import { likeRoadmap, unlikeRoadmap } from '../functions/viewFunction';
import RoadmapViewer from '../components/RoadmapViewer';
import Spinner from '../components/Spinner';

export default function View() {
  const navigate = useNavigate();
  const { roadmap_id } = useParams();

  const [hasFetched, setHasFetched] = useState(false);

  const [isOwner, setIsOwner] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [detailToggle, setDetailToggle] = useState(true);
  const [saveToggle, setSaveToggle] = useState(false);
  const [nodeViewToggle, setNodeViewToggle] = useState(false);
  const [completeButton, setCompleteButton] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [currentTask, setCurrentTask] = useState(
  );

  const [roadmap, setRoadmap] = useState(
  );

  async function fetchRoadmap(roadmap_id) {
    getRoadmap(roadmap_id)
      .then((response) => {
        setRoadmap(response);
        if (response.next_task === null) {
          setIsCompleted(true);
          setCurrentTask(
            { 'id': -1 }
          );
        } else {
          const currentNodeID = response.next_task.tid;
          response.tasks.forEach((task) => {
            if (task.id === currentNodeID) {
              setCurrentTask(task);
              console.log(task);
              let isReadyToComplete = true;
              task.subtasks.forEach((subtask) => {
                if (!subtask.status) {
                  isReadyToComplete = false;
                }
              });
              setCompleteButton(isReadyToComplete);
            }
          });
        }

        setLikeCount(response.stars_count);
        checkUserAccess(response.owner_id);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function checkUserAccess(owner_id) {
    const route = `/user/`;
    axiosInstance.get(route)
      .then((response) => {
        const user_id = response.data.uid;
        if (user_id === owner_id) {
          setIsOwner(true);
          setHasFetched(true);
        } else {
          setIsOwner(false);
          fetchLike(roadmap_id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function fetchLike(roadmap_id) {
    const route = `/roadmap/like/?rid=${roadmap_id}`;
    axiosInstance.get(route)
      .then((response) => {
        setIsLiked(Boolean(response.data.liked.toLowerCase() === 'true'));
        setHasFetched(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function likeSubmit(rid) {
    console.log(isLiked);
    if (isLiked) {
      unlikeRoadmap(rid);
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      likeRoadmap(rid);
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
  }

  useEffect(() => {
    fetchRoadmap(roadmap_id);
  }, []);

  // now gotta modify this code to update per node (task/milestone) to save resources. 

  function completeTask() {
    const route = `/task/complete/?tid=${currentTask.id}&added_exp=${50}`;
    axiosInstance.put(route)
      .then((response) => {
        console.log(response);
        fetchRoadmap(roadmap_id);
      })
      .catch((error) => {
        console.error(error);
      });
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
          fetchRoadmap(roadmap_id);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  if (hasFetched) {
    return (
      <>
        <div className='flex h-full bg-white overflow-y-scroll py-8'>
          <div className="w-5/6 flex-col m-auto space-y-6">
            <div className='flex justify-between items-center'>
              <div className='text-3xl font-extrabold'>
                {roadmap.name}
              </div>
              <div className="flex space-x-1">
                {isOwner === true && (
                  <>
                    <div className="bg-gray-700 grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold  pointer-events-none">
                      {likeCount} Like
                    </div>
                    <button onClick={() => navigate(`/edit/${roadmap_id}`)} className={`${(isCompleted) ? 'bg-gray-700 pointer-events-none' : 'bg-sub-blue'} grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold`} type="button">
                      Edit
                    </button>
                  </>
                )}
                {isOwner === false && (
                  <>
                    <button onClick={() => likeSubmit(roadmap_id)} className="bg-sub-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
                      {likeCount} Like
                    </button>
                    <button onClick={() => navigate(`/clone/${roadmap_id}`)} className="bg-main-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
                      Clone
                    </button>
                  </>
                )}
                <button onClick={() => setDetailToggle(!detailToggle)} className="bg-gray-500 grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
                  i
                </button>
              </div>
            </div>
            <div className={`${(detailToggle) ? 'visible' : 'hidden'}`}>
              <div className='flex flex-col rounded-2xl text-sm space-y-2'>
                <div className='flex space-x-2'>
                  <div className={`${(roadmap.is_private) ? 'border-red-400' : 'border-green-400'} border-solid border-[1px] rounded-full px-2 py-1 text-xs`}>
                    {!roadmap.is_private ? "Public" : "Private"}
                  </div>
                  <div className='border-solid border-[1px] rounded-full px-2 py-1 text-xs border-gray-300'>
                    {roadmap.views_count} Views
                  </div>
                  <div className='border-solid border-[1px] rounded-full px-2 py-1 text-xs border-gray-300'>
                    Latest update: {convertDateTimeString(roadmap.edited_at)}
                  </div>
                </div>
                <div>
                  {roadmap.description}
                </div>
              </div>
            </div>
            <div className='flex flex-col bg-gray-100 drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)] rounded-2xl p-8'>
              <RoadmapViewer tasks={roadmap.tasks} currentTaskID={currentTask.id} />
            </div>
            {(!isCompleted) && (
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
                    <div className='flex flex-col justify-center space-y-2 text-sm break-all'>
                      {currentTask.subtasks.map((subtask, index) => {
                        return (
                          <label key={index}>
                            {(isOwner) && (
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
                            )}
                            {(!isOwner) && (
                              <input
                                type="checkbox"
                                disabled="true"
                                className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 accent-slate-500 rounded pointer-events-none"
                                defaultChecked={subtask.status}
                              />
                            )}
                            {subtask.detail}
                          </label>
                        )
                      })}
                    </div>
                    {(isOwner) && (
                      <div className='flex flex-col md:flex-row md:justify-end gap-2'>
                        <button onClick={() => updateSubtasks()} className="bg-main-blue md:w-[30%] text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
                          Save
                        </button>
                        {(completeButton) && (
                          <button onClick={() => completeTask()} className="bg-sub-blue md:w-[30%] text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
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
  } else {
    return (
      <>
        <Spinner />
      </>
    )
  }


}