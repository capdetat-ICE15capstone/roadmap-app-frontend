import React, { useState, useEffect } from "react";
import TaskModal from "../components/TaskModal";
import { useLocation, useNavigate, useParams } from "react-router";
import { getRoadmap, createRoadmap } from "../functions/roadmapFunction.jsx";
import Spinner from "../components/Spinner";
import { isUserPremium } from "../functions/userFunction";

// TODO: put a null check around getRoadmap and createRoadmap pls
// BUG: get error alert run twice
// BUG: word under nodes overflowing if it's one long word

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

  useEffect(() => {
    // This run once when the page load
    setUpRoadmap();
  }, []);

  const getID = () => {
    const x = lastId;
    setLastId(x + 1);
    return x;
  };

  const setUpRoadmap = async () => {
    // use to load roadmap into edit or clone page
    if (mode === "edit" || mode === "clone") {
      if (state !== null && state !== undefined) {
        // check if state is available
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
    // in clone mode, reset all the progress of the roadmap, including the active to false and checkbox to unchecked
    setTasks((tasks) =>
      tasks.map((task) => {
        task.active = false;
        return task;
      })
    );
  };

  const editTaskCallBack = (status, submissionObject) => {
    switch (status) {
      case "success":
        switch (submissionObject.id) {
          case -1:
            submissionObject.id = getID();
            setTasks([...tasks, submissionObject]);
            break;
          default:
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
        console.log("failed");
        break;
      case "delete":
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
    e.preventDefault(); // stop the page from reloading when submitting the form, may remove in the future
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

    navigate("/"); // forward to view roadmap page, unsure how to navigate this though cuz this is stateless navigate
  };

  return (
    <>
      {loading && <Spinner />}
      <div className="px-4">
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
        <form onSubmit={handleSubmit}>
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
        </form>

        <div className="flex flex-col bg-blue-100 my-4 border-4 border-gray-300 rounded-lg items-start h-2/3 p-4">
          {/* <p className="text-4xl font-inter font-bold m-10 break-word w-32 inline-block">
            {RMName === "" ? "Roadmap Name" : RMName}
          </p> */}

          <div className="flex items-center flex-wrap">
            {tasks.map((task) => {
              return (
                <div key={task.id} className="flex">
                  <div className="relative items-center">
                    <button
                      className={`p-2 m-3 h-16 w-16 self-center rounded-full transtition duration-200 text-white font-bold ${
                        task.active
                          ? "bg-gray-500"
                          : "bg-emerald-500 hover:bg-yellow-500 "
                      }`}
                      type="button"
                      disabled={task.active}
                      onClick={async () => {
                        await setEditTaskID(task.id); // awaiting a setState does not work lol
                        await setModalState(true);
                      }}
                    >
                      {" "}
                      {task.id}{" "}
                    </button>
                    <div className="w-full">
                      <span className="font-bold absolute mx-auto translate-x-1/2 right-1/2 text-center leading-5 text-ellipsis">{task.name}</span>
                    </div>
                  </div>
                  <hr
                    className="block self-center w-10 border-blue-800 border-2"
                    key={task.id + "hr"}
                  ></hr>
                </div>
              );
            })}
            <div>
              <button
                className="bg-blue-700 disabled:bg-gray-500 p-2 m-2 h-10 w-10 self-center rounded-full text-white font-bold"
                type="button"
                disabled={isAddButtonDisabled()}
                onClick={initializeTaskCreator}
              >
                +
              </button>
            </div>
          </div>

          {/* <hr className="block self-center w-10 border-blue-800 border-2 hover:border-yellow-500"></hr> */}
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
    </>
  );
};

export default RoadmapCreatePage;
