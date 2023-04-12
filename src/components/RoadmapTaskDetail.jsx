import React from 'react'
import { convertDateTimeString } from '../functions/formatFunction';

function RoadmapTaskDetail({ task, handleTaskUpdate, handleIsSaving, handleIsCompleting, isOwner, displaySaveButton, displayCompleteButton }) {
  return (
    <>
      <div className='flex flex-col bg-white rounded-2xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)] space-y-4'>
        <div className='flex flex-row space-x-4 justify-between'>
          <div className='flex flex-col space-y-4 w-1/2 p-4'>
            <div className='text-md font-bold break-words'>
              {task.name}
            </div>
            <div className='text-sm break-words'>
              {task.description}
            </div>
            <div className='flex flex-col md:flex-row gap-2'>
              <div className='grow font-bold text-center text-xs'>
                Start: {convertDateTimeString(task.startDate)}
              </div>
              <div className='grow font-bold text-center text-xs'>
                Due: {convertDateTimeString(task.dueDate)}
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-2 w-1/2 p-4 bg-[#f5f8fd] rounded-r-2xl justify-between'>
            <div className='flex flex-col justify-center space-y-2 text-sm break-all'>
              {task.subtasks.map((subtask, index) => {
                return (
                  <label key={index}>
                    {(isOwner) && (
                      <input
                        type="checkbox"
                        className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded"
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
                        className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 accent-slate-500 rounded pointer-events-none"
                        defaultChecked={subtask.status}
                      />
                    )}
                    {subtask.detail}
                  </label>
                )
              })}
            </div>
            {(isOwner) && (
              <div className='flex flex-row justify-end gap-2'>
                {(displaySaveButton) && (
                  <button
                    onClick={handleIsSaving}
                    className="bg-main-blue sm:w-28 w-full text-white px-4 py-2 font-semilight rounded-full text-sm font-bold self-center h-10 truncate"
                    type="button">
                    Save
                  </button>
                )}
                {(displayCompleteButton) && (
                  <button onClick={handleIsCompleting} className="bg-sub-blue sm:w-28 w-full text-white px-4 py-2 font-semilight rounded-full text-sm font-bold self-center h-10 truncate" type="button">
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

export default RoadmapTaskDetail