import React, { useState, useEffect } from 'react'
import { nodeShapeGenerator } from '../functions/viewFunction';
import { convertDateTimeString, shortenString } from '../functions/formatFunction';
import { ReactComponent as Pin } from "../assets/shapes/Pointer.svg";

function RoadmapViewer({ roadmap, currentTaskID, handleTaskView, isArchived }) {

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  useEffect(() => {
    if (currentTaskID === -1) {
      setCurrentTaskIndex(roadmap.tasks.length - 1);
    } else {
      let reachedCurrentTask = false;
      roadmap.tasks.forEach((task, index) => {
        if (task.id === currentTaskID) {
          reachedCurrentTask = true;
          setCurrentTaskIndex(index);
        }
      });
    }
  }, [roadmap])

  return (
    <div className='bg-[#e6eefc] rounded-2xl'>
      <div className='flex flex-col w-full overflow-x-auto p-4'>
        <div className='flex pl-12 pt-8 pb-12 space-x-[25px]'>
          {
            roadmap.tasks.map((task, index) => {
              const zIndex = roadmap.tasks.length - index;
              return (
                <div key={index} className="relative" style={{ zIndex }}>
                  <div className="absolute top-1/2 -left-1/4 transform -translate-x-1/2 -translate-y-3/4 -z-10">
                    {(index > '0') && <hr className="w-[75px] h-1 bg-black border-0" />}
                  </div>
                  <div className="absolute top-1/2 left-[100%] transform -translate-x-1/2 -translate-y-3/4 -z-10">
                    {(index === (roadmap.tasks.length - 1)) && <hr className="w-[75px] h-1 border-0 opacity-0" />}
                  </div>
                  <div className='absolute -bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-xs text-center self-center font-bold'>
                    {shortenString(task.name, 14)}
                  </div>
                  <div className='relative hover:scale-110 transition group duration-100'>
                    <button
                      value={index}
                      onClick={() => handleTaskView(task)}
                    >
                      {(index < currentTaskIndex || (index === currentTaskIndex && currentTaskID === -1)) && !isArchived && (
                        <>
                          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-3xl text-center select-none z-50 pointer-events-none'>
                            ✓
                          </div>
                        </>
                      )}
                      {(roadmap.tasks_stars[index] === 1) && (
                        <div className='absolute -top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-center select-none z-50 pointer-events-none'>
                          <span className='text-sm'>⭐</span>
                        </div>
                      )}
                      {(roadmap.tasks_stars[index] === 2) && (
                        <div className='absolute -top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-3xl text-center select-none z-50 pointer-events-none'>
                          <span className='text-sm'>⭐⭐</span>
                        </div>
                      )}
                      {(roadmap.tasks_stars[index] === 3) && (
                        <div className='absolute -top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-center select-none z-50 pointer-events-none'>
                          <span className='text-sm'>⭐⭐⭐</span>
                        </div>
                      )}
                      {(index === currentTaskIndex) && (
                        <div className='absolute -top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-center select-none z-50 pointer-events-none'>
                          <Pin className='w-6 h-6'/>
                        </div>
                      )}
                      {(index > currentTaskIndex) && (
                        <div className='text-3xl absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-md text-center select-none z-50 pointer-events-none'>
                          🔒
                        </div>
                      )}
                      {nodeShapeGenerator(task.nodeShape, task.nodeColor, index, currentTaskIndex)}
                    </button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  )
}

export default RoadmapViewer