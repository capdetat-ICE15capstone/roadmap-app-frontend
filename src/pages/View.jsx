import React, { useState, useEffect, useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from "../functions/axiosInstance";
import { getRoadmap } from '../functions/roadmapFunction';
import { likeRoadmap, unlikeRoadmap } from '../functions/viewFunction';
import RoadmapViewer from '../components/RoadmapViewer';
import Spinner from '../components/Spinner';
import Prompt from '../components/Prompt';
import RoadmapDetail from '../components/RoadmapDetail';
import RoadmapTaskDetail from '../components/RoadmapTaskDetail';

export default function View() {
  const { roadmap_id } = useParams();
  const navigate = useNavigate();

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

  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    fetchRoadmap();
  }, []);

  // now gotta modify this code to update per node (task/milestone) to save resources. 

  function completeTask() {
    setIsLoading(true);
    setIsCompleting(false);
    const route = `/task/complete?tid=${currentTask.id}&added_exp=${50}`;
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

  if (roadmap.hasFetched) {
    return (
      <>
        <div className='flex h-full bg-white overflow-y-auto py-8'>
          <div className="w-3/4 max-w-3xl flex-col m-auto space-y-6">

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
            <RoadmapViewer tasks={roadmap.tasks} currentTaskID={currentTask.id} className="" />

            {(!isCompleted) && (
              <RoadmapTaskDetail task={currentTask} handleTaskUpdate={(task) => setCurrentTask(task)} handleIsSaving={() => setIsSaving(true)} handleIsCompleting={() => setIsCompleting(true)} isOwner={isOwner} displaySaveButton={saveButton} displayCompleteButton={completeButton}/>
            )}
          </div>
        </div >
        {(isLoading) && (
          <Spinner />
        )}
        {(isSaving) && (
          <Prompt message={"confirm save?"} confirmFunction={updateSubtasks} cancelFunction={() => setIsSaving(false)} />
        )}
        {(isCompleting) && (
          <Prompt message={"confirm complete?"} confirmFunction={completeTask} cancelFunction={() => setIsCompleting(false)} />
        )}
      </>
    )
  } else if (isWarning) {
    return <Prompt message={"Roadmap fetching failed. Retry?"} confirmFunction={() => {fetchRoadmap(); setIsWarning(false)}} cancelFunction={() => navigate("/feed")} />
  } else {
    return (
      <>
        <Spinner />
      </>
    )
  }
}