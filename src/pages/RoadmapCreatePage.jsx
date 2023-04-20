import React, { useState, useEffect, useRef } from "react";
import TaskModal from "../components/TaskModal";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  getRoadmap,
  createRoadmap,
  editRoadmap,
  countRoadmap,
} from "../functions/roadmapFunction.jsx";
import Spinner from "../components/Spinner";
import {
  getUserInformation,
  isUserLoggedIn,
  isUserPremium,
} from "../functions/userFunction";
import { CustomSVG, getTWFill } from "../components/CustomSVG";
import { ReactComponent as AddButton } from "../assets/addButton.svg";
import { ReactComponent as Lock } from "../assets/cec_page/lock.svg";
import { ReactComponent as Unlock } from "../assets/cec_page/unlock.svg";
import TwoButtonModal from "../components/TwoButtonModal";
import { ReactComponent as TaskLock } from "../assets/cec_page/taskLock.svg";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../components/StrictModeDroppable";
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as NotiOff } from "../assets/notification/notiOff.svg";
import { ReactComponent as NotiOn } from "../assets/notification/notiOn.svg";
import NotiButton from "../components/NotiButton";
import { roundTimeToNearest30 } from "../functions/formatFunction";
import { ReactComponent as QuestionMark } from "../assets/taskmodal/QuestionMark.svg";
import { ReactComponent as Close } from "../assets/close.svg";
import { useIsSM } from "../hooks/useMediaQuery";
import Step1 from "../assets/helpCreateRoadmap_assets/step_1.jpg";
import Step1_md from "../assets/helpCreateRoadmap_assets/step_1_md.jpg";
import Step1_xs from "../assets/helpCreateRoadmap_assets/step_1_xs.jpg";
import Step2 from "../assets/helpCreateRoadmap_assets/step_2.jpg";
import Step2_md from "../assets/helpCreateRoadmap_assets/step_2_md.jpg";
import Step2_xs from "../assets/helpCreateRoadmap_assets/step_2_xs.jpg";
import Step3_1 from "../assets/helpCreateRoadmap_assets/step_3_1.jpg";
import Step3_1_md from "../assets/helpCreateRoadmap_assets/step_3_1_md.jpg";
import Step3_1_xs from "../assets/helpCreateRoadmap_assets/step_3_2_xs.jpg";
import Step3_2 from "../assets/helpCreateRoadmap_assets/step_3_2.jpg";
import Step3_2_md from "../assets/helpCreateRoadmap_assets/step_3_2_md.jpg";
import Step3_2_xs from "../assets/helpCreateRoadmap_assets/step_3_2_xs.jpg";
import Step3_3 from "../assets/helpCreateRoadmap_assets/step_3_3.jpg";
import Step3_3_md from "../assets/helpCreateRoadmap_assets/step_3_3_md.jpg";
import Step3_3_xs from "../assets/helpCreateRoadmap_assets/step_3_3_xs.jpg";
import Step3_4 from "../assets/helpCreateRoadmap_assets/step_3_4.jpg";
import Step3_4_md from "../assets/helpCreateRoadmap_assets/step_3_4_md.jpg";
import Step3_4_xs from "../assets/helpCreateRoadmap_assets/step_3_4_xs.jpg";
import Step4 from "../assets/helpCreateRoadmap_assets/step_4.jpg";
import Step4_md from "../assets/helpCreateRoadmap_assets/step_4_md.jpg";
import Step4_xs from "../assets/helpCreateRoadmap_assets/step_4_xs.jpg";
import Step5 from "../assets/helpCreateRoadmap_assets/step_5.jpg";
import Step5_md from "../assets/helpCreateRoadmap_assets/step_5_md.jpg";
import Step5_xs from "../assets/helpCreateRoadmap_assets/step_5_xs.jpg";
import SpinnerNeo from "../components/SpinnerNeo";
import LockUnlockButton from "../components/LockUnlockButton";

const MAX_TASKS_NONPREMIUM = 16;
const MAX_RMNAME_LENGTH = 30;
const MAX_RMDESCRIPTION_LENGTH = 255;
const notificationDayOption = [1, 3, 5, 7, 14];
const notificationOption = {
  options: ["No notification"],
  optionValues: [{ on: false, detail: { day: 0, beforeDueDate: false } }],
};
const modalAnimationVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

notificationDayOption.forEach((day) => {
  return [true, false].forEach((beforeDueDate) => {
    notificationOption.optionValues.push({
      on: true,
      detail: {
        day: day,
        beforeDueDate: beforeDueDate,
      },
    });
    notificationOption.options.push(
      `${day} days before ${beforeDueDate ? "due" : "start"} date`
    );
  });
});

