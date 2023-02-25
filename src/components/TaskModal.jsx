import React, { useEffect, useRef, useState } from "react";
import PropTypes, { node } from "prop-types";
import { ReactComponent as AddButton } from "../assets/addButton.svg";
import { ReactComponent as DeleteButton } from "../assets/deleteButton.svg";
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

const CustomSVG = ({height=42, width=42, radius=20, stroke="black", strokeWidth=1, className="", type="circle"}) => {
  let cx = Math.floor(width/2);
  let cy = Math.floor(height/2);
  return (
    <svg height={height} width={width} className={className}>
      {
        type === "circle" ? <circle cx={cx} cy={cy} r={radius} stroke={stroke} stroke-width={strokeWidth} /> : null
      }
      {
        type === "square" ? <rect height={height} width={width} className={className}/> : null
      }
      {
        type === "triangle" ? <polygon points={`${cx},0 ${width},${height-strokeWidth} 0,${height-strokeWidth}`} className={className}/> : null
      }
    </svg>
  )
}

const allNodeShape = ["circle", "square", "triangle"]

const allNodeColor = [
  {name: "Gray", twprop: "fill-gray-400", twtext: "text-gray-400", twbg: "bg-gray-400"}, 
  {name: "Red", twprop: "fill-red-400", twtext: "text-red-400", twbg: "bg-red-400"}, 
  {name: "Orange", twprop: "fill-orange-400", twtext: "text-orange-400", twbg: "bg-orange-400"}, 
  {name: "Yellow", twprop: "fill-yellow-400", twtext: "text-yellow-400", twbg: "bg-yellow-400"}, 
  {name: "Green", twprop: "fill-green-400", twtext: "text-green-400", twbg: "bg-green-400"}, 
  {name: "Cyan", twprop: "fill-cyan-400", twtext: "text-cyan-400", twbg: "bg-cyan-400"}, 
  {name: "Blue", twprop: "fill-blue-400", twtext: "text-blue-400", twbg: "bg-blue-400"}, 
  {name: "Violet", twprop: "fill-violet-400", twtext: "text-violet-400", twbg: "bg-violet-400"}, 
  {name: "Pink", twprop: "fill-pink-400", twtext: "text-pink-400", twbg: "bg-pink-400"}, 
]

