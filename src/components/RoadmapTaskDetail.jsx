import React from 'react'
import { convertDateTimeString } from '../functions/formatFunction';

function RoadmapTaskDetail({ task, handleTaskUpdate, handleIsSaving, handleIsCompleting, isOwner, displaySaveButton, displayCompleteButton, isArchived, isCompleted, isEmpty }) {

  if (isEmpty) {
    return (
      <>
        <div className='flex flex-col bg-[#e6eefc] rounded-2xl space-y-4 h-58 w-full p-4'>
          <div className='text-xl text-center text-gray-500 font-extrabold self-center break-words'>
            This roadmap is empty.
          </div>
        </div>
      </>
    )
  } else if (isCompleted) {
    return (
      <>
        <div className='flex flex-col bg-[#e6eefc] rounded-2xl space-y-4 h-58 w-full p-4'>
          <div className='text-xl text-center text-gray-500 font-extrabold self-center break-words'>
            Congratulations! This roadmap is now complete.
          </div>
        </div>
      </>
    )
  } else if (isArchived) {
    return (
      <>
        <div className='flex flex-col bg-[#e6eefc] rounded-2xl space-y-4 h-58 w-full p-20'>
          <div className='text-xl text-center text-gray-500 font-extrabold self-center break-words'>
            This roadmap has been archived by the owner.
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='flex flex-col bg-[#e6eefc] rounded-2xl space-y-4'>
          <div className='flex flex-row space-x-4 justify-between'>
            <div className='flex flex-col space-y-4 w-1/2 p-4'>
              <div className='text-md font-bold break-words'>
                {task.name}
              </div>
              <div className='text-sm break-words'>
                {task.description}
              </div>
              <div className='flex flex-col md:flex-row md:space-x-2 max-md:space-y-2'>
                <div className='grow font-bold text-center text-xs'>
                  Start: {convertDateTimeString(task.startDate)}
                </div>
                <div className='grow font-bold text-center text-xs'>
                  Due: {convertDateTimeString(task.dueDate)}
                </div>
              </div>
            </div>
            <div className='flex flex-col space-y-4 w-1/2 p-4 bg-[#f5f8fd] rounded-r-2xl justify-between'>
              <div className='flex flex-col justify-center space-y-2 text-sm break-all'>
                {task.subtasks.map((subtask, index) => {
                  return (
                    <label key={index} className='flex items-center'>
                      {(isOwner) && (
                        <input
                          type="checkbox"
                          className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded shrink-0"
                          checked={subtask.status}
                          onChange={() => {
                            let updatedTask = { ...task };
                            updatedTask.subtasks[index].status = !updatedTask.subtasks[index].status;
                            handleTaskUpdate(updatedTask);
                          }}
                        />
                      )}
                      {(!isOwner) && (
                        <input
                          type="checkbox"
                          disabled={true}
                          className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 accent-slate-500 rounded pointer-events-none shrink-0"
                          defaultChecked={subtask.status}
                        />
                      )}
                      {subtask.detail}
                    </label>
                  )
                })}
              </div>
              {(isOwner) && (
                <div className='flex sm:flex-row max-sm:flex-col justify-end sm:space-x-2 max-sm:justify-center max-sm:space-y-2'>
                  {(displaySaveButton) && (
                    <button
                      onClick={handleIsSaving}
                      className="bg-sub-blue sm:w-28 w-full text-white px-4 py-2 font-semilight rounded-full text-sm font-bold self-center h-10 truncate transition ease-in-out hover:bg-nav-blue hover:scale-105 hover:z-10 duration-200"
                      type="button"
                    >
                      Save
                    </button>
                  )}
                  {(displayCompleteButton) && (
                    <button
                      onClick={handleIsCompleting}
                      className="bg-nav-blue sm:w-28 w-full text-white px-4 py-2 font-semilight rounded-full text-sm font-bold self-center h-10 truncate transition ease-in-out hover:bg-black hover:scale-105 hover:z-10 duration-200"
                      type="button"
                    >
                      Complete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default RoadmapTaskDetail