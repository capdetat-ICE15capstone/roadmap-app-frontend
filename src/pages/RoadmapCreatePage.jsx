import React, { useState, useEffect, createRef, useRef } from "react";
import TaskModal from "../components/TaskModal";
import { useLocation, useNavigate, useParams } from "react-router";
import { getRoadmap, createRoadmap } from "../functions/roadmapFunction.jsx";
import Spinner from "../components/Spinner";
import { isUserPremium } from "../functions/userFunction";
import { CustomSVG, getTWFill } from "../components/CustomSVG";
import { ReactComponent as AddButton } from "../assets/addButton.svg";
import { motion } from "framer-motion";
import { ReactComponent as NotiOff } from "../assets/notification/notiOff.svg";
import { ReactComponent as NotiOn } from "../assets/notification/notiOn.svg";

// TODO: put a null check around getRoadmap and createRoadmap pls
// BUG: spinner does not stop spinning in error
// TODO: draw line between button
// TODO: notification setting
// TODO: more styling
// TODO: confirm prompt
// TODO: zigzag div

const MAX_TASKS_NONPREMIUM = 16;
const MAX_RMNAME_LENGTH = 100;
const MAX_RMDESCRIPTION_LENGTH = 255;

const usePreviousState = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const notificationDayOption = [1, 3, 5, 7, 14];

