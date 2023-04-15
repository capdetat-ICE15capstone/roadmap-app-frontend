import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { axiosInstance } from "../functions/axiosInstance";
import { getRoadmap } from '../functions/roadmapFunction';
import { likeRoadmap, unlikeRoadmap } from '../functions/viewFunction';
import RoadmapViewer from '../components/RoadmapViewer';
import Spinner from '../components/Spinner';
import Prompt from '../components/Prompt';
import RoadmapDetail from '../components/RoadmapDetail';
import RoadmapTaskDetail from '../components/RoadmapTaskDetail';
import PopUpTaskViewer from '../components/PopUpTaskViewer';

import { ReactComponent as BookIcon } from "../assets/shapes/book_icon.svg"
import { ReactComponent as UserLogo } from "../assets/shapes/username_icon.svg"

export default function View() {
  const { roadmap_id } = useParams();
  const navigate = useNavigate();

  const [exp, setExp] = useState();

  const [isWarning, setIsWarning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isViewingTask, setIsViewingTask] = useState(false);

  const [isOwner, setIsOwner] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [saveButton, setSaveButton] = useState(true);
  const [completeButton, setCompleteButton] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [currentTask, setCurrentTask] = useState();
  const [currentViewTask, setCurrentViewTask] = useState();
  const [roadmap, setRoadmap] = useState({ 'hasFetched': false });
  const [ownerProfile, setOwnerProfile] = useState();

  function fetchRoadmap() {
    getRoadmap(roadmap_id)
      .then((response) => {
        const fetchedRoadmap = response;
        if (fetchedRoadmap === null) {
          console.error("Roadmap fetching failed.");
          setIsLoading(false);
          setIsWarning(true);
          return;
        }
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
              } else {
                setSaveButton(true);
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
        setLikeCount(fetchedRoadmap.stars_count);
        let route = `/user/`;
        axiosInstance.get(route)
          .then((response) => {
            const user_id = response.data.uid;
            if (user_id === fetchedRoadmap.owner_id) {
              setIsOwner(true);
            } else {
              setIsOwner(false);
            }
            route = "/feed/user?uids=" + fetchedRoadmap.owner_id;
            axiosInstance.get(route)
              .then((response) => {
                setOwnerProfile(response.data[0]);
                const currentLevel = Math.floor(0.01 * response.data[0].exp);
                const currentExp = response.data[0].exp;
                const gaugePercent = currentExp - (currentLevel * 100);
                setExp(gaugePercent);
                console.log(gaugePercent);

                route = `/roadmap/like/?rid=${roadmap_id}`;
                axiosInstance.get(route)
                  .then((response) => {
                    setIsLiked(Boolean(response.data.liked.toLowerCase() === 'true'));
                    setIsLoading(false);
                    const temp = { ...fetchedRoadmap };
                    temp.hasFetched = true;
                    setRoadmap(temp);
                  })
                  .catch((error) => {
                    console.error(error);
                    setIsWarning(true);
                  });
              })
              .catch((error) => {
                console.error(error);
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

  function handleLike() {
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

  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    fetchRoadmap();
  }, []);

  function completeTask() {
    setIsLoading(true);
    setIsCompleting(false);

    let experiencePoints = 0;

    const dueDate = new Date(currentTask.dueDate);
    const currentDate = new Date();

    const differenceMs = (dueDate - currentDate);
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    console.log(differenceDays);

    switch (true) {
      case (differenceDays <= 0): // done before dueDate, gets 3 stars (30xp)
        experiencePoints = 30;
        break;
      case (differenceDays > 0 && differenceDays <= 3): // done within 1-3 days after dueDate, gets 2 stars (20xp)
        experiencePoints = 20;
        break;
      case (differenceDays > 3): // done more than 3 days after dueDate, gets 1 star (10xp)
        experiencePoints = 10;
        break;
      default:
        console.log("default!");
        break;
    }

    const route = `/task/complete?tid=${currentTask.id}&added_exp=${experiencePoints}`;
    axiosInstance.put(route)
      .then((response) => {
        console.log(response);
        fetchRoadmap();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function updateSubtasks() {
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

  if (roadmap.hasFetched) {
    return (
      <>
        <div className='flex h-full overflow-y-auto py-6'>
          <div className="xs:w-[80%] max-xs:w-[90%] max-w-4xl flex-col space-y-6 m-auto">
            <div className='flex justify-between items-center space-x-6'>
              <div className='flex items-center space-x-2'>
                <BookIcon />
                <span className='max-sm:hidden text-4xl font-extrabold text-nav-blue'>VIEW</span>
              </div>
              <div className='flex w-full justify-center items-center bg-base-blue drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)] rounded-3xl p-2 space-x-2  max-w-sm'>
                <UserLogo className='w-8 h-8' />
                <div className='flex flex-col'>
                  <span className='text-xs font-bold text-white'>{ownerProfile.username}</span>
                  <span className='text-xs font-bold text-white'>LVL. {Math.floor(0.01 * ownerProfile.exp)}</span>
                </div>
                <div className={`flex flex-auto relative bg-gray-500 rounded-2xl h-8`}>
                  <div className={`${isOwner ? 'bg-[#F43054]' : 'bg-gray-700'} h-full rounded-2xl transition-all duration-500 ease-in-out`} style={{ width: `${exp}%` }}>
                    <span className="text-white w-full text-lg font-bold text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{exp} / 100</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col rounded-3xl bg-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)] p-4 space-y-6'>
              <RoadmapDetail
                roadmapName={roadmap.name}
                roadmapID={roadmap.rid}
                roadmapPrivacy={roadmap.is_private}
                roadmapViewCount={roadmap.views_count}
                roadmapForkCount={roadmap.forks_count}
                roadmapEditDate={roadmap.edited_at}
                roadmapDescription={roadmap.description}
                isOwner={isOwner}
                likeCount={likeCount}
                isLiked={isLiked}
                isCompleted={isCompleted}
                handleLike={handleLike}
              />
              <RoadmapViewer tasks={roadmap.tasks} currentTaskID={currentTask.id} handleTaskView={(task) => { setCurrentViewTask(task); setIsViewingTask(true) }} />
              {(!isCompleted) && (
                <RoadmapTaskDetail task={currentTask} handleTaskUpdate={(task) => setCurrentTask(task)} handleIsSaving={() => setIsSaving(true)} handleIsCompleting={() => setIsCompleting(true)} isOwner={isOwner} displaySaveButton={saveButton} displayCompleteButton={completeButton} />
              )}
            </div>
          </div>
        </div >
        {(isLoading) && (
          <Spinner />
        )}
        {(isSaving) && (
          <Prompt title="Confirm saving" message={"Are you sure you want to save?"} positiveText="Yes" negativeText="No" positiveFunction={updateSubtasks} negativeFunction={() => setIsSaving(false)} />
        )}
        {(isCompleting) && (
          <Prompt title="Confirm completing" message={"Are you sure you want to complete this task? (You won't be able to come back to this task again after completion."} positiveText="Yes" negativeText="No" positiveFunction={completeTask} negativeFunction={() => setIsCompleting(false)} />
        )}
        {(isViewingTask) && (
          <PopUpTaskViewer task={currentViewTask} handleCloseWindow={() => setIsViewingTask(false)}/>
        )}
      </>
    )
  } else if (isWarning) {
    return <Prompt title="Error" message={"Roadmap fetching failed"} positiveText="return" positiveFunction={() => { fetchRoadmap(); setIsWarning(false); navigate(-1); }} />
  } else {
    return (
      <>
        <Spinner />
      </>
    )
  }
}