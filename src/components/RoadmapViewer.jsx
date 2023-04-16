import React, { useState, useEffect } from 'react'
import { nodeShapeGenerator } from '../functions/viewFunction';
import { convertDateTimeString, shortenString } from '../functions/formatFunction';

function RoadmapViewer({ tasks, currentTaskID, handleTaskView }) {

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [hoveredTask, setHoveredTask] = useState({ id: 0 });
  const [visible, setVisible] = useState();

  const handleMouseOver = (task) => {
    setHoveredTask(task);
  };

  useEffect(() => {
    if (currentTaskID === -1) {
      setCurrentTaskIndex(tasks.length - 1);
    } else {
      let reachedCurrentTask = false;
      tasks.forEach((task, index) => {
        if (task.id === currentTaskID) {
          reachedCurrentTask = true;
          setCurrentTaskIndex(index);
        }
      });
    }
  }, [tasks])

  return (
    <div className='relative bg-[#e6eefc] rounded-2xl p-20'>
      <div className='absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 flex flex-col w-full overflow-x-auto'>
        <div className='flex pl-12 pt-8 pb-12 space-x-[25px]'>
          {
            tasks.map((task, index) => {
              const zIndex = tasks.length - index;
              return (
                <div key={index} className="relative" style={{ zIndex }}>
                  <div className="absolute top-1/2 -left-1/4 transform -translate-x-1/2 -translate-y-3/4 -z-10">
                    {(index > '0') && <hr className="w-[75px] h-1 bg-black border-0" />}
                  </div>
                  <div className="absolute top-1/2 left-[100%] transform -translate-x-1/2 -translate-y-3/4 -z-10">
                    {(index === (tasks.length - 1)) && <hr className="w-[75px] h-1 border-0 opacity-0" />}
                  </div>
                  <div className='absolute -bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-xs text-center self-center font-bold'>
                    {shortenString(task.name, 14)}
                  </div>
                  <div className='relative hover:scale-110 transition group duration-100'>
                    <button
                      value={index}
                      onClick={() => handleTaskView(task)}
                    >
                      {(index < currentTaskIndex || (index === currentTaskIndex && currentTaskID === -1)) && (
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-3xl text-center select-none z-50 pointer-events-none'>
                          ✓
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
      <div className={`opacity-0 transition-opacity duration-300 ${visible && 'opacity-95'}`}>
        <div className='absolute -top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full p-4 bg-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)] rounded-xl overflow-visible'>
          <div className='flex space-x-4 text-xs'>
            <div>
              TID: {hoveredTask.id}
            </div>
            <div>
              Due date: {convertDateTimeString(hoveredTask.dueDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadmapViewer