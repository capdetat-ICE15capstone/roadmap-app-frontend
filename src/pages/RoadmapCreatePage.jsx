import React, { useState, useEffect } from "react";
import TaskModal from "../components/TaskModal";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";

const RoadmapCreatePage = () => {
  const [RMName, setRMName] = useState("");
  const [RMDesc, setRMDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editTaskID, setEditTaskID] = useState(0);
  const [lastId, setLastId] = useState(0);
  const [isPublic, setPublic] = useState(true)
  const publicButtonStyle = "";

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const getID = () => {
    const id = lastId;
    setLastId(id + 1);
    return id;
  };

  const editTaskCallBack = (status, submissionObject) => {
    // need more logic as describe in the sheet
    // status === "success" ? console.log("editTaskCallBack: true"): console.log("editTaskCallBack: false")
    // console.log("Submitted object");
    // console.log(submissionObject);
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

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from reloading when submitting the form, may remove in the future
    console.log({
      // used for sprint 1
      name: RMName,
      description: RMDesc,
      tasks: tasks,
      publicity: isPublic
    });

    // schedule notification
    // Begin the spinner
    // Add a fetch POST request here
    // Stop the spinner after the promise of Fetch() has resolved

    navigate("/"); // forward to view roadmap page, unsure how to navigate this though cuz this is stateless navigate
    console.log(tasks);
  };

  return (
    <>
      <div>
        <div className="text-4xl font-inter font-bold mt-10 flex items-center">
          <span className="m-4">Create your roadmap</span>
          <button type="button" onClick={() => setPublic(!isPublic)} className="rounded-md bg-gray-500 h-10 text-sm p-2">{isPublic ? "Make private" : "Make public"}</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input
              className="border-4 border-emerald-400 rounded-md text-4xl"
              type="text"
              value={RMName}
              onChange={(e) => setRMName(e.target.value)}
            />
          </div>
          

          <label>Description: </label>
          <textarea
            className="border ml-2 border-emerald-400 block text-2xl"
            rows={10}
            cols={60}
            value={RMDesc}
            onChange={(e) => setRMDesc(e.target.value)}
          ></textarea>
          <button
            className="rounded-xl bg-emerald-400 text-white font-bold hover:bg-yellow-300 transition duration-200 w-20 h-10 fixed right-2 bottom-2"
            type="submit"
          >
            Save
          </button>
        </form>

        <div className="flex">
          {/* <p className="text-4xl font-inter font-bold m-10 break-word w-32 inline-block">
            {RMName === "" ? "Roadmap Name" : RMName}
          </p> */}
          {tasks.map((task) => {
            return (
              <div key={task.id} className="flex">
                <button
                  className="bg-emerald-500 hover:bg-yellow-500 p-2 m-3 h-10 w-10 self-center rounded-full transtition duration-200 text-white font-bold"
                  type="button"
                  onClick={async () => {
                    await setEditTaskID(task.id);
                    await setModalState(true);
                  }}
                >
                  {" "}
                  {task.id}{" "}
                </button>
                <hr
                  className="block self-center w-10 border-blue-800 border-2"
                  key={task.id + "hr"}
                ></hr>
              </div>
            );
          })}
          {/* <hr className="block self-center w-10 border-blue-800 border-2 hover:border-yellow-500"></hr> */}
          <button
            className="bg-emerald-500 hover:bg-yellow-500 p-2 m-2 h-10 w-16 self-center rounded-md text-white font-bold"
            type="button"
            onClick={() => {
              setModalState(true);
              setEditTaskID(-1);
            }}
          >
            Add
          </button>
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
