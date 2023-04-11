import React, { useState, useEffect } from 'react'
import { isRouteErrorResponse, useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from "../functions/axiosInstance";
import { getRoadmap } from '../functions/roadmapFunction';
import { shortenString, convertDateTimeString } from '../functions/formatFunction';
import { likeRoadmap, unlikeRoadmap } from '../functions/viewFunction';
import RoadmapViewer from '../components/RoadmapViewer';
import Spinner from '../components/Spinner';
import Prompt from '../components/Prompt';

export default function View() {
  const navigate = useNavigate();
  const { roadmap_id } = useParams();

  const [hasFetched, setHasFetched] = useState(false);

  const [isWarning, setIsWarning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const [isOwner, setIsOwner] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [detailToggle, setDetailToggle] = useState(true);
  const [saveButton, setSaveButton] = useState(true);
  const [completeButton, setCompleteButton] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [currentTask, setCurrentTask] = useState(
  );

  const [roadmap, setRoadmap] = useState(
    {
      hasFetched: false
    }
  );

  async function fetchRoadmap() {
    getRoadmap(roadmap_id)
      .then((response) => {
        setRoadmap(response);
        const fetchedRoadmap = response;
        if (fetchedRoadmap.next_task === null) {
          setIsCompleted(true);
          setCurrentTask(
            { 'id': -1 }
          );
        } else {
          const currentNodeID = fetchedRoadmap.next_task.tid;
          fetchedRoadmap.tasks.forEach((task) => {
            if (task.id === currentNodeID) {
              setCurrentTask(task);
              if (task.subtasks.length === 0) {
                setSaveButton(false);
              }
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
        let route = `/user/`;
        axiosInstance.get(route)
          .then((response) => {
            const user_id = response.data.uid;
            if (user_id === fetchedRoadmap.owner_id) {
              setIsOwner(true);
            } else {
              setIsOwner(false);
            }
            route = `/roadmap/like/?rid=${roadmap_id}`;
            axiosInstance.get(route)
              .then((response) => {
                setIsLiked(Boolean(response.data.liked.toLowerCase() === 'true'));
                setHasFetched(true);
                setIsLoading(false);
                const temp = { ...fetchedRoadmap };
                temp.hasFetched = true;
                setRoadmap(temp);
              })
              .catch((error) => {
                console.log(error);
                setIsWarning(true);
              });
          })
          .catch((error) => {
            console.error(error);
            setIsWarning(true);
          });
      })
      .catch((error) => {
        console.error(error);
        setIsWarning(true);
      });
  }

  async function handleLike() {
    console.log(isLiked);
    if (isLiked) {
      unlikeRoadmap(roadmap_id);
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      likeRoadmap(roadmap_id);
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
  }

  useEffect(() => {
    fetchRoadmap();
  }, []);

  // now gotta modify this code to update per node (task/milestone) to save resources. 

  function completeTask() {
    setIsLoading(true);
    setIsCompleting(false);
    const route = `/task/complete/?tid=${currentTask.id}&added_exp=${50}`;
    axiosInstance.put(route)
      .then((response) => {
        console.log(response);
        fetchRoadmap();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function updateSubtasks() {
    setIsSaving(false);
    setIsLoading(true);
    const route = `/subtask/`;
    currentTask.subtasks.forEach((subtask) => {
      console.log(subtask);
      axiosInstance.put(route, {
        "title": subtask.detail,
        "stid": subtask.id,
        "is_done": subtask.status
      })
        .then((response) => {
          console.log(response.data);
          fetchRoadmap();
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    });
  }

  if (hasFetched) {
    return (
      <>
        <div className='flex h-full bg-white overflow-y-scroll py-8'>
          <div className="w-5/6 flex-col m-auto space-y-6">
            <div>
              <div className='flex justify-between items-center'>
                <div className='text-3xl font-extrabold truncate self-center py-4'>
                  {roadmap.name} {isCompleted ? '✓' : ''}
                </div>
                <div className="flex self-center space-x-1 h-10">
                  {isOwner === true && (
                    <>
                      <div className="bg-gray-700 grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold truncate self-center pointer-events-none">
                        {likeCount} Like
                      </div>
                      <button onClick={() => navigate(`/edit/${roadmap_id}`)} className={`${(isCompleted) ? 'bg-gray-700 pointer-events-none' : 'bg-sub-blue'} grow text-white self-center px-4 py-2 font-semilight rounded-full text-sm font-bold`} type="button">
                        Edit
                      </button>
                    </>
                  )}
                  {isOwner === false && (
                    <>
                      <button onClick={() => handleLike()} className="bg-sub-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold truncate self-center" type="button">
                        {likeCount} Like
                      </button>
                      <button onClick={() => navigate(`/clone/${roadmap_id}`)} className="bg-main-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm self-center font-bold" type="button">
                        Clone
                      </button>
                    </>
                  )}
                  <button onClick={() => setDetailToggle(!detailToggle)} className="bg-gray-500 grow text-white px-4 py-2 font-semilight rounded-full self-center text-sm font-bold" type="button">
                    i
                  </button>
                </div>
              </div>
              <div className={`${(detailToggle) ? 'visible' : 'hidden'}`}>
                <div className='flex flex-col rounded-2xl text-sm space-y-2'>
                  <div className='flex space-x-2 h-6'>
                    <div className={`${(roadmap.is_private) ? 'border-red-400' : 'border-green-400'} border-solid border-[1px] rounded-full px-2 py-1 text-xs self-center shrink-0`}>
                      {!roadmap.is_private ? "Public" : "Private"}
                    </div>
                    <div className='border-solid border-[1px] rounded-full px-2 py-1 text-xs border-gray-300 self-center shrink-0'>
                      {roadmap.views_count} Views
                    </div>
                    <div className='border-solid border-[1px] rounded-full px-2 py-1 text-xs border-gray-300 self-center truncate'>
                      {convertDateTimeString(roadmap.edited_at)}
                    </div>
                  </div>
                  <div>
                    {roadmap.description}
                  </div>
                </div>
              </div>
            </div>

            <RoadmapViewer tasks={roadmap.tasks} currentTaskID={currentTask.id} className="z-50" />

            {(!isCompleted) && (
              <div className='flex flex-col bg-white rounded-2xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)] space-y-4'>
                <div className='flex flex-row space-x-4 justify-between'>
                  <div className='flex flex-col space-y-4 w-1/2 p-4'>
                    <div className='text-md font-bold'>
                      {currentTask.name}
                    </div>
                    <div className='text-sm'>
                      {currentTask.description}
                    </div>
                    <div className='flex flex-col md:flex-row gap-2'>
                      <div className='grow font-bold text-center text-xs'>
                        Start: {convertDateTimeString(currentTask.startDate)}
                      </div>
                      <div className='grow font-bold text-center text-xs'>
                        Due: {convertDateTimeString(currentTask.dueDate)}
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col space-y-2 w-1/2 p-4 bg-[#f5f8fd] rounded-r-2xl justify-between'>
                    <div className='flex flex-col justify-center space-y-2 text-sm break-all'>
                      {currentTask.subtasks.map((subtask, index) => {
                        return (
                          <label key={index}>
                            {(isOwner) && (
                              <input
                                type="checkbox"
                                className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded"
                                checked={subtask.status}
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
                                disabled={true}
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
                      <div className='flex flex-row justify-end gap-2'>
                        {(saveButton) && (
                          <button
                            onClick={() => {
                              setIsSaving(true);
                            }}
                            className="bg-main-blue sm:w-[40%] w-full text-white px-4 py-2 font-semilight rounded-full text-sm font-bold self-center h-10 truncate"
                            type="button">
                            Save
                          </button>
                        )}
                        {(completeButton) && (
                          <button onClick={() => setIsCompleting(true)} className="bg-sub-blue sm:w-[40%] w-full text-white px-4 py-2 font-semilight rounded-full text-sm font-bold self-center h-10 truncate" type="button">
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
        </div >
        <button onClick={() => setIsOwner(!isOwner)} className="bg-nav-blue text-white px-4 py-2 font-semilight text-sm font-bold" type="button">
          CHANGE VIEW MODE (FOR DEVELOPMENT)
        </button>
        {(isLoading) && (
          <div className='text-3xl font-bold text-red-500'>
            LOADING...
          </div>
        )}
        {(isSaving) && (
          <Prompt message={"confirm save?"} confirmFunction={updateSubtasks} cancelFunction={() => setIsSaving(false)} />
        )}
        {(isCompleting) && (
          <Prompt message={"confirm complete?"} confirmFunction={completeTask} cancelFunction={() => setIsCompleting(false)} />
        )}
      </>
    )
  } else {
    return (
      <>
        {(!isWarning) && (
          <Spinner />
        )}
        {(isWarning) && (
          <Prompt message={"An error has occured. Refetch roadmap?"} confirmFunction={fetchRoadmap} cancelFunction={() => setIsWarning(false)} />
        )}
      </>
    )
  }
}