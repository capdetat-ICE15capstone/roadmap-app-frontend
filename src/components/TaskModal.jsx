import React, { useRef, useState, useEffect, forwardRef } from "react";
import PropTypes, { object } from "prop-types";
import { ReactComponent as AddButton } from "../assets/addButton.svg";
import { ReactComponent as DeleteButton } from "../assets/deleteButton.svg";
import { ReactComponent as ArrowIcon } from "../assets/taskmodal/arrow.svg";
import { ReactComponent as CalendarIcon } from "../assets/taskmodal/calendar.svg";
import { ReactComponent as TrashIcon } from "../assets/taskmodal/trash.svg";
import DatePicker from "react-datepicker";
import Spinner from "./Spinner";

import "react-datepicker/dist/react-datepicker.css";

// Current issues
// 2. Data domain has yet to be enforced
// 3. CustomSVG is terribly implemented (hard code everywhere)
// 7. Modal size (the modal overflowing the screen)
// 11. Node selector overflow in small screen
// 12. Problems with some mobile devices
// 13. Some edges are not rounded
// 14. Nodes shape selector arent actually centered

// Fixed isses
// 1. User can choose whatever start and due date they want, incluing in the past
// 2. (Untested) No logic to check for the lastID when the roadmap is edited instead of created
// 3. subtask scrolling
// 4. Description box size problem (box size tends to varies)
// 5. Using new Date() will also select the time for you, not only date
// 6. fixed a lot of styling
// 7. Datepicker style
// 8. input box shrink
// 9. Description text and placeholder starting position (text starts in the middle of the box)

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
    name: "gray",
    twfill: "fill-gray-400",
    twtext: "text-gray-400",
    twbg: "bg-gray-400",
  },
  {
    name: "red",
    twfill: "fill-red-400",
    twtext: "text-red-400",
    twbg: "bg-red-400",
  },
  {
    name: "orange",
    twfill: "fill-orange-400",
    twtext: "text-orange-400",
    twbg: "bg-orange-400",
  },
  {
    name: "yellow",
    twfill: "fill-yellow-400",
    twtext: "text-yellow-400",
    twbg: "bg-yellow-400",
  },
  {
    name: "green",
    twfill: "fill-green-400",
    twtext: "text-green-400",
    twbg: "bg-green-400",
  },
  {
    name: "cyan",
    twfill: "fill-cyan-400",
    twtext: "text-cyan-400",
    twbg: "bg-cyan-400",
  },
  {
    name: "blue",
    twfill: "fill-blue-400",
    twtext: "text-blue-400",
    twbg: "bg-blue-400",
  },
  {
    name: "violet",
    twfill: "fill-violet-400",
    twtext: "text-violet-400",
    twbg: "bg-violet-400",
  },
  {
    name: "pink",
    twfill: "fill-pink-400",
    twtext: "text-pink-400",
    twbg: "bg-pink-400",
  },
];