const RoadmapCreatePage = (props) => {
  const { mode } = props; // props from parent
  const { state } = useLocation(); // state from previous page, including fetched roadmap data
  const { id } = useParams(); // param from react router placeholder (/edit/:id)
  const [RMName, setRMName] = useState("");
  const [RMDesc, setRMDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editTaskID, setEditTaskID] = useState(0);
  const [lastId, setLastId] = useState(0);
  const [isPublic, setPublic] = useState(true);
  const [edges, setEdges] = useState([]);
  // [{from: rid1, to: rid2}]
  const [tasksRef, setTasksRef] = useState([]);
  // [{rid: string, ref: Ref}]
  const previousValue = usePreviousState(tasksRef);
  const [notiStatus, setNotiStatus] = useState({ on: false });
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // This run once when the page load
    setUpRoadmap();
  }, []);

  useEffect(() => {
    addEdges();
  }, [tasksRef]);

  useEffect(() => {
    // this code is excessive
    // use to call a functiob when the user did not
    // update RMDesc for 1500 ms
    const timeoutID = setTimeout(() => {
      console.log(RMDesc);
      searchTags();
    }, 1500);

    return () => clearTimeout(timeoutID);
  }, [RMDesc]);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const getID = () => {
    const x = lastId;
    setLastId(x + 1);
    return x;
  };

  const setUpRoadmap = async () => {
    // use to load roadmap pageinto edit or clone page
    if (mode === "edit" || mode === "clone") {
      // check if state is available
      if (state !== null && state !== undefined) {
        // set up the data to variable
        setRMName(state.roadmap.name);
        setRMDesc(state.roadmap.description);
        setTasks(state.roadmap.tasks);
        setPublic(state.roadmap.publicity);
        let highestID = 0;
        state.roadmap.tasks.forEach((task) => {
          if (task.id > highestID) {
            highestID = task.id;
          }
        });
        setLastId((lastId) => highestID + 1);
      } else {
        // fetch the roadmap data
        // then set the data to variable
        setLoading(true);
        const tempRoadmap = await getRoadmap(id);
        if (tempRoadmap !== null) {
          setRMName(tempRoadmap.name);
          setRMDesc(tempRoadmap.description);
          setTasks(tempRoadmap.tasks);
          setPublic(tempRoadmap.publicity);
          let highestID = 0;
          tempRoadmap.tasks.forEach((task) => {
            if (task.id > highestID) {
              highestID = task.id;
            }
          });
          setLastId((lastId) => highestID + 1);
        } else {
          alert("GET error");
          navigate("/");
        }
        setLoading(false);
      }
    }

    if (mode === "clone") {
      setupCloneMode();
    }
  };

  const setupCloneMode = () => {
    // in clone mode, reset all the progress of the roadmap,
    // including the isDone to false and checkbox to unchecked
    setTasks((tasks) =>
      tasks.map((task) => {
        task.isDone = false;
        return task;
      })
    );
  };

  const searchTags = () => {
    const allWords = RMDesc.split(" ");
    let allTags = [];
    allWords.forEach((word) => {
      if (word.charAt(0) === "#") {
        allTags.push(word);
      }
    });

    setTags(allTags);
  };

  const addRef = (id, preref) => {
    // add ref from all the tasks node into a container array
    if (tasksRef.findIndex((tRef) => tRef.id === id) === -1 && preref) {
      setTasksRef((tasksRef) => [...tasksRef, { id: id, ref: preref }]);
    }
  };

  const addEdges = () => {
    // add edges object when new task is created
    if (tasksRef.length <= 1) {
      return;
    }
    const lastTwo = tasks.slice(-2);
    // setEdges(edges => [...edges, {from: tasksRef.find((r) => r.id === lastTwo[0].id).ref , to: tasksRef.find((r) => r.id === lastTwo[1].id).ref}])
    // setEdges([...edges, { from: lastTwo[0].id, to: lastTwo[1].id }]);
    const firstPos = tasksRef.find((r) => r.id === lastTwo[0].id).ref;
    const secondPos = tasksRef.find((r) => r.id === lastTwo[1].id).ref;
    setEdges([
      ...edges,
      {
        from: {
          id: lastTwo[0].id,
          x: firstPos.offsetLeft,
          y: firstPos.offsetTop,
        },
        to: {
          id: lastTwo[1].id,
          x: secondPos.offsetLeft,
          y: secondPos.offsetTop,
        },
      },
    ]);
    // setEdges([...edges, {from: lastTwo[]}])
  };

  const editEdges = () => {
    // find the tasks that switch location or was deleted and recalculate the edges
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
            console.log("editing");
            setTasks(
              tasks.map((task) =>
                task.id === submissionObject.id ? submissionObject : task
              )
            );
            break;
        }
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
        setTasksRef((tasksref) =>
          tasksref.filter((tRef) => tRef.id !== submissionObject.id)
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
    return !isUserPremium() && tasks.length >= MAX_TASKS_NONPREMIUM;
  };

  const handleNameChange = (event) => {
    if (RMName.length < MAX_RMNAME_LENGTH) {
      setRMName((n) => event.target.value);
    }
  };

  const handleDescriptionChange = (event) => {
    if (RMDesc.length < MAX_RMDESCRIPTION_LENGTH) {
      setRMDesc((d) => event.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      name: RMName,
      description: RMDesc,
      tasks: tasks,
      publicity: isPublic,
    });

    // Begin the spinner
    setLoading(true);

    // schedule notification

    // Add a fetch POST request here
    if (mode === "create") {
      console.log("create function called");
      if (
        (await createRoadmap({
          name: RMName,
          description: RMDesc,
          tasks: tasks,
          publicity: isPublic,
        })) === null
      ) {
        alert("CREATE error");
      }
    } else {
      // for edit or clone mode
    }

    setLoading(false);
    navigate("/");
  };

  const handleNotiSettingChange = (event) => {
    console.log(JSON.parse(event.target.value));
    setNotiStatus(JSON.parse(event.target.value));
  };

  const generateNotificationObjects = () => {
    // generate array of noti object to be sent to the server
  };

  return (
    <>
      {loading && <Spinner />}
      <div className="px-4 h-full">
        <div className="text-4xl font-inter font-bold mt-10 flex items-center">
          <span>
            {mode === "create"
              ? "Create"
              : mode === "edit"
              ? "Edit"
              : mode === "clone"
              ? "Clone"
              : null}{" "}
            roadmap
          </span>
        </div>
        {/* <hr className="border-2 border-black"></hr> */}
        <form onSubmit={handleSubmit} className="h-full w-full max-w-full">
          <div className="flex mt-4">
            <input
              className="text-2xl focus:outline-none"
              type="text"
              value={RMName}
              onChange={handleNameChange}
              placeholder="UNTITLED"
            />
            <button
              type="button"
              disabled={isPublic}
              onClick={() => setPublic(true)}
              className="bg-white disabled:bg-gray-500 h-10 w-20 text-md p-2 font-bold rounded-l-lg border border-black"
            >
              Public
            </button>
            <button
              type="button"
              disabled={!isPublic}
              onClick={() => setPublic(false)}
              className="h-10 w-20 bg-white disabled:bg-gray-500 text-md p-2 font-bold rounded-r-lg border-black border-y border-r"
            >
              Private
            </button>
          </div>

          <label className="text-xl font-bold">Roadmap Description: </label>
          <div className="my-3">
            <textarea
              className="border rounded-lg border-gray-400 block text-xl p-1 w-full focus:outline-none shadow-lg"
              rows="4"
              cols="60"
              value={RMDesc}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>

          <div className="h-1/2">
          <div className="relative">
                <select
                  value={JSON.stringify(notiStatus)}
                  onChange={handleNotiSettingChange}
                  className="absolute z-10 right-4 top-4"
                >
                  <option value={JSON.stringify({ on: false })}>
                    No notification
                  </option>
                  {notificationDayOption.map((day) => {
                    return (
                      <>
                        <option
                          value={JSON.stringify({
                            on: true,
                            detail: { day: day, beforeDueDate: true },
                          })}
                          key={day * 2}
                        >
                          {`${day} days before due date`}
                        </option>

                        <option
                          value={JSON.stringify({
                            on: true,
                            detail: { day: day, beforeDueDate: false },
                          })}
                        >
                          {`${day} days before start date`}
                        </option>
                      </>
                    );
                  })}
                </select>
                </div>
            <div className="flex flex-col justify-center bg-blue-100 my-4 border-2 shadow-xl border-gray-300 rounded-3xl items-start h-2/3 p-4 pr-16 relative max-w-full w-full overflow-auto">
              <div className="flex items-center">
                {tasks.map((task) => {
                  return (
                    <>
                      <div
                        key={task.id}
                        className="flex"
                        ref={(el) => addRef(task.id, el)}
                      >
                        <div className="flex">
                          <div className="flex flex-col gap-2 items-center">
                            <button
                              className=""
                              type="button"
                              disabled={task.isDone}
                              onClick={async () => {
                                // awaiting a setState does not work lol
                                await setEditTaskID(task.id);
                                await setModalState(true);
                              }}
                            >
                              <CustomSVG
                                type={task.nodeShape}
                                className={`${getTWFill(task.nodeColor)}`}
                                size={60}
                              />
                            </button>
                            <div className="w-full">
                              <span className="block font-bold mx-auto text-center leading-5">
                                {task.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h-full flex items-center">
                        <hr className="bg-black h-1 w-20"></hr>
                      </div>
                    </>
                  );
                })}
                <div className="">
                  <button
                    // className="bg-blue-700 disabled:bg-gray-500 p-2 m-2 h-10 w-10 self-center rounded-full text-white font-bold text-2xl"
                    type="button"
                    disabled={isAddButtonDisabled()}
                    onClick={initializeTaskCreator}
                  >
                    <AddButton className="h-10 w-auto" />
                  </button>
                </div>
                
              </div>
              
            </div>
            <div className="relative">
              <div className="absolute right-0">
                <button
                  className="bg-transparent border-blue-700 font-bold text-blue-700 w-20 h-10 rounded-md border-2 mr-2"
                  type="button"
                >
                  Discard
                </button>
                <button
                  className="rounded-md w-20 h-10 bg-blue-700 font-bold text-white"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>

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
      </div>
    </>
  );
};

export default RoadmapCreatePage;
