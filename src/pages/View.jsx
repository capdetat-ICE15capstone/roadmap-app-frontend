import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { axiosInstance } from "../functions/axiosInstance";
import { getRoadmap } from '../functions/roadmapFunction';
import { likeRoadmap, unlikeRoadmap, calculateGuagePercentage } from '../functions/viewFunction';
import RoadmapViewer from '../components/RoadmapViewer';
import SpinnerNeo from '../components/SpinnerNeo';
import Prompt from '../components/Prompt';
import RoadmapDetail from '../components/RoadmapDetail';
import RoadmapTaskDetail from '../components/RoadmapTaskDetail';
import PopUpTaskViewer from '../components/PopUpTaskViewer';
import { getProfilePictureSrc } from '../components/SettingProfileImageSelector';

import { ReactComponent as RoadmapIcon } from "../assets/shapes/roadmap.svg"
import { AnimatePresence, motion } from 'framer-motion';

export default function View() {
  const { roadmap_id } = useParams();
  const navigate = useNavigate();

  const [exp, setExp] = useState();

  const [isWarning, setIsWarning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isViewingTask, setIsViewingTask] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isOwner, setIsOwner] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [saveButton, setSaveButton] = useState(true);
  const [completeButton, setCompleteButton] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [currentTask, setCurrentTask] = useState();
  const [currentViewTask, setCurrentViewTask] = useState();
  const [roadmap, setRoadmap] = useState({ 'hasFetched': false });
  const [ownerProfile, setOwnerProfile] = useState();

  async function fetchRoadmap(rid) {
    try {
      const fetchedRoadmap = await getRoadmap(rid);
      if (fetchedRoadmap.tasks.length === 0) {
        setIsEmpty(true);
        setIsCompleted(true);
        setCurrentTask(
          { 'id': -1 }
        );
      } else if (fetchedRoadmap.archive_date !== null) {
        setIsArchived(true);
        setCurrentTask(
          { 'id': -1 }
        );
      } else if (fetchedRoadmap.next_task === null) {
        setIsCompleted(true);
        setCurrentTask(
          { 'id': -1 }
        );
      } else if (fetchedRoadmap.tasks.length === 0) {
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

      const userResponse = await axiosInstance.get(`/user/`);
      if (userResponse.data.uid === fetchedRoadmap.owner_id) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
      const userProfileResponse = await axiosInstance.get(`/feed/user?uids=${fetchedRoadmap.owner_id}`);
      setOwnerProfile(userProfileResponse.data[0]);
      setExp(calculateGuagePercentage(userProfileResponse.data[0].exp));

      const userLikeResponse = await axiosInstance.get(`/roadmap/like/?rid=${roadmap_id}`);
      setIsLiked(Boolean(userLikeResponse.data.liked.toLowerCase() === 'true'));
      setIsLoading(false);

      const temp = { ...fetchedRoadmap };
      temp.hasFetched = true;
      setRoadmap(temp);

    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
      setIsWarning(true);
      setIsLoading(false);
    }
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
    } else {
      return;
    }
    fetchRoadmap(roadmap_id);
  }, []);

  async function completeTask() {
    setIsLoading(true);
    setIsCompleting(false);
    try {
      const response = await axiosInstance.put(`/task/complete?tid=${currentTask.id}`);
      console.log(response);
      fetchRoadmap(roadmap_id);
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
      setIsWarning(true);
      setIsLoading(false);
    }
  }

  function updateSubtasks() {
    setIsSaving(false);
    setIsLoading(true);
    currentTask.subtasks.forEach((subtask) => {
      updateEachSubtask(subtask);
    });
    fetchRoadmap(roadmap_id);
    setIsLoading(false);
  }

  async function updateEachSubtask(subtask) {
    try {
      const response = await axiosInstance.put(`/subtask/`, {
        "title": subtask.detail,
        "stid": subtask.id,
        "is_done": subtask.status
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
      setIsWarning(true);
    }
  }

  return (
    <>
      <AnimatePresence>
        {roadmap.hasFetched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex h-full overflow-y-auto py-6'
          >
            <div className="xs:w-[80%] max-xs:w-[90%] max-w-4xl flex-col space-y-6 m-auto">
              <div className='flex justify-between items-center space-x-6'>
                <div className='flex items-center space-x-2'>
                  <RoadmapIcon className='h-10 w-10' />
                  <span className='max-sm:hidden text-4xl font-extrabold text-nav-blue'>VIEW</span>
                </div>
                <div className='flex w-full justify-center items-center bg-base-blue drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)] rounded-3xl p-2 space-x-2  max-w-sm'>
                  <img className='w-8 h-8 rounded-full' src={getProfilePictureSrc(ownerProfile.profile_picture_id)} />
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
              <div className='flex flex-col rounded-3xl bg-white border border-gray-300 drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)] p-4 space-y-6'>
                <RoadmapDetail
                  roadmap={roadmap}
                  isOwner={isOwner}
                  likeCount={likeCount}
                  isLiked={isLiked}
                  isCompleted={isCompleted}
                  isArchived={isArchived}
                  handleLike={handleLike}
                />
                <RoadmapViewer isArchived={isArchived} roadmap={roadmap} currentTaskID={currentTask.id} handleTaskView={(task) => { setCurrentViewTask(task); setIsViewingTask(true) }} />
                <RoadmapTaskDetail isEmpty={isEmpty} isCompleted={isCompleted} isArchived={isArchived} task={currentTask} handleTaskUpdate={(task) => setCurrentTask(task)} handleIsSaving={() => setIsSaving(true)} handleIsCompleting={() => setIsCompleting(true)} isOwner={isOwner} displaySaveButton={saveButton} displayCompleteButton={completeButton} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Prompt visible={isSaving} title="Confirm saving" message={"Are you sure you want to save?"} positiveText="Yes" negativeText="No" positiveFunction={updateSubtasks} negativeFunction={() => setIsSaving(false)} />
      <Prompt visible={isCompleting} title="Confirm completing" message={"Are you sure you want to complete this task? (You won't be able to come back to this task again after completion."} positiveText="Yes" negativeText="No" positiveFunction={completeTask} negativeFunction={() => setIsCompleting(false)} />
      <PopUpTaskViewer visible={isViewingTask} task={currentViewTask} handleCloseWindow={() => setIsViewingTask(false)} />
      <Prompt visible={isWarning} title="Error" message={errorMessage} positiveText="return" positiveFunction={() => { fetchRoadmap(); setIsWarning(false); navigate(-1); }} />
      <SpinnerNeo visible={isLoading} />
    </>
  )
}