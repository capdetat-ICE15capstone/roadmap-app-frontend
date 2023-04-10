import React, { useState, useEffect, createRef, useRef } from "react";
import TaskModal from "../components/TaskModal";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  getRoadmap,
  createRoadmap,
  editRoadmap,
} from "../functions/roadmapFunction.jsx";
import Spinner from "../components/Spinner";
import { isUserLoggedIn, isUserPremium } from "../functions/userFunction";
import { CustomSVG, getTWFill } from "../components/CustomSVG";
import { ReactComponent as AddButton } from "../assets/addButton.svg";
import TwoButtonModal from "../components/TwoButtonModal";
import { ReactComponent as Check } from "../assets/check.svg";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../components/StrictModeDroppable";
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as NotiOff } from "../assets/notification/notiOff.svg";
import { ReactComponent as NotiOn } from "../assets/notification/notiOn.svg";

// TODO: put a null check around getRoadmap and createRoadmap pls
// BUG: spinner does not stop spinning in error
// TODO: more styling
// TODO: zigzag div
// BUG: notification time

const MAX_TASKS_NONPREMIUM = 16;
const MAX_RMNAME_LENGTH = 30;
const MAX_RMDESCRIPTION_LENGTH = 255;
const notificationDayOption = [1, 3, 5, 7, 14];
const notificationOption = {
  options: ["No notification"],
  optionValues: [{ on: false }],
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

const TaskItem = ({ task, setEditTaskID, setModalState }) => {
  // Task node Component
  return (
    <div className="relative break-words w-32">
      <div className="flex after:h-1 after:w-full after:bg-black after:absolute after:top-[30px] after:-z-10 justify-center">
        <div className="flex">
          <div className="flex flex-col gap-2 items-center">
            <button
              type="button"
              disabled={task.isDone}
              onClick={() => {
                setEditTaskID(task.id);
                setModalState(true);
              }}
            >
              <Check hidden={!task.isDone} className="absolute" />
              <CustomSVG
                type={task.nodeShape}
                className={`${getTWFill(task.nodeColor)}`}
                size={60}
                isStrokeOn={true}
              />
            </button>
            <div className="w-4/5 absolute bottom-0 translate-y-[calc(100%_+_10px)]">
              <span className="block font-bold mx-auto text-center leading-5 font-nunito-sans">
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

  useEffect(() => {
    console.log(currentOption);
  }),
    [currentOption];

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
    <div className={className}>
      <button onClick={handleMenuShowUnshow} type="button">
        <Icon />
      </button>
      {isMenuShowing ? (
        <AnimatePresence>
          <motion.div
            className="absolute bg-white border rounded-md flex flex-col right-0"
            initial={{ y: "-50%", opacity: 0, scale: 0 }}
            animate={{ y: "0%", opacity: 1, scale: 1 }}
            exit={{ y: "-50%", opacity: 0, scale: 0 }}
          >
            {options.map((option, index) => {
              return (
                <button
                  onClick={(event) =>
                    handleSetOption(event, optionValues[index])
                  }
                  className={`font-bold whitespace-nowrap inline-block p-2 justify-center border hover:scale-125 duration-200 transition hover:bg-yellow-300 justify-self-center ${
                    optionComparer(optionValues[index], currentOption) === true
                      ? "bg-gray-300"
                      : "bg-white"
                  }`}
                  type="button"
                  key={JSON.stringify(optionValues[index])}
                >
                  {option}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      ) : null}
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
  });
  const { mode } = props; // props from parent
  const { state } = useLocation(); // state from previous page, including fetched roadmap data
  const { id } = useParams(); // param from react router placeholder (/edit/:id)
  const [RMName, setRMName] = useState("");
  const [RMDesc, setRMDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editTaskID, setEditTaskID] = useState(0);
  const [lastId, setLastId] = useState(0);
  const [isPublic, setPublic] = useState(true);
  const [notiStatus, setNotiStatus] = useState({ on: false });
  const [tags, setTags] = useState([]);
  const [publicModal, setPublicModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
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
    console.log(roadmap);
    if (roadmap.reminder_time === 0) {
      return { on: false };
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
    // use to load roadmap page into edit or clone page
    if (mode === "edit" || mode === "clone") {
      // check whether the user could view this page
      if (!isUserLoggedIn) {
        alert("unauthorized")
      }
      // check if state is available
      if (state !== null && state !== undefined) {
        // set up the data to variable
        const notificationObject = setUpNotification(state.roadmap);
        if (mode === "edit") {
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
        // setLastId((lastId) => highestID + 1);
      } else {
        // fetch the roadmap data
        // then set the data to variable
        setLoading(true);
        const tempRoadmap = await getRoadmap(id, 10000, false);
        if (tempRoadmap === null) {
          setLoading(false);
          alert("error");
          navigate("/");
        }
        const notificationObject = setUpNotification(tempRoadmap);
        if (tempRoadmap !== null) {
          if (mode === "edit") {
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
          // setLastId((lastId) => highestID + 1);
        } else {
          alert("GET error");
          navigate("/");
        }
        setLoading(false);
      }
    }

    if (mode === "clone") {
      setTasks((tasks) =>
        tasks.map((task) => {
          task.isDone = false;
          task.isTempId = true;
          task.subtasks.map((subtask) => {
            subtask.isTempId = true;
            return subtask;
          });
          return task;
        })
      );
    }
  };

  const searchTags = () => {
    const allWords = RMDesc.split(" ");
    let allTags = [];
    allWords.forEach((word) => {
      if (word.charAt(0) === "#") {
        allTags.push(word);
      }
    });

    console.log(allTags);
    setTags(allTags);
  };

  const editTaskCallBack = (status, submissionObject) => {
    // the task edit modal would call this back to close the modal
    // and save the data to the react state
    switch (status) {
      case "success":
        // user click save
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
            break;
        }
        break;
      case "fetch":
        // task was fetched but not edited
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
        setTasks((tasks) =>
          tasks.filter((task) => task.id !== submissionObject.id)
        );
        setHasUnsavedChanges(true);
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
    return !isUserPremium() && tasks.length >= MAX_TASKS_NONPREMIUM;
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
      console.log(taskIntersection)

      // if (taskIntersection === undefined) return;

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
    console.log(searchTags())
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
    tagChanges
  ) => {
    if (mode === "create" || mode === "clone") {
      if (
        (await createRoadmap(roadmapObject, taskChange, subtaskChange)) === null
      ) {
        return false;
      }
      return true;
    } else if (mode === "edit") {
      if (
        (await editRoadmap(
          id,
          roadmapObject,
          taskChange,
          subtaskChange,
          relationChange,
          tagChanges
        )) === null
      ) {
        return false;
      }
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // let taskChange = { add: [], edit: [], delete: [] };
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

    const completeRoadmap = {
      id: id ?? null,
      name: RMName,
      description: RMDesc,
      // tasks: tasks,
      isPublic: isPublic,
      notificationInfo: notiStatus,
    };

    const tagChanges = compareTagChange();

    console.log("roadmap change");
    console.log(roadmapChange);
    console.log("task");
    console.log(taskChange);
    console.log("subtask");
    console.log(subTaskChange);
    console.log("relation change");
    console.log(taskRelationChange);
    console.log("tag change");
    console.log(tagChanges);

    // Begin the spinner
    setLoading(true);
    await generateNotificationObjects();
    if (await handleSendingApi(
      roadmapChange,
      taskChange,
      subTaskChange,
      taskRelationChange,
      tagChanges
    )) navigate("/")
    setLoading(false);
    // navigate("/");
  };

  const handleDiscard = () => {};

  const handleNotiSettingChange = (event) => {
    setNotiStatus(JSON.parse(event.target.value));
  };

  const generateNotificationObjects = () => {
    // generate array of noti object to be sent to the server
    if (notiStatus.on === false) {
      return {};
    }

    const dayInMs = notiStatus.detail.day * 24 * 60 * 60 * 1000;
    const completeNotiObject = tasks.map((task) => {
      const taskDate = (
        notiStatus.detail.beforeDueDate === true ? task.dueDate : task.startDate
      ).getTime();
      return {
        id: task.id,
        datetime: new Date(taskDate - dayInMs),
      };
    });

    return completeNotiObject;
  };

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
      {modalState ? (
        // id -1 is passed as a temp id to let the modal know it's in create mode, otherwise it's in edit mode
        editTaskID == -1 ? (
          <TaskModal oldData={{ id: -1 }} editTaskCallBack={editTaskCallBack} />
        ) : (
          <TaskModal
            oldData={tasks.find((task) => task.id === editTaskID)}
            editTaskCallBack={editTaskCallBack}
          />
        )
      ) : null}

      {loading && <Spinner />}
      <div className="text-4xl font-bold mt-10 mx-10 flex items-center">
        <div className="flex flex-col">
          <span className="font-inter">
            {mode === "create"
              ? "Create"
              : mode === "edit"
              ? "Edit"
              : mode === "clone"
              ? "Clone"
              : null}{" "}
            roadmap
          </span>
          <div className="h-2">
            <hr className="h-0.5 bg-blue-600"></hr>
          </div>
        </div>
      </div>
      <div className="h-full w-full flex justify-center">
        <form onSubmit={handleSubmit} className="h-full w-4/5 max-w-4xl">
          <div className="flex my-4 justify-between">
            <input
              className="text-2xl focus:outline-none font-inter"
              type="text"
              value={RMName}
              onChange={handleNameChange}
              placeholder="UNTITLED"
              size={MAX_RMNAME_LENGTH}
            />
            <div className="flex">
              <button
                type="button"
                disabled={isPublic}
                onClick={() => setPublicModal(true)}
                className="bg-white disabled:bg-blue-100 h-10 w-28 text-md p-2 font-bold rounded-l-full border border-black font-nunito-sans"
              >
                Public
              </button>
              <button
                type="button"
                disabled={!isPublic}
                onClick={() => setPublicModal(true)}
                className="h-10 w-28 bg-white disabled:bg-blue-100 text-md p-2 font-bold rounded-r-full border-black border-y border-r font-nunito-sans"
              >
                Private
              </button>
            </div>
          </div>

          <label className="text-xl font-bold font-nunito-sans">
            Roadmap Description:{" "}
          </label>
          <div className="my-3">
            <textarea
              className="border rounded-lg border-gray-400 block text-xl p-1 w-full focus:outline-none shadow-lg font-nunito-sans"
              rows="4"
              cols="60"
              value={RMDesc}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>

          <div className="h-1/2">
            {/* Notification Setting */}

            <div className="relative">
              <DropDownMenu
                optionValues={notificationOption.optionValues}
                options={notificationOption.options}
                currentOption={notiStatus}
                setOption={setNotiStatus}
                optionComparer={compareNotificationChange}
                Icon={notiStatus.on === true ? NotiOn : NotiOff}
                className="absolute z-10 right-6 top-6"
              />
              {/* <select
                value={JSON.stringify(notiStatus)}
                onChange={handleNotiSettingChange}
                className="absolute z-10 right-4 top-4"
              >
                <option
                  value={JSON.stringify({ on: false })}
                  key={"Nonoti"}
                  className="font-nunito-sans"
                >
                  No notification
                </option>
                List of all notification option 
                {notificationDayOption.map((day) => {
                  return [true, false].map((beforeDueDate) => {
                    return (
                      <option
                        className="font-nunito-sans"
                        value={JSON.stringify({
                          on: true,
                          detail: {
                            day: day,
                            beforeDueDate: beforeDueDate,
                          },
                        })}
                        key={JSON.stringify({
                          detail: {
                            day: day,
                            beforeDueDate: beforeDueDate,
                          },
                        })}
                      >
                        {`${day} days before ${
                          beforeDueDate ? "due" : "start"
                        } date`}
                      </option>
                    );
                  });
                })}
              </select>  */}
            </div>
            {/* End of Notification Setting */}
            {/* Giant task box */}
            <div className="flex overflow-x-auto flex-col justify-center bg-blue-100 my-4 border-2 shadow-xl border-gray-300 rounded-3xl items-start h-2/3 p-4 pl-8 pr-16 relative max-w-full w-full z-0">
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
                          return task.isDone ? (
                            <TaskItem
                              task={task}
                              key={task.id}
                              setEditTaskID={setEditTaskID}
                              setModalState={setModalState}
                            />
                          ) : (
                            <Draggable
                              key={task.id}
                              draggableId={task.id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="flex items-center"
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <TaskItem
                                    task={task}
                                    setEditTaskID={setEditTaskID}
                                    setModalState={setModalState}
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
                      <div className="">
                        <button
                          type="button"
                          disabled={isAddButtonDisabled()}
                          onClick={initializeTaskCreator}
                        >
                          <AddButton className="h-10 w-auto" />
                        </button>
                      </div>
                    </div>
                  )}
                </StrictModeDroppable>
              </DragDropContext>
            </div>
            {/* End of Task box */}

            <div className="relative">
              <div className="absolute right-0">
                <button
                  className="bg-transparent border-nav-blue font-bold text-nav-blue w-32 h-10 rounded-full border-2 mr-2 font-nunito-sans"
                  type="button"
                  onClick={handleDiscard}
                >
                  Discard
                </button>
                <button
                  className="rounded-full w-32 h-10 bg-nav-blue font-bold text-white font-nunito-sans"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RoadmapCreatePage;
