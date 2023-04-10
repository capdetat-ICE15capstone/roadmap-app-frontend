import React, { useState, useEffect } from 'react'
import { nodeShapeGenerator } from '../functions/viewFunction';
import { shortenString } from '../functions/formatFunction';

function RoadmapViewer({ tasks, currentTaskID }) {

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  useEffect(() => {
    if (currentTaskID === -1) {
      setCurrentTaskIndex(tasks.length - 1);
    } else {
      let reachedCurrentTask = false;
      tasks.forEach((task, index) => {
        if (task.id === currentTaskID) {
          reachedCurrentTask = true;
          setCurrentTaskIndex(index);
          console.log(index);
        }
      });
    }
  }, [tasks])

  // return (
  //   <div className="relative">
  //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  //       Hover me
  //     </button>
  //     <div className="absolute bg-blue-500 text-white rounded-lg py-2 px-4 whitespace-no-wrap opacity-0 hover:opacity-100">
  //       This is a bubble
  //       <svg className="absolute text-blue-500 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
  //         <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
  //       </svg>
  //     </div>
  //   </div>
  // )

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
                {(index < currentTaskIndex || (index === currentTaskIndex && currentTaskID === -1)) && (
                  <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-3xl text-center select-none z-50 pointer-events-none'>
                    ✓
                  </div>
                )}
                {(index > currentTaskIndex) && (
                  <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] text-2xl text-center select-none z-50 pointer-events-none'>
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