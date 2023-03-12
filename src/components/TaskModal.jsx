import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ReactComponent as AddButton } from "../assets/addButton.svg";
import { ReactComponent as DeleteButton } from "../assets/deleteButton.svg";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// Current issues
// 2. Data domain has yet to be enforced
// 3. CustomSVG is terribly implemented (hard code everywhere)
// 4. Styling is yet to be finalized
// 5. Input box shrink problem
// 6. Datepicker style
// 7. Modal size (the modal overflowing the screen)
// 10. Description text and placeholder starting position (text starts in the middle of the box)
// 11. Node selector overflow in small screen
// 12. Problems with some mobile devices

// Fixed isses
// 1. User can choose whatever start and due date they want, incluing in the past
// 2. (Untested) No logic to check for the lastID when the roadmap is edited instead of created
// 3. subtask scrolling
// 4. Description box size problem (box size tends to varies)
// 5. Using new Date() will also select the time for you, not only date

const CustomSVG = ({
  height = 42,
  width = 42,
  radius = 20,
  className = "",
  type = "circle",
}) => {
  let cx = Math.ceil(width / 2);
  let cy = Math.ceil(height / 2);
  return (
    <svg height={height} width={width} className={className}>
      {type === "circle" ? (
        <circle cx={cx} cy={cy} r={radius} className={className} />
      ) : null}
      {type === "square" ? (
        <rect
          height={height - 2}
          width={width - 2}
          x={1}
          y={1}
          className={className}
        />
      ) : null}
      {type === "triangle" ? (
        <polygon
          points={`${cx},2 ${width - 2},${height - 1} 2,${height - 1}`}
          className={className}
        />
      ) : null}
    </svg>
  );
};

// const allNodeShape = ["circle", "square", "triangle"]

const allNodeColor = [
  {
    name: "Gray",
    twprop: "fill-gray-400",
    twtext: "text-gray-400",
    twbg: "bg-gray-400",
  },
  {
    name: "Red",
    twprop: "fill-red-400",
    twtext: "text-red-400",
    twbg: "bg-red-400",
  },
  {
    name: "Orange",
    twprop: "fill-orange-400",
    twtext: "text-orange-400",
    twbg: "bg-orange-400",
  },
  {
    name: "Yellow",
    twprop: "fill-yellow-400",
    twtext: "text-yellow-400",
    twbg: "bg-yellow-400",
  },
  {
    name: "Green",
    twprop: "fill-green-400",
    twtext: "text-green-400",
    twbg: "bg-green-400",
  },
  {
    name: "Cyan",
    twprop: "fill-cyan-400",
    twtext: "text-cyan-400",
    twbg: "bg-cyan-400",
  },
  {
    name: "Blue",
    twprop: "fill-blue-400",
    twtext: "text-blue-400",
    twbg: "bg-blue-400",
  },
  {
    name: "Violet",
    twprop: "fill-violet-400",
    twtext: "text-violet-400",
    twbg: "bg-violet-400",
  },
  {
    name: "Pink",
    twprop: "fill-pink-400",
    twtext: "text-pink-400",
    twbg: "bg-pink-400",
  },
];

