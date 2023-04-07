import React, { useRef, useState, useEffect, forwardRef } from "react";
import PropTypes, { node, object } from "prop-types";
import { ReactComponent as AddButton } from "../assets/addButton.svg";
import { ReactComponent as DeleteButton } from "../assets/deleteButton.svg";
import { ReactComponent as ArrowIcon } from "../assets/taskmodal/arrow.svg";
import { ReactComponent as CalendarIcon } from "../assets/taskmodal/calendar.svg";
import { ReactComponent as TrashIcon } from "../assets/taskmodal/trash.svg";
import DatePicker from "react-datepicker";
import Spinner from "./Spinner";
import { CustomSVG, allNodeColor } from "./CustomSVG";
import TwoButtonModal from "./TwoButtonModal";
import { getTask } from "../functions/roadmapFunction";

import "react-datepicker/dist/react-datepicker.css";

// Current issues
// 2. Date data domain has yet to be enforced
// 7. Modal size (the modal overflowing the screen)
// 11. Node selector overflow in small screen
// 12. Problems with some mobile device
// 14. Nodes shape selector arent actually centered

// data domain
const MAX_NAME_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 255;

const TaskModal = ({ oldData, editTaskCallBack }) => {
  const initialState = useRef({ ...oldData });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // WARNING: use getId() to get an ID only
  const [lastId, setLastId] = useState(0);
  const [subtasks, setSubTasks] = useState([]);
  const [nodeColor, setNodeColor] = useState(allNodeColor[0]);
  const [nodeShape, setNodeShape] = useState("circle");
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setdueDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [unSavedModal, setUnSavedModal] = useState(false);
  const [taskWasFetched, setTaskWasFetched] = useState(false);
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
    async function setModalData() {
      setLoading(true);
      if (oldData.id !== -1) {
        if (oldData.hasFetched === true) {
          setupTask(oldData);
        } else {
          const fetchedData = await getTask(oldData.id);
          initialState.current = fetchedData;
          setTaskWasFetched(true);
          setupTask(fetchedData);
        }
      }
      setLoading(false);
    }

    setModalData();
  }, []);

  const setupTask = (taskObj) => {
    setName(taskObj.name);
    setDescription(taskObj.description);
    setSubTasks(taskObj.subtasks);
    setNodeColor(allNodeColor.find(({ name }) => name === taskObj.nodeColor));
    setNodeShape(taskObj.nodeShape);
    setStartDate(taskObj.startDate);
    setdueDate(taskObj.dueDate);
    let highestID = 0;
    taskObj.subtasks.forEach((subtask) => {
      if (subtask.id > highestID) {
        highestID = subtask.id;
      }
    });

    setLastId((lastId) => highestID + 1);
  };

  const getId = () => {
    // IMPORTANT: only use this function to get an ID
    // return an ID and increment so that the id can never repeat
    const id = lastId;
    setLastId(id + 1);
    return id;
  };

  const handleNameChange = (event) => {
    if (event.target.value.length < MAX_NAME_LENGTH) {
      setName(event.target.value);
    }
  };

  const handleDescriptionChange = (event) => {
    if (event.target.value.length < MAX_DESCRIPTION_LENGTH) {
      setDescription(event.target.valuee);
    }
  };

  const handleDateChange = (mode, date) => {
    if (mode === "startDate") {
      setStartDate(date);
    } else if (mode === "dueDate") {
      setdueDate(date);
    }
  };

  const handleNodeColorChange = (event) => {
    setNodeColor(allNodeColor.find(({ name }) => name === event.target.value));
  };

  const handleNodeShapeChange = (event, shapeType) => {
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
        isTempId: true,
      },
    ]);
  };

  const deleteSubTask = (event, id) => {
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

  const checkTaskChange = () => {
    // compare previous data (may not be first) with latest data
    if (
      initialState.current.name !== name ||
      initialState.current.description !== description ||
      initialState.current.nodeColor !== nodeColor.name ||
      initialState.current.nodeShape !== nodeShape ||
      initialState.current.startDate.getTime() !== startDate.getTime() ||
      initialState.current.dueDate.getTime() !== dueDate.getTime()
    ) {
      return true;
    }

    return false;
  };

  const checkSubtaskChange = () => {
    let subtaskChange = { add: [], edit: [], delete: [] };
    subtasks.forEach((subtask) => {
      if (subtask.isTempId === true) {
        // new subtask
        subtaskChange.add.push(subtask.id);
        return;
      }

      const taskIntersection =
        initialState.current.subtasks.find(
          (initsubtask) => subtask.id === initsubtask.id
        ) === undefined;
      if (taskIntersection) {
        // deleted subtask
        subtaskChange.delete.push(subtask.id);
        return;
      } else if (
        subtask.detail !== taskIntersection.detail ||
        subtask.status !== taskIntersection.detail
      ) {
        // edited task
        subtaskChange.edit.push(subtask.id);
        return;
      }
    });
    return subtaskChange;
  };

  const handleDetectChangeBeforeClose = () => {
    // use to check whether the task has changed
    // if change is detected but user press close
    // set the display unsaved change modal to true
    const check = checkSubtaskChange();
    const subtaskChange =
      check.add.length === 0 &&
      check.edit.length === 0 &&
      check.delete.length === 0;
    if (checkTaskChange() || subtaskChange) {
      setUnSavedModal(true);
      return;
    }
    editTaskCallBack(taskWasFetched ? "fetch" : "failed", generateTaskData());
  };

  const generateTaskData = () => {
    // generate task object when user create or edit task
    return {
      id: oldData.id,
      name: name,
      description: description,
      startDate: startDate,
      dueDate: dueDate,
      nodeColor: nodeColor.name,
      nodeShape: nodeShape,
      subtasks: subtasks,
      hasFetched: true,
      isDone: false,
      isTempId: oldData.id === -1 || oldData.isTempId === true ? true : false,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTaskCallBack("success", generateTaskData());
  };

  return (
    <>
      <TwoButtonModal
        isOpen={deleteModal}
        onLightPress={() => setDeleteModal(false)}
        onDarkPress={() => editTaskCallBack("delete", oldData)}
        textField={{
          title: "Confirm Deletion",
          body: "Deleting task will permanantly remove it from your roadmap?",
          lightButtonText: "Cancel",
          darkButtonText: "Delete",
        }}
      />
      <TwoButtonModal
        isOpen={unSavedModal}
        onLightPress={() =>
          editTaskCallBack(
            taskWasFetched ? "fetch" : "failed",
            generateTaskData()
          )
        }
        onDarkPress={() => setUnSavedModal(false)}
        textField={{
          title: "Unsaved Change",
          body: "Are you sure you want to discard the change of a task?",
          lightButtonText: "Ok",
          darkButtonText: " Cancel",
        }}
      />

      <form onSubmit={handleSubmit}>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-20 outline-none focus:outline-none">
          <div className="relative w-11/12 md:w-5/6 my-6 mx-auto xl:w-2/3 2xl:w-1/2 max-h-screen">
            {/*content*/}
            {loading && <Spinner className="z-30 absolute rounded-xl" />}
            <div className=" rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div
                className={`flex justify-between py-4 px-5 lg:py-8 border-b border-solid border-slate-200 rounded-t-2xl transition duration-300 items-center bg-white`}
              >
                <div className={`${oldData.id === -1 ? "" : "w-[50px]"}`}></div>
                <h3 className="text-4xl font-semibold text-black">
                  {oldData.id === -1 ? "Create" : "Edit"} TASK
                </h3>
                {oldData.id === -1 ? (
                  <div></div>
                ) : (
                  <button
                    type="button"
                    // className="p-1 bg-transparent border-0 text-white text-3xl"
                    onClick={() => setDeleteModal(true)}
                  >
                    {" "}
                    <TrashIcon className="h-10" />
                  </button>
                )}
              </div>
              {/*body*/}

              <div className="flex flex-col lg:flex-row">
                {/* Left side */}
                <div className="flex flex-col w-full lg:w-1/2 p-6">
                  <label className="font-nunito-sans font-bold">Name</label>
                  <input
                    type="text"
                    value={name}
                    className="border-2 border-gray-300 rounded-md my-1 placeholder:italic px-1 font-nunito-sans"
                    placeholder=" Enter task name..."
                    onChange={(e) => handleNameChange(e)}
                  ></input>

                  <label className="font-nunito-sans font-bold">
                    Description
                  </label>
                  <textarea
                    className="border-2 border-gray-300 rounded-md my-1 grow placeholder:italic placeholder:justify-start px-1 font-nunito-sans"
                    value={description}
                    cols="50"
                    rows="4"
                    placeholder=" Enter description..."
                    onChange={(e) => handleDescriptionChange(e)}
                  ></textarea>

                  {/* Date Setting */}
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
                          onChange={(date) => {
                            handleDateChange("startDate", date);
                          }}
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
                          selected={dueDate}
                          showTimeSelect
                          minDate={Date.now()}
                          onChange={(date) => {
                            handleDateChange("dueDate", date);
                          }}
                          // className="border border-black rounded-md justify-self-end w-full"
                          customInput={<DatePickerButton />}
                        ></DatePicker>
                      </div>
                    </div>
                  </div>

                  {/* Node setting */}
                  <div>
                    <label className="font-nunito-sans font-bold">Nodes</label>
                    <div className="flex flex-1 gap-x-1 mt-1 mb-4">
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
                              isStrokeOn={nodeShape === "circle"}
                              className={`${nodeColor.twfill}`}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleNodeShapeChange(event, "square")
                            }
                          >
                            <CustomSVG
                              type="square"
                              isStrokeOn={nodeShape === "square"}
                              className={`${nodeColor.twfill}`}
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
                              type="triangle"
                              isStrokeOn={nodeShape === "triangle"}
                              className={`${nodeColor.twfill}`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right side */}
                <div className="flex flex-col w-full lg:w-1/2">
                  <div className="bg-gray-100 p-6 basis-full flex flex-col justify-between rounded-b-2xl lg:rounded-bl-none">
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
                                className="w-4 h-4 self-center font-nunito-sans"
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
                                className="border border-black rounded-md grow font-nunito-sans"
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
                        className="text-black border border-black background-transparent rounded-full font-bold uppercase text-sm h-10 w-24 "
                        type="button"
                        onClick={handleDetectChangeBeforeClose}
                      >
                        Close
                      </button>
                      <button
                        className="bg-nav-blue text-white font-bold uppercase text-sm rounded-full shadow hover:shadow-lg h-10 w-24"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    dueDate: PropTypes.instanceOf(Date),
    nodeColor: PropTypes.string,
    nodeShape: PropTypes.string,
    subtasks: PropTypes.arrayOf(object),
    hasFetched: PropTypes.bool,
    isDone: PropTypes.bool,
    isTempId: PropTypes.bool,
  }),
  editTaskCallBack: PropTypes.func.isRequired,
};

export default TaskModal;
