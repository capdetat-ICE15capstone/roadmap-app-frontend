import React, { useState, useEffect, createRef, useRef } from "react";
import TaskModal from "../components/TaskModal";
import { useLocation, useNavigate, useParams } from "react-router";
import { getRoadmap, createRoadmap } from "../functions/roadmapFunction.jsx";
import Spinner from "../components/Spinner";
import { isUserPremium } from "../functions/userFunction";
import { CustomSVG, getTWFill } from "../components/CustomSVG";
import { ReactComponent as AddButton } from "../assets/addButton.svg";
import { ReactComponent as NotiOff } from "../assets/notification/notiOff.svg";
import { ReactComponent as NotiOn } from "../assets/notification/notiOn.svg";

// TODO: put a null check around getRoadmap and createRoadmap pls
// BUG: word under nodes overflowing if it's one long word
// BUG: styling for the node is a mess with the name
// BUG: spinner does not stop spinning in error

const MAX_TASKS_NONPREMIUM = 5;
const MAX_RMNAME_LENGTH = 100;
const MAX_RMDESCRIPTION_LENGTH = 255;

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
  const [isNotiOn, setNoti] = useState(true);
  const [edges, setEdges] = useState([]); 
  // [{from: {rid: string, x: number, y: number}, to: {rid: string, x: number, y: number}}]
  const [tasksRef, setTasksRef] = useState([]);
  // [{rid: string, ref: Ref}]

  useEffect(() => {
    // This run once when the page load
    setUpRoadmap();
  }, []);

  useEffect(() => {
    console.log(tasksRef);;
  }, [tasksRef])

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
          alert("GET error"); // this ran twice
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
    // including the active to false and checkbox to unchecked
    setTasks((tasks) =>
      tasks.map((task) => {
        task.active = false;
        return task;
      })
    );
  };

  const addRef = (id, preref) => {
    if (tasksRef.findIndex(tRef => tRef.id === id) === -1 && preref) {
      setTasksRef((tasksRef) => [...tasksRef, {id: id, ref: preref}])
    }
  }

  const setPointerRelation = () => {
    // this function calculate the edges state
    for (let i = 0; i < tasks.length-1; i++) {

    }
  }

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
            // TODO: set relation
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
        )
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
    // stop the page from reloading when submitting the form, may remove in the future
    e.preventDefault();
    console.log({
      // used for sprint 1
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
    // Stop the spinner after the promise of Fetch() has resolved

    // forward to view roadmap page, unsure how to navigate this though cuz this is stateless navigate
    navigate("/");
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
        <form onSubmit={handleSubmit} className="h-full">
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
              className="border-2 rounded-md border-gray-400 block text-2xl w-full bg-gray-200 focus:outline-none"
              rows="4"
              cols="60"
              value={RMDesc}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>

          <div className="h-1/2">
            <div className="flex flex-col bg-blue-100 my-4 border-4 border-gray-300 rounded-lg items-start h-2/3 p-4 overflow-auto">
              <div className="flex items-center flex-wrap gap-4">
                {tasks.map((task, i) => {
                  return (
                    <div key={task.id} className="flex" >
                      <div className="flex" >
                        <div className="flex flex-col gap-2 items-center" >
                          <button
                            className=""
                            type="button"
                            ref={(el) => addRef(task.id, el)}
                            disabled={task.active}
                            onClick={async () => {
                              await setEditTaskID(task.id); // awaiting a setState does not work lol
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
                            <span className="block font-bold mx-auto text-center leading-5 text-ellipsis truncate">
                              {task.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div>
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

        {modalState ? ( // id -1 is passed as a temp id to let the modal know it's in create mode, otherwise it's in edit mode
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
      <button onClick={() => console.log(tasksRef.current)}>check ref</button>
    </>
  );
};

export default RoadmapCreatePage;