const TaskModal = ({ oldData, editTaskCallBack }) => {
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const [lastId, setLastId] = useState(0); // DO NOT use these parameter directly, use getID to get an id instead
  const [subtasks, setSubTasks] = useState([]);
  const [nodeColor, setNodeColor] = useState(allNodeColor[0]);
  const [nodeShape, setNodeShape] = useState("circle");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const DatePickerButton = forwardRef(({ value, onClick }, ref) => (
    <div className="w-full">
      <button
        type="button"
        className="w-full rounded-md h-12 bg-gray-100 border-2 border-gray-300"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <div className="flex items-center px-2 justify-between">
          <div className="flex gap-3 items-center">
            <CalendarIcon className="h-full" />
            <div className="flex flex-col items-start">
              <p className="text-xs text-blue-400">Select date</p>
              <p className="font-bold text-black">{value}</p>
            </div>
          </div>
          <ArrowIcon />
        </div>
      </button>
    </div>
  ));

  useEffect(() => {
    console.log(oldData);
    async function setModalData() {
      if (oldData.id !== -1) {
        setLoading(true);
        nameRef.current.value = oldData.name;
        descriptionRef.current.value = oldData.description;
        setSubTasks(oldData.subtasks);
        setNodeColor(
          allNodeColor.find(({ name }) => name === oldData.nodeColor)
        );
        setNodeShape(oldData.nodeShape);
        setStartDate(oldData.startDate);
        setEndDate(oldData.dueDate);
        let highestID = 0;
        oldData.subtasks.forEach((subtask) => {
          if (subtask.id > highestID) {
            highestID = subtask.id;
          }
        });
        setLastId((lastId) => highestID + 1);
      }
    }
    setModalData();
    setLoading(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    editTaskCallBack("success", {
      id: oldData.id,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      startDate: startDate,
      dueDate: endDate,
      nodeColor: nodeColor.name,
      nodeShape: nodeShape,
      subtasks: subtasks,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-20 outline-none focus:outline-none">
          <div className="relative w-11/12 md:w-5/6 my-6 mx-auto xl:w-2/3 2xl:w-1/2 max-h-screen">
            {/*content*/}
            {loading && <Spinner className="z-30 absolute rounded-xl" />}
            <div className=" rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div
                className={`flex items-start justify-between py-4 px-5 lg:py-8 border-b border-solid border-slate-200 rounded-t-2xl ${nodeColor.twbg} transition duration-300 items-center`}
              >
                <h3 className="text-3xl font-semibold text-white">
                  Create task
                </h3>
                <button
                  type="button"
                  className="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => editTaskCallBack("delete", oldData)}
                >
                  {" "}
                  <TrashIcon className="h-10" />
                </button>
              </div>
              {/*body*/}
              {/* <div className="p-4 overflow-auto"> */}
              <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col w-full lg:w-1/2 p-6">
                  <label className="font-nunito-sans font-bold">Name</label>
                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded-md my-1 placeholder:italic px-1"
                    placeholder=" Enter task name..."
                    ref={nameRef}
                  ></input>
                  <label className="font-nunito-sans font-bold">
                    Description
                  </label>
                  <textarea
                    className="border-2 border-gray-300 rounded-md my-1 grow placeholder:italic placeholder:justify-start px-1"
                    cols="50"
                    rows="4"
                    placeholder=" Enter description..."
                    ref={descriptionRef}
                  ></textarea>
                  <div className="flex flex-col my-2 gap-2">
                    <div className="w-full grid grid-cols-10">
                      <label className="self-center font-nunito-sans font-bold">
                        Start
                      </label>
                      <div className="col-span-9">
                        <DatePicker
                          selected={startDate}
                          showTimeSelect
                          minDate={Date.now()}
                          onChange={(date) => setStartDate(date)}
                          // className="border border-black rounded-md justify-self-end w-full"
                          customInput={<DatePickerButton />}
                        ></DatePicker>
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-10">
                      <label className="self-center font-nunito-sans font-bold">
                        Due
                      </label>
                      <div className="col-span-9">
                        <DatePicker
                          selected={endDate}
                          showTimeSelect
                          minDate={Date.now()}
                          onChange={(date) => setEndDate(date)}
                          // className="border border-black rounded-md justify-self-end w-full"
                          customInput={<DatePickerButton />}
                        ></DatePicker>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-nunito-sans font-bold">Nodes</label>
                    <div className="flex flex-1 gap-x-1 mt-1 mb-4">
                      {/* <div className="basis-1/5 bg-gray-100 rounded-lg self-center flex justify-center p-2">
                          <CustomSVG
                            type={nodeShape}
                            className={`${nodeColor.twprop}`}
                          ></CustomSVG>
                        </div> */}
                      <div className="bg-gray-100 basis-1/2 rounded-lg grid grid-rows-3 grid-cols-7 gap-2 h-30 border-2 border-gray-300">
                        <p className="font-bold text-gray-400 pl-2">Color</p>
                        <select
                          value={nodeColor.name}
                          onChange={handleNodeColorChange}
                          className={`${nodeColor.twtext} font-bold grow self-center border-2 border-gray-300 rounded-lg col-span-5 row-start-2 col-start-2`}
                        >
                          {allNodeColor.map((colorObj) => (
                            <option
                              value={colorObj.name}
                              key={colorObj.name}
                              className={`${colorObj.twtext} font-bold`}
                            >
                              {colorObj.name.charAt(0).toUpperCase() +
                                colorObj.name.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="bg-gray-100 basis-1/2 rounded-lg flex flex-col content-center border-gray-300 border-2">
                        <p className="font-bold text-gray-400 pl-2">Shape</p>
                        <div className="flex gap-2 justify-center">
                          <button
                            type="button"
                            onClick={() =>
                              handleNodeShapeChange(event, "circle")
                            }
                          >
                            <CustomSVG
                              className={`${nodeColor.twfill} ${
                                nodeShape === "circle"
                                  ? "stroke-black stroke-2"
                                  : ""
                              } self-center`}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleNodeShapeChange(event, "square")
                            }
                          >
                            <CustomSVG
                              className={`${nodeColor.twfill} ${
                                nodeShape === "square"
                                  ? "stroke-black stroke-2"
                                  : ""
                              } self-center`}
                              type="square"
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleNodeShapeChange(event, "triangle")
                            }
                            value="triangle"
                          >
                            <CustomSVG
                              className={`${nodeColor.twfill} ${
                                nodeShape === "triangle"
                                  ? "stroke-black stroke-2 "
                                  : ""
                              } self-center `}
                              type="triangle"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right side */}
                <div className="flex flex-col w-full lg:w-1/2">
                  <div className="bg-gray-100 p-6 basis-full flex flex-col justify-between">
                    <div>
                      <label className="block font-nunito-sans font-bold">
                        Add Subtask
                      </label>
                      <div className="flex flex-col gap-2 overflow-y-auto max-h-32 lg:max-h-none py-2">
                        {subtasks.map((subtask) => {
                          return (
                            <div className="flex gap-2 mx-2" key={subtask.id}>
                              <input
                                type="checkbox"
                                checked={subtask.status}
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
                                type="button"
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
                          type="button"
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
                    <div className="flex items-center justify-end p-4 rounded-b gap-3">
                      <button
                        className="text-black border border-black rounded-md background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => editTaskCallBack("failed", oldData)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-blue-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
              {/*footer*/}
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-10 bg-black"></div>
      </form>
    </>
  );
};

TaskModal.propTypes = {
  oldData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    dueDate: PropTypes.instanceOf(Date),
    nodeColor: PropTypes.string,
    nodeShape: PropTypes.string,
    subtasks: PropTypes.arrayOf(object),
  }),
  editTaskCallBack: PropTypes.func.isRequired,
};

export default TaskModal;