const TaskModal = ({ mode, oldData, editTaskCallBack }) => {
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const [lastId, setLastId] = useState(0); // DO NOT use these parameter directly, use getID to get an id instead
  const [subtasks, setSubTasks] = useState([]);
  const [nodeColor, setNodeColor] = useState(allNodeColor[0]);
  const [nodeShape, setNodeShape] = useState("circle");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (mode === "edit") {
      nameRef.current.value = oldData.name;
      descriptionRef.current.value = oldData.description;
      setSubTasks(oldData.subtasks);
      setNodeColor(allNodeColor.find(({ name }) => name === oldData.nodeColor));
      setNodeShape(oldData.nodeShape);
      setStartDate(oldData.startDate);
      setEndDate(oldData.dueDate);
      let highestID = 0;
      oldData.subtasks.forEach((subtask) => {
        if (subtask.id > lowestID) {
          lowestID = subtask.id;
        }
      });
      setLastId(highestID + 1);
    }
  }, []);

  const getId = () => {
    // IMPORTANT: only use this function to get an ID
    // return an ID and increment so that the id can never repeat
    const id = lastId;
    setLastId(id + 1);
    return id;
  };

  const handleNodeColorChange = (event) => {
    setNodeColor(allNodeColor.find(({ name }) => name === event.target.value));
  };

  const handleNodeShapeChange = (event, shapeType) => {
    event.preventDefault();
    setNodeShape(shapeType);
  };

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
          <div className="relative w-11/12 md:w-5/6 my-6 mx-auto xl:w-2/3 2xl:w-1/2 max-h-screen">
            {/*content*/}
            <div className=" rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div
                className={`flex items-start justify-between py-4 px-5 lg:py-8 border-b border-solid border-slate-200 rounded-t-2xl ${nodeColor.twbg} transition duration-300`}
              >
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
                    <label className="font-nunito-sans font-bold">Name</label>
                    <input
                      type="text"
                      className="border border-black rounded-md m-2 placeholder:italic"
                      placeholder=" Enter task name..."
                      ref={nameRef}
                    ></input>
                    <label className="font-nunito-sans font-bold placeholder:t">
                      Description
                    </label>
                    <input
                      type="textbox"
                      className="border border-black rounded-md m-2 grow placeholder:italic placeholder:justify-start h-24"
                      placeholder=" Enter description..."
                      ref={descriptionRef}
                    ></input>
                    <div className="grid grid-rows-2">
                      <div className="w-full">
                        <label className="self-center font-nunito-sans font-bold">
                          Start
                        </label>
                        <div className="m-2">
                          <DatePicker
                            selected={startDate}
                            showTimeSelect
                            minDate={Date.now()}
                            onChange={(date) => setStartDate(date)}
                            className="border border-black rounded-md justify-self-end w-full"
                          ></DatePicker>
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="self-center font-nunito-sans font-bold">
                          Due
                        </label>
                        <div className="m-2">
                          <DatePicker
                            selected={endDate}
                            showTimeSelect
                            minDate={Date.now()}
                            onChange={(date) => setEndDate(date)}
                            className="border border-black rounded-md justify-self-end w-full"
                          ></DatePicker>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <label className="font-nunito-sans font-bold">
                        Nodes
                      </label>
                      <div className="flex flex-1 gap-x-1">
                        <div className="basis-1/5 bg-gray-100 rounded-lg self-center flex justify-center p-2">
                          <CustomSVG
                            type={nodeShape}
                            className={`${nodeColor.twprop}`}
                          ></CustomSVG>
                        </div>
                        <div className="bg-gray-100 basis-2/5 rounded-lg p-4 flex gap-2">
                          <select
                            value={nodeColor.name}
                            onChange={handleNodeColorChange}
                            className={`${nodeColor.twtext} font-bold grow self-center border border-black rounded-lg `}
                          >
                            {allNodeColor.map((colorObj) => (
                              <option
                                value={colorObj.name}
                                className={`${colorObj.twtext} font-bold`}
                              >
                                {colorObj.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="bg-gray-100 basis-2/5 rounded-lg flex p-2 gap-2 content-center justify-center">
                          <button
                            onClick={() =>
                              handleNodeShapeChange(event, "circle")
                            }
                          >
                            <CustomSVG
                              className={`${nodeColor.twprop} ${
                                nodeShape === "circle"
                                  ? "stroke-black stroke-2"
                                  : ""
                              } self-center`}
                            />
                          </button>

                          <button
                            onClick={() =>
                              handleNodeShapeChange(event, "square")
                            }
                          >
                            <CustomSVG
                              className={`${nodeColor.twprop} ${
                                nodeShape === "square"
                                  ? "stroke-black stroke-2"
                                  : ""
                              } self-center`}
                              type="square"
                            />
                          </button>

                          <button
                            onClick={() =>
                              handleNodeShapeChange(event, "triangle")
                            }
                            value="triangle"
                          >
                            <CustomSVG
                              className={`${nodeColor.twprop} ${
                                nodeShape === "triangle"
                                  ? "stroke-black stroke-2 "
                                  : ""
                              } self-center`}
                              type="triangle"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Right side */}
                  <div className="flex flex-col w-full lg:w-1/2">
                    <div className="bg-gray-100 rounded-md p-4">
                      <label className="block font-nunito-sans font-bold">
                        Add Subtask
                      </label>
                      <div className="flex flex-col gap-2 overflow-y-auto max-h-32 lg:max-h-none py-2">
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
                                className="border border-black rounded-md grow"
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
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={addSubTask}
                          disabled={subtasks.length >= 8}
                        >
                          <AddButton
                            className={`ml-2 w-8 h-auto ${
                              subtasks.length >= 8
                                ? "opacity-30"
                                : "opacity-100"
                            }`}
                          />
                        </button>
                        {subtasks.length >= 8 ? (
                          <p className="font-bold text-red-700">
                            Limited to 8 subtasks
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-3 lg:p-6 rounded-b gap-3">
                <button
                  className="bg-blue-400 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() =>
                    editTaskCallBack("success", {
                      // This code may or may not be permanent, but definitely usable for testing
                      name: nameRef.current.value,
                      description: descriptionRef.current.value,
                      startDate: startDate,
                      dueDate: endDate,
                      nodeColor: nodeColor.name,
                      nodeShape: nodeShape,
                      subtasks: subtasks,
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
  oldData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    dueDate: PropTypes.instanceOf(Date).isRequired,
    nodeColor: PropTypes.string.isRequired,
    nodeShape: PropTypes.string.isRequired,
    subtasks: PropTypes.object.isRequired,
  }),
  editTaskCallBack: PropTypes.func.isRequired,
};

export default TaskModal;
