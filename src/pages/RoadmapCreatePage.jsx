import React, { useRef, useState, useEffect } from "react";

const Modal = ({addTaskCallback, setShowModal, id, setId}) => {
  const nameRef = useRef("");
  const descriptionRef = useRef("");

  const clickHandler = (isCreate) => {
      if(isCreate) {
          addTaskCallback({
              "id": id,
              "name": nameRef.current.value,
              "description": descriptionRef.current.value
          })
          setId(id+1);
      } 
      setShowModal(false);
  }

  return (
      <>
          <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-2 border-emerald-600 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Create task
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                > x
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex flex-col space-y-1">
                <div className="flex justify-between ">
                  <span >Name:</span> 
                  <input type="text" ref={nameRef} className="border-emerald-500 border-2 rounded-md"></input>
                </div>
                <div className="flex space-x-3">
                  <span className="flex">Description:</span> 
                  <input type="text" ref={descriptionRef} className="border-emerald-500 border-2 rounded-md"></input>
                </div>
                  
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => clickHandler(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => clickHandler(true)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
  )
}

const RoadmapCreatePage = () => {
  const [RMName, setRMName] = useState("");
  const [RMDesc, setRMDesc] = useState("")
  const [tasks, setTasks] = useState([])
  const [modalState, setModalState] = useState(false)
  const [id, setId] = useState(0) // might be later fetched
  // {taskid, taskname, taskstatus}

  useEffect(() => {
    console.log(tasks)
  }, [tasks])
  
  const addTaskClickhandler = (submissionObject) => {
    setTasks([...tasks, {
      id: submissionObject.id,
      name: submissionObject.name,
      description: submissionObject.description
    }])
  }

  const onPressingSaveButton = (e) => {
    e.preventDefault(); // stop the page from reloading when submitting the form, may remove in the future
    console.log({
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
          modalState ? <Modal setShowModal={(e) => setModalState(e)} addTaskCallback={(e) => addTaskClickhandler(e)}
            id={id} setId={setId}/> : null
        }
      </div>
    </>
  );
};

export default RoadmapCreatePage;
