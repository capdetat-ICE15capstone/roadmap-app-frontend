import React, { useRef, useState, useEffect } from "react";
import TaskModal  from "../components/TaskModal";

const RoadmapCreatePage = () => {
  const [RMName, setRMName] = useState("");
  const [RMDesc, setRMDesc] = useState("")
  const [tasks, setTasks] = useState([])
  const [modalState, setModalState] = useState(false)

  useEffect(() => {
    console.log(tasks)
  }, [tasks])
  
  const editTaskCallBack = (success, submissionObject) => {
    // need more logic as describe in the sheet

    setModalState(false);
    setTasks([...tasks, { // these 4 lines can be used for adding task, not edit
      name: submissionObject.name,
      description: submissionObject.description
    }])
  }

  const onPressingSaveButton = (e) => {
    e.preventDefault(); // stop the page from reloading when submitting the form, may remove in the future
    console.log({ // used for sprint 1
      name: RMName,
      description: RMDesc
    });
    console.log(tasks)
  };

  return (
    <>
      <div>
        <div className="text-4xl font-inter font-bold ml-10 mt-10">
          Create your roadmap
        </div>
        <form onSubmit={onPressingSaveButton}>
          <div>
            <label>Name: </label>
            <input
              className="border-4 border-emerald-400 rounded-md text-4xl"
              type="text"
              value={RMName}
              onChange={e => setRMName(e.target.value)}
            />
          </div>

          <label>Description: </label>
          <textarea
            className="border ml-2 border-emerald-400 block text-2xl"
            rows={10}
            cols={60}
            value={RMDesc}
            onChange={e => setRMDesc(e.target.value)}
          ></textarea>
          <button className="rounded-xl bg-emerald-400 text-white font-bold hover:bg-yellow-300 transition duration-200 w-20 h-10 fixed right-2 bottom-2">
            Save
          </button>
        </form>

        <div className="flex">
          <p className="text-4xl font-inter font-bold m-10 break-word w-32 inline-block">
            {RMName === "" ? "Roadmap Name" : RMName}
          </p>
          {
          tasks.map((task) => {
            return (
              <>
                <hr className="block self-center w-10 border-blue-800 border-2" key={task.id + "hr"}></hr>
                <button key={task.id} className="bg-emerald-500 hover:bg-yellow-500 p-2 m-3 h-10 w-10 self-center rounded-full transtition duration-200 text-white font-bold"> {task.id} </button>
              </>
          )})
        }
          <hr className="block self-center w-10 border-blue-800 border-2 hover:border-yellow-500"></hr>
          <button className="bg-emerald-500 hover:bg-yellow-500 p-2 m-2 h-10 w-16 self-center rounded-md text-white font-bold" onClick={() => setModalState(true)}>Add</button>
        </div>
        {
          // currently the mode and olddata attr is hard coded
          // both should be changed to correspond to the correct node type (new node or edit old node)
          modalState ? <TaskModal mode="create" oldData={{}} editTaskCallBack={editTaskCallBack}/> : null
        }
      </div>
    </>
  );
};

export default RoadmapCreatePage;
