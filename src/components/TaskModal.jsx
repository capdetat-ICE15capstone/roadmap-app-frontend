import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as AddButton } from "../assets/addButton.svg"

const TaskModal = ({ mode, oldData, editTaskCallBack }) => {
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const [subtasks, setSubTasks] = useState([])
  // subtask: name

  const placeHolderFunction = (someText = "world") => {
    console.log(`Hello, ${someText}`);
  };

  const addSubTask = (event) => {
    event.preventDefault();
    setSubTasks([...subtasks,
      {}
    ])
  }

  return (
    <>
      <form>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-2/3 my-6 mx-auto xl:w-1/2">
            {/*content*/}
            <div className="border-2 border-black rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-sm bg-black">
                <h3 className="text-3xl font-semibold text-white">
                  Create task
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => editTaskCallBack("failed", {})}
                >
                  {" "}
                  x
                </button>
              </div>
              {/*body*/}
              <div className="m-4">
                <div className="flex flex-col lg:flex-row">
                  <div className="flex flex-col w-full lg:w-1/2">
                    <label>Name</label>
                    <input
                      type="text"
                      className="border-2 border-black rounded-md m-2 grow"
                      placeholder=" Enter task name..."
                    ></input>
                    <label>Description</label>
                    <input
                      type="text"
                      className="border-2 border-black rounded-md m-2 grow"
                      placeholder=" Enter description..."
                    ></input>
                    <div className="w-full flex">
                      <label className="self-center">Start</label>
                      <input // have shrink problem
                        type="textbox"
                        className="border-2 border-black rounded-md m-2 justify-self-end grow"
                      ></input>
                    </div>
                    <div className="w-full flex">
                      <label className="self-center">Due</label>
                      <input // have shrink problem
                        type="text"
                        className="border-2 border-black rounded-md m-2 justify-self-end grow shrink"
                      ></input>
                    </div>
                    <label>Add Subtask</label>
                    {
                      subtasks.map((subtask) => {
                        return (
                          <div className="flex">
                            <input type="checkbox">{subtask.name}</input>
                            <input type="text" className="border-2 border-black rounded-md m-2 grow"></input>
                          </div>
                        )
                      })
                    }
                    <button onClick={addSubTask}>
                      <AddButton className="w-10 h-auto"/>
                    </button>
                  </div>
                  <div className="flex flex-col w-full lg:w-1/2">hello world 2</div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => editTaskCallBack("failed", [])}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => editTaskCallBack("failed", [])}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </form>
    </>
  );
};

TaskModal.propTypes = {
  mode: PropTypes.string.isRequired,
  oldData: PropTypes.object,
  editTaskCallBack: PropTypes.func,
};

export default TaskModal;
