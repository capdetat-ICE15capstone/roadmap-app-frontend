import React, { useState, useEffect } from 'react'
import { nodeShapeGenerator } from '../functions/viewFunction';
import { shortenString } from '../functions/formatFunction';

function RoadmapViewer({ tasks, currentTaskID }) {

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  useEffect(() => {
    let reachedCurrentTask = false;
    tasks.forEach((task, index) => {
      if (task.id === currentTaskID) {
        reachedCurrentTask = true;
        setCurrentTaskIndex(index);
        console.log(index);
      }
    });
  }, [])

  return (
    <div className='flex px-8 pt-4 pb-12 space-x-[25px] overflow-x-auto'>
      {
        tasks.map((task, index) => {
          const zIndex = 10 - index;
          return (
            <div key={index} className="relative" style={{ zIndex }}>
              <div className="absolute top-1/2 -left-1/4 transform -translate-x-1/2 -translate-y-3/4 -z-10">
                {(index > '0') && <hr className="w-[75px] h-1 bg-black border-0" />}
              </div>
              <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30px] text-xs text-center font-bold'>
                {shortenString(task.name, 14)}
              </div>
              <button onClick={() => {
              }}>
                {(index < currentTaskIndex) && (
                  <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-3xl text-center select-none z-50 pointer-events-none'>
                    ✓
                  </div>
                )}
                {(index > currentTaskIndex) && (
                  <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-2xl text-center select-none z-50 pointer-events-none'>
                    🔒
                  </div>
                )}
                {nodeShapeGenerator(task.nodeShape, task.nodeColor, index, currentTaskIndex)}
              </button>
            </div>
          );
        })
      }
    </div>
  )
}

export default RoadmapViewer