const TaskItem = ({
  task,
  setEditTaskID,
  setModalState,
  disabled,
  isLastitem,
}) => {
  // Task node Component
  return (
    <div className={`relative h-full break-words w-28 z-10`}>
      <div
        className={`h-full after:h-1 after:w-full after:top-[30px] after:absolute after:translate-x-12 ${
          isLastitem
            ? "after:border-t-4 after:border-dashed after:border-black after:bg-transparent "
            : "after:bg-black after:z-10 "
        }`}
      >
        <div className="flex h-full">
          <div className="flex flex-col gap-2 items-center h-full justify-center">
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                setEditTaskID(task.id);
                setModalState(true);
              }}
              className="z-20 relative focus:outline-none"
            >
              <TaskLock
                hidden={!disabled}
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-8 w-8"
              />
              <CustomSVG
                type={task.nodeShape}
                className={`${
                  disabled ? "fill-gray-400" : getTWFill(task.nodeColor)
                }`}
                size={60}
                isStrokeOn={true}
                noScaleOnHover={disabled}
              />
            </button>
            <div className="flex w-28 grow">
              <span className="block font-bold w-full text-center leading-5 font-nunito-sans my-auto">
                {task.name === "" ? "Milestone" : task.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DropDownMenu = ({
  options,
  optionValues,
  currentOption,
  setOption,
  optionComparer,
  Icon,
  className,
}) => {
  const [isMenuShowing, setIsMenuShowing] = useState(false);

  useEffect(() => {
    optionValues = optionValues ?? options;
  }, []);

  const handleMenuShowUnshow = (event) => {
    event.preventDefault();
    setIsMenuShowing((isMenuShowing) => !isMenuShowing);
  };

  const handleSetOption = (event, value) => {
    event.preventDefault();
    setOption(value);
    setIsMenuShowing((isMenuShowing) => !isMenuShowing);
  };

  return (
    <div className={`${className} z-40`}>
      <button
        onClick={handleMenuShowUnshow}
        type="button"
        className={`flex p-2 border-2 gap-1 items-center rounded-full hover:scale-110 transition duration-150 ${
          isMenuShowing ? "animate-bounce" : ""
        } ${currentOption.on ? "border-nav-blue" : "bg-nav-blue border-white"}`}
      >
        {Icon}
        <span
          className={`visible md:hidden font-bold [@media(max-width:360px)]:hidden ${
            currentOption.on ? "text-nav-blue" : "text-white"
          }`}
        >
          {currentOption.on
            ? `${currentOption.detail.day}d: ${
                currentOption.detail.beforeDueDate ? "Due" : "Start"
              }`
            : "Off"}
        </span>
      </button>
      <AnimatePresence mode="wait">
        {isMenuShowing ? (
          <motion.div
            key={"notification_menu"}
            className="absolute bg-white border rounded-md flex flex-col left-0 xs:left-auto xs:right-0 [@media(max-width:360px)]:-left-full"
            initial={{ y: "-50%", opacity: 0, scale: 0 }}
            animate={{ y: "0%", opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: "10%" }}
          >
            {options.map((option, index) => {
              return (
                <button
                  onClick={(event) =>
                    handleSetOption(event, optionValues[index])
                  }
                  className={`font-bold whitespace-nowrap inline-block p-1 px-2 justify-center border hover:scale-110 duration-200 transition hover:bg-yellow-300 justify-self-center ${
                    optionComparer(optionValues[index], currentOption) === true
                      ? "bg-nav-blue text-white"
                      : "bg-white text-nav-blue"
                  }`}
                  type="button"
                  key={JSON.stringify(optionValues[index])}
                >
                  {option}
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const RoadmapCreatePage = (props) => {
  const navigate = useNavigate();
  const initialState = useRef({
    name: "",
    description: "",
    isPublic: true,
    tasks: [],
    tags: [],
    notiStatus: { on: false },
  });
  const { mode } = props; // props from parent
  const { state } = useLocation(); // state from previous page, including fetched roadmap data
  const { id } = useParams(); // param from react router placeholder (/edit/:id)
  const [RMName, setRMName] = useState("");
  const [RMDesc, setRMDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editTaskID, setEditTaskID] = useState(0);
  const [lastId, setLastId] = useState(0);
  const [isPublic, setPublic] = useState(true);
  const [notiStatus, setNotiStatus] = useState({
    on: false,
    detail: { day: 0, beforeDueDate: false },
  });
  const [tags, setTags] = useState([]);
  const [publicModal, setPublicModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorHandle, setErrorHandle] = useState({
    message: "",
    redirectTo: null,
  });
  const [discardModal, setDiscardModal] = useState(false);
  const [premium, setPremium] = useState(false);
  const isSM = useIsSM();
  const [showHelp, setShowHelp] = useState(false);
  const [helpPage, setHelpPage] = useState(1);

  useEffect(() => {
    console.log("Setting up roadmap");
    setUpRoadmap();
  }, []);

  useEffect(() => {
    // display confirm message when user try to leave the page
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = ""; // required for Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  useEffect(() => {
    // this code is excessive
    // use to call a function when the user did not
    // update Roadmap Description for 1500 ms
    const timeoutID = setTimeout(() => {
      searchTags();
    }, 1500);

    return () => clearTimeout(timeoutID);
  }, [RMDesc]);

  const getID = () => {
    const x = lastId;
    setLastId(x + 1);
    return x;
  };

  const setUpNotification = (roadmap) => {
    if (roadmap.reminder_time === 0) {
      return { on: false, detail: { day: 0, beforeDueDate: false } };
    }
    return {
      on: true,
      detail: {
        beforeDueDate: !roadmap.is_before_start_time,
        day: roadmap.reminder_time,
      },
    };
  };

  const setUpRoadmap = async () => {
    setLoading(true);

    const loginStatus = await isUserLoggedIn();
    const roadmapCount = await countRoadmap();
    const premiumStatus = await isUserPremium();
    const userInfo = await getUserInformation();

    if (roadmapCount === null || premiumStatus === null || userInfo === null) {
      setLoading(false);
      handleDisplayErrorMessage("Application Error", "/", true);
    }
    if (!loginStatus) {
      setLoading(false);
      handleDisplayErrorMessage("User is not authorized", "/login", true);
    }
    if (
      roadmapCount >= 3 &&
      !premiumStatus &&
      (mode === "create" || mode === "clone")
    ) {
      setLoading(false);
      handleDisplayErrorMessage(
        "Roadmap limit reached for non-premium user",
        "/",
        true
      );
    }

    setPremium(premiumStatus);

    if (mode === "edit" || mode === "clone") {
      // check if state is available
      if (state !== null && state !== undefined) {
        // set up the data to variable
        const notificationObject = setUpNotification(state.roadmap);
        if (mode === "edit") {
          if (userInfo.uid !== state.roadmap.owner_id) {
            setLoading(false);
            handleDisplayErrorMessage("User is not authorized", "/", true);
          }
          initialState.current = {
            name: state.roadmap.name,
            description: state.roadmap.description,
            isPublic: state.roadmap.isPublic,
            tasks: state.roadmap.tasks,
            tags: state.roadmap.tags,
            notiStatus: notificationObject,
          };
        }
        let highestID = 0;
        state.roadmap.tasks.forEach((task) => {
          if (task.id > highestID) {
            highestID = task.id;
          }
        });
        setRMName(state.roadmap.name);
        setRMDesc(state.roadmap.description);
        setTasks(state.roadmap.tasks);
        setPublic(state.roadmap.isPublic);
        setTags(state.roadmap.tags);
        setNotiStatus(notificationObject);
        setLastId(highestID + 1);
      } else {
        // fetch the roadmap data
        // then set the data to variable
        // const tempRoadmap = await getRoadmap(id, 10000, mode === "clone"); //individual fetch is bugged
        const tempRoadmap = await getRoadmap(id, 10000, true);
        if (tempRoadmap === null) {
          setLoading(false);
          handleDisplayErrorMessage("Roadmap Loading Failed", "/home", true);
        } else {
          const notificationObject = setUpNotification(tempRoadmap);
          if (mode === "edit") {
            if (userInfo.uid !== tempRoadmap.owner_id) {
              setLoading(false);
              handleDisplayErrorMessage("User is not authorized", "/", true);
            }
            initialState.current = {
              name: tempRoadmap.name,
              description: tempRoadmap.description,
              isPublic: tempRoadmap.isPublic,
              tasks: tempRoadmap.tasks,
              tags: tempRoadmap.tags,
              notiStatus: notificationObject,
            };
          }
          let highestID = 0;
          tempRoadmap.tasks.forEach((task) => {
            if (task.id > highestID) {
              highestID = task.id;
            }
          });
          setRMName(tempRoadmap.name);
          setRMDesc(tempRoadmap.description);
          setTasks(tempRoadmap.tasks);
          setPublic(tempRoadmap.isPublic);
          setTags(tempRoadmap.tags);
          setNotiStatus(notificationObject);
          setLastId(highestID + 1);
        }
      }
    }

    if (mode === "clone") {
      let timeDifference = undefined;
      setTasks((tasks) =>
        tasks.map((task) => {
          timeDifference |= new Date().getTime() - task.startDate.getTime();
          task.isDone = false;
          task.isTempId = true;
          task.startDate = roundTimeToNearest30(
            new Date(task.startDate.getTime() + timeDifference)
          );
          task.dueDate = roundTimeToNearest30(
            new Date(task.dueDate.getTime() + timeDifference)
          );
          task.subtasks.map((subtask) => {
            subtask.isTempId = true;
            return subtask;
          });
          return task;
        })
      );
    }
    setLoading(false);
  };

  const searchTags = () => {
    const allWords = RMDesc.split(" ");
    let allTags = [];
    allWords.forEach((word) => {
      if (word.charAt(0) === "#") {
        allTags.push(word);
      }
    });

    allTags = [...new Set(allTags)];
    console.log(allTags);
    setTags(allTags);
  };

  const editTaskCallBack = (status, submissionObject) => {
    // the task edit modal would call this back to close the modal
    // and save the data to the react state
    switch (status) {
      case "success":
        // user click save
        console.log("success");
        setHasUnsavedChanges(true);
        switch (submissionObject.id) {
          case -1:
            // new tasks
            submissionObject.id = getID();
            setTasks([...tasks, submissionObject]);
            break;
          default:
            // edit task
            setTasks(
              tasks.map((task) =>
                task.id === submissionObject.id ? submissionObject : task
              )
            );
            initialState.current.tasks.map((task) => {
              if (task.id === submissionObject.id) {
                task.hasFetched = true;
              }
              return task;
            });
            break;
        }
        break;
      case "fetch":
        // task was fetched but not edited
        console.log("fetch");
        setTasks(
          tasks.map((task) =>
            task.id === submissionObject.id ? submissionObject : task
          )
        );
        initialState.current.tasks = initialState.current.tasks.map((task) => {
          if (task.id === submissionObject.id) return submissionObject;
          return task;
        });
        break;
      case "failed":
        // user quit modal without saving
        console.log("failed");
        break;
      case "delete":
        // user click delete task button
        console.log("delete");
        setHasUnsavedChanges(true);
        setTasks((tasks) =>
          tasks.filter((task) => task.id !== submissionObject.id)
        );
        break;
      default:
        console.warn("Unexplained default case");
    }

    setModalState(false);
  };

  const initializeTaskCreator = () => {
    setModalState(true);
    setEditTaskID(-1);
  };

  const isAddButtonDisabled = () => {
    return !premium && tasks.length >= MAX_TASKS_NONPREMIUM;
  };

  const handleNameChange = (event) => {
    if (event.target.value.length <= MAX_RMNAME_LENGTH) {
      setRMName((n) => event.target.value);
    }
    setHasUnsavedChanges(true);
  };

  const handleDescriptionChange = (event) => {
    if (event.target.value.length <= MAX_RMDESCRIPTION_LENGTH) {
      setRMDesc((d) => event.target.value);
    }
    setHasUnsavedChanges(true);
  };

  const handlePublicityChange = () => {
    setPublic(!isPublic);
    setPublicModal(false);
    setHasUnsavedChanges(true);
  };

  const handleOrderSwitch = (result) => {
    if (result.destination === null) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const compareRoadmapChange = () => {
    // compare name, desc, public, notisetting
    // If detect change, return full object
    // if no change, return null;
    if (
      RMName !== initialState.current.name ||
      RMDesc !== initialState.current.description ||
      isPublic !== initialState.current.isPublic ||
      JSON.stringify(notiStatus) !==
        JSON.stringify(initialState.current.notiStatus) ||
      mode === "create" ||
      mode === "clone"
    )
      return {
        id: id ?? null,
        name: RMName,
        description: RMDesc,
        isPublic: isPublic,
        notiStatus: notiStatus,
      };
    return null;
  };

  const compareTaskChange = (initState, newState) => {
    // compare first data and latest data
    // initState, newState: task array
    initState = initState ?? [];
    let taskChange = { add: [], edit: [], delete: [] };

    // check for deleted task
    // PS. initState can't have tempID, so checking here is fine
    initState.forEach((inittask) => {
      if (
        newState.find((newtask) => newtask.id === inittask.id) === undefined
      ) {
        taskChange.delete.push(inittask.id);
      }
    });

    newState.forEach((task) => {
      if (task.isTempId === true) {
        // new task
        taskChange.add.push(task);
        return;
      }

      const taskIntersection = initState.find(
        (inittask) => task.id === inittask.id
      );
      console.log(task.nodeShape);
      console.log(taskIntersection.nodeShape);
      if (
        taskIntersection.hasFetched === true &&
        (task.name !== taskIntersection.name ||
          task.description !== taskIntersection.description ||
          task.nodeColor !== taskIntersection.nodeColor ||
          task.nodeShape !== taskIntersection.nodeShape ||
          task.startDate.getTime() !== taskIntersection.startDate.getTime() ||
          task.dueDate.getTime() !== taskIntersection.dueDate.getTime())
      ) {
        // edited task
        console.log(`added task ${task.id} to edit list`);
        taskChange.edit.push(task);
        return;
      }
    });
    return taskChange;
  };

  const compareSubtaskChange = (initState, newState) => {
    // compare first data and latest data
    // initState, newState: subtask array
    initState = initState ?? [];
    let subtaskChange = { add: [], edit: [], delete: [] };
    initState.forEach((initsubtask) => {
      if (
        newState.find((newsubtask) => newsubtask.id === initsubtask.id) ===
        undefined
      ) {
        subtaskChange.delete.push(initsubtask.id);
      }
    });

    newState.forEach((subtask) => {
      if (subtask.isTempId === true) {
        // new subtask
        subtaskChange.add.push(subtask);
        return;
      }

      const taskIntersection = initState.find(
        (initsubtask) => subtask.id === initsubtask.id
      );

      if (taskIntersection === undefined) return;
      if (
        subtask.detail !== taskIntersection.detail ||
        subtask.status !== taskIntersection.status
      ) {
        // edited task
        subtaskChange.edit.push(subtask);
        return;
      }
    });
    return subtaskChange;
  };

  const compareTagChange = () => {
    console.log(searchTags());
    let tagChanges = { add: [], delete: [] };
    initialState.current.tags.forEach((inittag) => {
      if (tags.find((tag) => inittag === tag) === undefined)
        tagChanges.delete.push(inittag);
    });

    tags.forEach((tag) => {
      if (
        initialState.current.tags.find((inittag) => inittag === tag) ===
        undefined
      )
        tagChanges.add.push(tag);
    });

    return tagChanges;
  };

  const compareNotificationChange = (noti1, noti2) => {
    if (noti1.on !== noti2.on) return false;
    if (noti1.on === false && noti2.on === false) return true;
    if (
      noti1.detail.beforeDueDate !== noti2.detail.beforeDueDate ||
      noti1.detail.day !== noti2.detail.day
    )
      return false;
    return true;
  };

  const handleSendingApi = async (
    roadmapObject,
    taskChange,
    subtaskChange,
    relationChange,
    tagChanges,
    reportError
  ) => {
    if (mode === "create" || mode === "clone") {
      return await createRoadmap(
        roadmapObject,
        taskChange,
        subtaskChange,
        tagChanges,
        reportError
      );
    } else if (mode === "edit") {
      return await editRoadmap(
        id,
        roadmapObject,
        taskChange,
        subtaskChange,
        relationChange,
        tagChanges,
        reportError
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let subTaskChange = { add: [], edit: [], delete: [] };
    let taskRelationChange = null;

    // check for rm name, description, publicity change
    let roadmapChange = compareRoadmapChange();

    // check for task change
    let taskChange = compareTaskChange(initialState.current.tasks, tasks);

    // check for subtask change
    tasks.forEach((task) => {
      console.log(initialState.current);
      const initTask = initialState.current.tasks.find(
        (t) => t.id === task.id
      ) ?? { subtasks: [] };
      const comparison = compareSubtaskChange(initTask.subtasks, task.subtasks);
      subTaskChange.add.push(
        ...comparison.add.map((subtask) => {
          subtask.tid = task.id;
          return subtask;
        })
      );
      subTaskChange.edit.push(
        ...comparison.edit.map((subtask) => {
          subtask.tid = task.id;
          return subtask;
        })
      );
      subTaskChange.delete.push(...comparison.delete);
    });

    // check for task relation change
    const newTaskRelation = tasks.map((task) => task.id);
    taskRelationChange =
      initialState.current.tasks.map((task) => task.id).toString() !==
      newTaskRelation.toString()
        ? newTaskRelation
        : null;

    const tagChanges = compareTagChange();

    // console.log("roadmap change");
    // console.log(roadmapChange);
    // console.log("task");
    // console.log(taskChange);
    // console.log("subtask");
    // console.log(subTaskChange);
    // console.log("relation change");
    // console.log(taskRelationChange);
    // console.log("tag change");
    // console.log(tagChanges);

    setLoading(true);
    const response = await handleSendingApi(
      roadmapChange,
      taskChange,
      subTaskChange,
      taskRelationChange,
      tagChanges,
      handleDisplayErrorMessage
    );
    setLoading(false);
    if (response !== null && response !== undefined) {
      if (mode === "create" || mode === "clone") {
        try {
          navigate(`/view/${response.roadmap.rid}`);
        } catch (error) {
          console.error(error);
          handleDisplayErrorMessage("Error navigating to view page", "/", true);
        }
      } else {
        try {
          navigate(`/view/${id}`);
        } catch (error) {
          console.error(error);
          handleDisplayErrorMessage("Error navigating to view page", "/", true);
        }
      }
    }
  };

  const handleDiscard = () => {
    setRMName(initialState.current.name);
    setRMDesc(initialState.current.description);
    setPublic(initialState.current.isPublic);
    setTasks(initialState.current.tasks);
    setTags(initialState.current.tags);
    setNotiStatus(initialState.current.notiStatus);
    setHasUnsavedChanges(false);
    setDiscardModal(false);
  };

  const handleDisplayErrorMessage = (
    error,
    redirectTo = null,
    selfGenerateError = false
  ) => {
    if (selfGenerateError === true) {
      setErrorHandle({ message: error, redirectTo: redirectTo });
    } else {
      if (error.response !== undefined && error.response !== null) {
        if (error.response.status === 401) redirectTo = "/login";
        setErrorHandle({
          message: error.response.data.detail,
          redirectTo: redirectTo,
        });
      } else {
        setErrorHandle({ message: error.message, redirectTo: redirectTo });
      }
    }
    setErrorModal(true);
  };

  const handleErrorRedirect = () => {
    if (errorHandle.redirectTo !== null) navigate(errorHandle.redirectTo);
    else setErrorModal(false);
  };

  const helpClick = () => {
    setShowHelp(!showHelp);
    setHelpPage(1);
  };

  const previousPageClick = () => setHelpPage(helpPage - 1);

  const nextPageCLick = () => setHelpPage(helpPage + 1);

  return (
    <>
      <TwoButtonModal
        isOpen={publicModal}
        onLightPress={() => setPublicModal(false)}
        onDarkPress={handlePublicityChange}
        textField={{
          title: `Change to ${isPublic ? '"private"' : '"public"'}?`,
          body: `Are you sure you want to change the roadmap to ${
            isPublic ? '"private"' : '"public"'
          }?`,
          lightButtonText: "Cancel",
          darkButtonText: "OK",
        }}
      />

      <TwoButtonModal
        isOpen={errorModal}
        onDarkPress={handleErrorRedirect}
        textField={{
          title: "Error",
          body: errorHandle.message,
          lightButtonText: "Cancel",
          darkButtonText: "OK",
        }}
        oneButton={true}
      />

      <TwoButtonModal
        isOpen={discardModal}
        onLightPress={() => setDiscardModal(false)}
        onDarkPress={handleDiscard}
        textField={{
          title: `Discard Change?`,
          body: "Are you sure you want to discard change?",
          lightButtonText: "Cancel",
          darkButtonText: "OK",
        }}
      />

      <AnimatePresence mode="wait">
        {modalState ? (
          // id -1 is passed as a temp id to let the modal know it's in create mode, otherwise it's in edit mode
          editTaskID == -1 ? (
            <TaskModal
              oldData={{ id: -1 }}
              editTaskCallBack={editTaskCallBack}
            />
          ) : (
            <TaskModal
              oldData={tasks.find((task) => task.id === editTaskID)}
              editTaskCallBack={editTaskCallBack}
            />
          )
        ) : null}
      </AnimatePresence>

      <SpinnerNeo visible={loading} />
      <div className="flex justify-center items-center flex-col m-auto max-w-5xl w-[90%]">
        {/* <div className="text-4xl font-bold flex items-start"> */}
        <div className="flex w-full justify-between">
          <span className="text-4xl text-nav-blue font-extrabold">
            {mode === "create"
              ? "Create"
              : mode === "edit"
              ? "Edit"
              : mode === "clone"
              ? "Clone"
              : null}{" "}
          </span>
          <button
            onClick={helpClick}
            className="rounded-full w-32 inline xs:w-32 h-10 bg-nav-blue font-bold text-white"
          >
            Help
          </button>
        </div>
        {/* </div> */}
        <form
          onSubmit={handleSubmit}
          className={`rounded-3xl w-full gap-3 flex flex-col bg-white p-10 min-h-[80%] xs:min-h-[60%] m-3 shadow-lg shadow-gray-400 border-gray-400`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <label className="hidden md:visible text-3xl font-bold md:block leading-none text-nav-blue">
              Name
            </label>
            <label className="visible text-md md:hidden font-bold block leading-none text-nav-blue">
              Roadmap name
            </label>
            <input
              className="text-3xl focus:outline-none text-ellipsis font-bold w-full leading-none placeholder:font-extrabold text-center md:text-left rounded-lg text-gray-400"
              value={RMName}
              onChange={handleNameChange}
              placeholder="UNTITLED"
            />
            <div className="flex gap-2 justify-evenly">
              {/* Notification Setting */}
              <div className="relative flex justify-center items-center">
                <DropDownMenu
                  optionValues={notificationOption.optionValues}
                  options={notificationOption.options}
                  currentOption={notiStatus}
                  setOption={setNotiStatus}
                  optionComparer={compareNotificationChange}
                  Icon={
                    <NotiButton
                      notiStatus={notiStatus}
                      className="w-6 h-6"
                      fillColor={notiStatus.on ? "#00286E" : "white"}
                    />
                  }
                  className="z-10"
                />
              </div>
              {/* End of Notification Setting */}
              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={() => setPublicModal(true)}
                  className={`hover:scale-110 flex gap-1 transition duration-150 items-center border-nav-blue rounded-full border-2 p-2 ${
                    publicModal === true ? "animate-bounce" : ""
                  } ${!isPublic ? "bg-white" : "bg-nav-blue"}`}
                >
                  <LockUnlockButton
                    isLock={isPublic}
                    className="w-6 h-6"
                    fillColor={!isPublic ? "#00286E" : "white"}
                  />
                </button>
              </div>
            </div>
          </div>

          {tags.length > 0 && tags.length <= 3 ? (
            <motion.div className="text-gray-400">
              Tags: {tags.join(", ")}
            </motion.div>
          ) : tags.length > 3 ? (
            <motion.div className="text-gray-400">
              Tags: {`${tags.slice(0, 3).join(", ")}, +${tags.length - 3}`}
            </motion.div>
          ) : null}

          <div className="">
            <label className="text-md font-bold text-nav-blue">Roadmap Description </label>
            <textarea
              className="rounded-lg border-gray-400 text-gray-400 block text-md p-1 w-full focus:outline-none shadow-lg shadow-gray-300 placeholder:text-italic"
              rows="3"
              cols="60"
              value={RMDesc}
              onChange={handleDescriptionChange}
              placeholder="Enter roadmap description..."
            ></textarea>
          </div>

          <div className="grow max-h-[60%] min-h-[200px]">
            {/* Giant task box */}
            <div className="flex overflow-x-auto relative flex-col justify-center bg-blue-100 shadow-xl h-full border-gray-300 rounded-3xl items-start p-10 pl-8 pr-16 z-0">
              <DragDropContext onDragEnd={handleOrderSwitch}>
                <StrictModeDroppable droppableId="tasks" direction="horizontal">
                  {(provided) => (
                    <div
                      className="flex items-center"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {/* Task list */}
                      {tasks.map((task, index) => {
                        {
                          return mode === "edit" &&
                            (index < 1 || tasks[index - 1].isDone) ? (
                            <TaskItem
                              task={task}
                              key={task.id}
                              setEditTaskID={setEditTaskID}
                              setModalState={setModalState}
                              disabled={
                                index < 1 ||
                                (tasks[index - 1].isDone && !tasks.isTempId)
                              }
                              isLastitem={index === tasks.length - 1}
                            />
                          ) : (
                            <Draggable
                              key={task.id}
                              draggableId={task.id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="flex items-center h-full"
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <TaskItem
                                    task={task}
                                    setEditTaskID={setEditTaskID}
                                    setModalState={setModalState}
                                    isLastitem={index === tasks.length - 1}
                                    disabled={
                                      mode === "edit" &&
                                      (index < 1 ||
                                        (tasks[index - 1].isDone && !tasks.id))
                                    }
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        }
                      })}
                      {provided.placeholder}
                      {/* End of task list */}
                      {/* Add button */}
                      <div
                        className={`flex self-start ${
                          tasks.length > 0 ? "w-28" : ""
                        } justify-center`}
                      >
                        <button
                          type="button"
                          disabled={isAddButtonDisabled()}
                          onClick={initializeTaskCreator}
                          className="translate-y-[12px] translate-x-3"
                        >
                          <AddButton className="h-10 w-10" />
                        </button>
                      </div>
                    </div>
                  )}
                </StrictModeDroppable>
              </DragDropContext>
            </div>
            {/* End of Task box */}
          </div>
          <div className="justify-end flex">
            <div className="right-0 w-full xs:w-auto flex gap-2">
              <button
                className="bg-transparent inline border-nav-blue text-nav-blue w-full font-bold xs:w-32 h-10 rounded-full border-2  m-0"
                type="button"
                onClick={() => setDiscardModal(true)}
              >
                Discard
              </button>
              <button
                className="rounded-full w-full inline xs:w-32 h-10 bg-nav-blue font-bold text-white"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      {showHelp && (
        <div className="absolute flex flex-col left-0 justify-center items-center w-full h-full max-xs:max-h-full bg-gray-300 bg-opacity-[0.58] z-[100]">
          <div className="flex justify-start items-center px-[23px] w-1/2 min-w-[292px] max-w-[790px] h-fit bg-[#00286E] rounded-t-[20px]">
            <div className="flex items-center justify-between w-full my-4">
              <div className="flex items-center justify-start">
                <QuestionMark className="mr-[13px]" />
                {mode == "create" ? (
                  <div className="font-inter font-bold text-3xl text-[#FFFFFF]">
                    Create a roadmap
                  </div>
                ) : (
                  <></>
                )}
                {mode == "edit" ? (
                  <div className="font-inter font-bold text-3xl text-[#FFFFFF]">
                    Edit a roadmap
                  </div>
                ) : (
                  <></>
                )}
                {mode == "clone" ? (
                  <div className="font-inter font-bold text-3xl text-[#FFFFFF]">
                    Clone a roadmap
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <button onClick={helpClick}>
                <Close />
              </button>
            </div>
          </div>
          <div className="flex w-1/2 min-w-[292px] max-w-[790px] h-fit bg-[#F0F3F4] rounded-b-[20px]">
            <div className="flex flex-col w-full min-h-fit max-h-[400px] max-xs:max-h-[300px] p-8">
              <div className="flex flex-col w-fit max-h-[400px] mb-8 overflow-y-auto">
                <div className="font-inter font-bold text-xl text-[#333333] mb-4">
                  {mode == "create" ? (
                    <>
                      {helpPage == 1 ? (
                        <>
                          <div className="mb-4">
                            Step 1: Name your roadmap at the UNTITLED
                            placeholder. Fill your roadmap description.
                          </div>
                          <img src={Step1} className="max-md:hidden" />
                          <img
                            src={Step1_md}
                            className="max-xs:hidden md:hidden"
                          />
                          <img src={Step1_xs} className="xs:hidden" />
                        </>
                      ) : (
                        <></>
                      )}
                      {helpPage == 2 ? (
                        <>
                          <div className="mb-4">
                            Step 2: Click at the Add button to create a task.
                          </div>
                          <img src={Step2} className="max-md:hidden" />
                          <img
                            src={Step2_md}
                            className="max-xs:hidden md:hidden"
                          />
                          <img src={Step2_xs} className="xs:hidden" />
                        </>
                      ) : (
                        <></>
                      )}
                      {helpPage == 3 ? (
                        <>
                          <div>Step 3:</div>
                          <div className="mb-4">
                            3.1 Name your task, and its description.
                          </div>
                          <img src={Step3_1} className="mb-4 max-md:hidden" />
                          <img
                            src={Step3_1_md}
                            className="mb-4 max-xs:hidden md:hidden"
                          />
                          <img src={Step3_1_xs} className="mb-4 xs:hidden" />
                          <div className="mb-4">
                            3.2 Set the start, and the due date.
                          </div>
                          <img src={Step3_2} className="mb-4 max-md:hidden" />
                          <img
                            src={Step3_2_md}
                            className="mb-4 max-xs:hidden md:hidden"
                          />
                          <img src={Step3_2_xs} className="mb-4 xs:hidden" />
                          <div className="mb-4">
                            3.3 Design the shape and the color of a task node.
                          </div>
                          <img src={Step3_3} className="mb-4 max-md:hidden" />
                          <img
                            src={Step3_3_md}
                            className="mb-4 max-xs:hidden md:hidden"
                          />
                          <img src={Step3_3_xs} className="mb-4 xs:hidden" />
                          <div className="mb-4">
                            3.4 (Optional) Add the subtask.
                          </div>
                          <img src={Step3_4} className="mb-4 max-md:hidden" />
                          <img
                            src={Step3_4_md}
                            className="mb-4 max-xs:hidden md:hidden"
                          />
                          <img src={Step3_4_xs} className="mb-4 xs:hidden" />
                          <div className="mb-4">
                            3.5 Click "Save" to keep it.
                          </div>
                          <div className="text-[#FF0000]">
                            *** Recreate the tasks until finish
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {helpPage == 4 ? (
                        <>
                          <div className="mb-4">Step 4:</div>
                          <div className="mb-4">
                            4.1 Set the notification time.
                          </div>
                          <div className="mb-4">
                            4.2 Set the privacy of a roadmap.
                          </div>
                          <img src={Step4} className="max-md:hidden" />
                          <img
                            src={Step4_md}
                            className="max-xs:hidden md:hidden"
                          />
                          <img src={Step4_xs} className="xs:hidden" />
                        </>
                      ) : (
                        <></>
                      )}
                      {helpPage == 5 ? (
                        <>
                          <div className="mb-4">
                            Step 5: Click "Save" button to publish the roadmap
                            to the system.
                          </div>
                          <img src={Step5} className="max-md:hidden" />
                          <img
                            src={Step5_md}
                            className="max-xs:hidden md:hidden"
                          />
                          <img src={Step5_xs} className="xs:hidden" />
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  {mode == "edit" ? (
                    <div className="flex flex-col">
                      <div className="font-inter font-bold text-xl text-[#333333] mb-6">
                        The concept is similar to creating a roadmap, but there
                        are some constraints for editing.
                      </div>
                      <div className="flex flex-col mb-6">
                        <div className="font-inter font-bold text-xl text-[#FF0000]">
                          Things that you can edit
                        </div>
                        <div className="font-inter font-medium text-lg text-[#333333]">
                          1. Roadmap Title
                        </div>
                        <div className="font-inter font-medium text-lg text-[#333333]">
                          2. Roadmap Description
                        </div>
                        <div className="font-inter font-medium text-lg text-[#333333]">
                          3. Task (not in progress)
                        </div>
                        <div className="font-inter font-medium text-lg text-[#333333]">
                          4. Notification
                        </div>
                        <div className="font-inter font-medium text-lg text-[#333333]">
                          5. Privacy
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="font-inter font-bold text-xl text-[#FF0000]">
                          Things that you cannot edit
                        </div>
                        <div className="font-inter font-medium text-lg text-[#333333]">
                          1. Archived Roadmaps
                        </div>
                        <div className="font-inter font-medium text-lg text-[#333333] mb-4">
                          2. Task (in progress or completed)
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {mode == "clone" ? (
                    <div className="flex flex-col">
                      <div className="font-inter font-bold text-xl text-[#333333] mb-6">
                        When you clone a roadmap, you are also able to edit the
                        roadmap at the same time; it is like you create the same
                        roadmap as others, but edit some options.
                      </div>
                      <div className="font-inter font-bold text-xl text-[#333333]">
                        However, for non-premium users, they can only clone a
                        roadmap if they own less than three roadmaps otherwise
                        they cannot.
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex justify-end w-full h-[43px]">
                {mode == "create" ? (
                  <>
                    {helpPage != 1 && (
                      <button
                        onClick={previousPageClick}
                        className="flex justify-center items-center text-[#525252] hover:text-[#FFFFFF] border border-[#525252] rounded-[30px] w-[90px] hover:bg-[#e30b0b] hover:border-none"
                      >
                        <div className="font-inter">Previous</div>
                      </button>
                    )}
                    {helpPage != 5 && (
                      <button
                        onClick={nextPageCLick}
                        className="flex justify-center items-center ml-4 text-[#FDFDFB] bg-[#00286E] hover:bg-[#038a1c] border rounded-[30px] w-[90px]"
                      >
                        <div className="font-inter">Next</div>
                      </button>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoadmapCreatePage;
