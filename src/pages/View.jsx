import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function View() {
  const [currentMilestone, setCurrentMilestone] = useState('1');
  const [currentDetail, setCurrentDetail] = useState("");
  const [detailToggle, setCurrentDetailToggle] = useState(true);

  // useEffect(() => {
  //   return () => {
  //     console.log('test');
  //       setCurrentDetail(

  //       );
  //   }
  // }, [currentMilestone])

  function MilestoneDetails(props) {
    const current = parseInt(props.milestone);
    return (
      <div className='flex bg-white rounded-lg shadow-lg p-4'>
        <div className='flex flex-col bg-white p-4 space-y-2 w-1/2'>
          <div className='font-bold'>
            {roadmap.tasks[current - 1].name}
          </div>
          <div className='text-sm'>
            {roadmap.tasks[current - 1].description}
          </div>
          <div className='flex space-x-2'>
            <div className='bg-green-100 grow font-bold text-center p-2'>
              {roadmap.tasks[current - 1].startDate}
            </div>
            <div className='bg-red-100 grow font-bold text-center p-2'>
              {roadmap.tasks[current - 1].dueDate}
            </div>
          </div>
        </div>
        <div className='flex flex-col bg-white p-4 space-y-2 w-1/2 shrink-0'>
          <div className='font-bold'>
            Sub-Tasks
          </div>
          <div className='flex flex-col justify-center space-y-2 text-sm'>
            {roadmap.tasks.map(task => 
              {

              })
            }
            <label>
              <input
                type="checkbox"
                className="w-4 h-4S mr-2 bg-gray-100 border-gray-300 rounded"
                id="CheckRememberMe"
                onChange={() => setRememberMe(!rememberMe)}
              />
              lacus eget faucibus tempor
            </label>
          </div>
        </div>
      </div>
    )
  }

  function RoadmapDetails(props) {
    return (
      <div className='flex flex-col bg-white rounded-lg shadow-lg p-4 space-y-4'>
        <div className='flex justify-between'>
          <div className='text-3xl font-extrabold'>
            {roadmap.name}
          </div>
          <button onClick={() => setCurrentDetailToggle(!detailToggle)} className="bg-transparent text-gray-600 border border-grey-500 px-4 py-2 font-semilight rounded-lg text-sm" type="button">
            Expand/Collapse
          </button>
        </div>
        <div className={`${(detailToggle) ? 'visible' : 'hidden'}`}>
          <div className='flex flex-col bg-slate-100 rounded p-4 text-sm'>
            {roadmap.description}
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="bg-transparent grow text-gray-600 border border-grey-500 px-4 py-2 font-semilight rounded-lg text-sm" type="button">
            Modify
          </button>
          <button className="bg-transparent grow text-gray-600 border border-grey-500 px-4 py-2 font-semilight rounded-lg text-sm" type="button">
            Clone
          </button>
          <button className="bg-transparent grow text-gray-600 border border-grey-500 px-4 py-2 font-semilight rounded-lg text-sm" type="button">
            Something?
          </button>
        </div>
      </div >
    )
  }


  const [roadmap, setRoadmap] = useState({
    'name': 'Lorem Ipsum Roadmap',
    'description': 'Morbi facilisis finibus lacus quis aliquam. Vestibulum turpis nibh, imperdiet non gravida quis, pretium vitae est. Phasellus in sollicitudin quam, id lacinia nisl.',
    'publicity': true,
    'tasks': [
      {
        'id': '1',
        'name': 'start',
        'description': 'Task descriptions. This is the task for the first milestone.',
        'startDate': '20200110',
        'dueDate': '20200115',
        'nodeColor': 'green',
        'nodeShape': 'circle',
        'subtasks': [
          {
            'id': '1',
            'detail': 'Morbi facilisis finibus lacus quis aliquam.',
            'status': false,
          },
          {
            'id': '2',
            'detail': 'Vestibulum turpis nibh.',
            'status': false,
          }
        ]
      },
      {
        'id': '2',
        'name': 'second',
        'description': 'Task descriptions. This is the task for the second milestone.',
        'startDate': '20200115',
        'dueDate': '20200120',
        'nodeColor': 'blue',
        'nodeShape': 'square',
        'subtasks': [
          {
            'id': '1',
            'detail': 'Morbi facilisis finibus lacus quis aliquam.',
            'status': false,
          },
          {
            'id': '2',
            'detail': 'Vestibulum turpis nibh.',
            'status': false,
          }
        ]
      },
      {
        'id': '3',
        'name': 'third',
        'description': 'Task descriptions. This is the task for the third milestone.',
        'startDate': '20200120',
        'dueDate': '20200121',
        'nodeColor': 'yellow',
        'nodeShape': 'triangle',
        'subtasks': [
          {
            'id': '1',
            'detail': 'Morbi facilisis finibus lacus quis aliquam.',
            'status': false,
          },
          {
            'id': '2',
            'detail': 'Vestibulum turpis nibh.',
            'status': false,
          }
        ]
      }
    ]
  });

  // useEffect(() => {
  //   //Runs on the first render
  //   //And any time any dependency value changes
  // }, [currentMilestone]);

  const description = "Morbi facilisis finibus lacus quis aliquam. Vestibulum turpis nibh, imperdiet non gravida quis, pretium vitae est. Phasellus in sollicitudin quam, id lacinia nisl. Suspendisse non commodo est. Vestibulum ut mauris fermentum, laoreet ex sed, elementum ante. Sed mollis neque vel purus laoreet condimentum.";

  return (
    <div>
      <div className='flex h-screen bg-gray-200 overflow-y-scroll'>
        <div className="container w-5/6 flex-col m-auto py-8 space-y-4">
          <RoadmapDetails />
          <div className='flex bg-white rounded-lg shadow-lg p-4 overflow-x-auto'>
            <div className='flex m-8'>
              {roadmap.tasks.map(task => {
                if (task.id != '1') {
                  return (
                    <div key={task.id} className='flex items-center'>
                      <hr className="w-8 h-1 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
                      <button
                        id={task.id}
                        className='p-4 rounded-full bg-slate-500 hover:bg-black focus:bg-green text-white'
                        onClick={() => {
                          setCurrentMilestone(task.id);
                        }}
                      >
                        {task.id}
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <div key={task.id} className='flex items-center'>
                      <button
                        id={task.id}
                        className='p-4 rounded-full bg-slate-500 hover:bg-black focus:bg-green text-white'
                        onClick={() => {
                          setCurrentMilestone(task.id);
                        }}
                      >
                        {task.id}
                      </button>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <MilestoneDetails milestone={currentMilestone} />
        </div>
      </div>
    </div>
  )
}

export default View