const TaskModal = ({ mode, oldData, editTaskCallBack }) => {
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const [lastId, setLastId] = useState(0); // DO NOT use these parameter directly, use getID to get an id instead
  const [subtasks, setSubTasks] = useState([]);
  const [nodeColor, setNodeColor] = useState(allNodeColor[0])
  const [nodeShape, setNodeShape] = useState("circle")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  
  // subtask (obj): id, detail, status
  // subtasks (obj[])

  const getId = () => {
    // IMPORTANT: only use this function to get an ID
    // return an ID and increment so that the id can never repeat
    const id = lastId;
    setLastId(id + 1);
    return id;
  };

  const handleNodeColorChange = (event) => {
    console.log(event.target.value)
    setNodeColor(allNodeColor.find(({name}) => name === event.target.value))
  }

  const addSubTask = (event) => {
    event.preventDefault();
    setSubTasks([
      ...subtasks,
      {
        id: getId(),
        detail: "",
        status: false,
      },
    ]);
  };

  const deleteSubTask = (event, id) => {
    event.preventDefault();
    setSubTasks((subtasks) => subtasks.filter((subtask) => subtask.id !== id));
  };

  const onSubtaskTextEdit = (newValue, id) => {
    setSubTasks(
      subtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, detail: newValue } : { ...subtask }
      )
    );
  };

  const onSubTaskCheckboxChange = (newValue, id) => {
    setSubTasks(
      subtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, status: newValue } : { ...subtask }
      )
    );
  };

  return (
    <>
      <form>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-11/12 md:w-5/6 my-6 mx-auto xl:w-2/3 2xl:w-1/2 max-h-full">
            {/*content*/}
            <div className=" rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className={`flex items-start justify-between py-8 px-5 border-b border-solid border-slate-200 rounded-t-2xl ${nodeColor.twbg}`}>
                <h3 className="text-3xl font-semibold text-white">
                  Create task
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => editTaskCallBack("failed", {})}
                >
                  {" "}
                  x
                </button>
              </div>
              {/*body*/}
              <div className="m-4 overflow-auto">
                <div className="flex flex-col lg:flex-row gap-2">
                  <div className="flex flex-col w-full lg:w-1/2">
                    <label>Name</label>
                    <input
                      type="text"
                      className="border-2 border-black rounded-md m-2 placeholder:italic"
                      placeholder=" Enter task name..."
                      ref={nameRef}
                    ></input>
                    <label>Description</label>
                    <input
                      type="textbox"
                      className="border-2 border-black rounded-md m-2 grow placeholder:italic placeholder:justify-start h-24"
                      placeholder=" Enter description..."
                      ref={descriptionRef}
                    ></input>
                    <div className="w-full flex">
                      <label className="self-center">Start</label>
                      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="border-2 border-black rounded-md m-2 justify-self-end grow shrink"></DatePicker>
                      {/* <input // have shrink problem
                        type="textbox"
                        className="border-2 border-black rounded-md m-2 justify-self-end grow"
                      ></input> */}
                    </div>
                    <div className="w-full flex">
                      <label className="self-center">Due</label>
                      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="border-2 border-black rounded-md m-2 justify-self-end grow shrink"></DatePicker>
                      {/* <input // have shrink problem
                        type="text"
                        className="border-2 border-black rounded-md m-2 justify-self-end grow shrink"
                      ></input> */}
                    </div>
                    <div className="">
                    <label>Nodes</label>
                      <div className="flex flex-1 gap-x-1">
                        <div className="bg-gray-100 basis-1/2 rounded-lg p-4 flex gap-2">
                          <CustomSVG className={`${nodeColor.twprop}`}></CustomSVG>
                          <select value={nodeColor.name} onChange={handleNodeColorChange} className={`${nodeColor.twtext} font-bold grow self-center border border-black rounded-lg `}>
                            {
                              allNodeColor.map((colorObj) => (
                                <option value={colorObj.name} className={`${colorObj.twtext} font-bold`}>
                                  {colorObj.name}
                                </option>
                              ))
                            }
                          </select>
                        </div>
                        <div className="bg-gray-100 basis-1/2 rounded-lg flex p-2 gap-2 content-center justify-center">
                          <CustomSVG className={`${nodeColor.twprop} ${nodeShape === "circle" ? "stroke-black stroke-2": ""} self-center`}></CustomSVG>
                          <CustomSVG className={`${nodeColor.twprop} ${nodeShape === "square" ? "stroke-black stroke-2": ""} self-center`} type="square"></CustomSVG>
                          <CustomSVG className={`${nodeColor.twprop} ${nodeShape === "triangle" ? "stroke-black stroke-1 ": ""} self-center`} type="triangle"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Right side */}
                  <div className="flex flex-col w-full lg:w-1/2">
                    <div className="bg-gray-100 rounded-md p-4 flex flex-col gap-2">
                      <label className="block">Add Subtask</label>
                      {subtasks.map((subtask) => {
                        return (
                          <div className="flex gap-2" key={subtask.id}>
                            <input
                              type="checkbox"
                              className="w-4 h-4 self-center"
                              onChange={() =>
                                onSubTaskCheckboxChange(
                                  event.target.checked,
                                  subtask.id
                                )
                              }
                              value={subtask.status}
                            ></input>
                            <button
                              onClick={() => deleteSubTask(event, subtask.id)}
                              className="w-8 h-8 self-center"
                            >
                              <DeleteButton className="w-8 h-8 self-center mt-1" />
                            </button>
                            <input
                              type="text"
                              className="border-2 border-black rounded-md grow"
                              onChange={() =>
                                onSubtaskTextEdit(
                                  event.target.value,
                                  subtask.id
                                )
                              }
                              value={subtask.detail}
                            ></input>
                          </div>
                        );
                      })}
                      <div className="flex gap-4">
                        <button onClick={addSubTask} disabled={subtasks.length >= 8}>
                          <AddButton className={`ml-2 w-8 h-auto ${subtasks.length >= 8 ? "opacity-30" : "opacity-100"}`}/>
                        </button>
                        {
                          subtasks.length >= 8 ? <p className="font-bold text-red-700">Limited to 8 subtasks</p> : null
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6  rounded-b gap-3">
                <button
                  className="bg-blue-400 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() =>
                    editTaskCallBack("success", {
                      // This code may or may not be permanent, but definitely usable for testing
                      name: nameRef.current.value,
                      description: descriptionRef.current.value,
                    })
                  }
                >
                  Save
                </button>
                <button
                  className="text-black border border-black rounded-md background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => editTaskCallBack("failed", {})}
                >
                  Close
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
