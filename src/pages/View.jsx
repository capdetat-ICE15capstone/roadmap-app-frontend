import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function View() {
  const navigate = useNavigate();
  
  const [currentMilestone, setCurrentMilestone] = useState('1');
  const [currentDetail, setCurrentDetail] = useState("");
  const [detailToggle, setCurrentDetailToggle] = useState(true);

  function MilestoneDetails(props) {
    const current = parseInt(props.milestone);
    return (
      <div className='flex flex-col bg-gray-100 rounded-2xl shadow-sm space-y-4'>
        <div className='flex flex-row space-x-4 justify-between'>
          <div className='flex flex-col space-y-2 w-1/2 p-4'>
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
          <div className='flex flex-col space-y-2 w-1/2 p-4 bg-gray-50 rounded'>
            <div className='font-bold'>
              Sub-Tasks
            </div>
            <div className='flex flex-col justify-center space-y-2 text-sm'>
              {roadmap.tasks[current - 1].subtasks.map(subtask => {
                return (
                  <label key={subtask.id}>
                    <input
                      type="checkbox"
                      className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded"
                      defaultChecked={subtask.status ? true : false}
                      onChange={() => {
                        let res = { ...roadmap };
                        res.tasks[current - 1].subtasks[subtask.id - 1].status = !subtask.status;
                        setRoadmap(res);
                      }
                      }
                    />
                    {subtask.detail}
                  </label>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  function RoadmapDetails(props) {
    return (
      <>
        <div className='flex justify-between items-center'>
          <div className='text-3xl font-extrabold'>
            {roadmap.name}
          </div>
          <div className="flex space-x-1">
            <button onClick={()=>console.log("like!")} className="bg-sub-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
              Like
            </button>
            <button onClick={()=>navigate("/edit", {'state': {'roadmap' : roadmap}})} className="bg-gray-300 grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
              Edit
            </button>
            <button onClick={() => setCurrentDetailToggle(!detailToggle)} className="bg-gray-300 grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
              i
            </button>
          </div>
        </div>
        <div className={`${(detailToggle) ? 'visible' : 'hidden'}`}>
          <div className='flex flex-col bg-gray-100 rounded-2xl shadow-sm p-4 text-sm space-y-2'>
            <div className='font-bold'>
              Publicity: {roadmap.publicity ? "Public" : "Private"}
            </div>
            <div>
              {roadmap.description}
            </div>
          </div>
        </div>
      </>
    )
  }

  function RoadmapDisplay(props) {
    const roadmap_props = props.roadmap;

    return (
      <div className='flex bg-gray-100 rounded-2xl shadow-sm p-4 overflow-x-auto'>
        <div className='flex m-8'>
          {roadmap_props.tasks.map(task => {
            const subtasks = task.subtasks;
            let currentActiveTask = '1';
            let status = true;
            for (var i = 0; i < subtasks.length; i++) {
              if (subtasks[i].status === false) {
                status = false;
                currentActiveTask = task.id;
                break;
              }
            }
            if (status === true) {
              if (task.id != '1') {
                return (
                  <div key={task.id} className='flex items-center'>
                    <hr className="w-8 h-1 bg-gray-400 border-0 md:my-10" />
                    <button
                      id={task.id}
                      className={`${(task.id === currentMilestone) ? 'bg-gray-800' : 'bg-gray-400'} hover:bg-black p-4 rounded-full focus:bg-green text-white`}
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
                      className={`${(task.id === currentMilestone) ? 'bg-gray-800' : 'bg-gray-400'} hover:bg-black p-4 rounded-full focus:bg-green text-white`}
                      onClick={() => {
                        setCurrentMilestone(task.id);
                      }}
                    >
                      {task.id}
                    </button>
                  </div>
                );
              }
            }
            if (task.id != '1') {
              return (
                <div key={task.id} className='flex items-center'>
                  <hr className="w-8 h-1 bg-gray-400 border-0 md:my-10" />
                  <button
                    id={task.id}
                    className={`${(task.id === currentMilestone) ? 'bg-gray-800' : 'bg-gray-600'} hover:bg-black p-4 rounded-full focus:bg-green text-white`}
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
                    className={`${(task.id === currentMilestone) ? 'bg-gray-800' : 'bg-gray-600'} hover:bg-black p-4 rounded-full focus:bg-green text-white`}
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
    );
  }

  const [roadmap, setRoadmap] = useState({
    'name': 'Lorem Ipsum Roadmap',
    'description': 'Morbi facilisis finibus lacus quis aliquam. Vestibulum turpis nibh, imperdiet non gravida quis, pretium vitae est. Phasellus in sollicitudin quam, id lacinia nisl.',
    'publicity': true,
    'tasks': [
      {
        'id': '1',
        'name': 'First Task',
        'description': 'Task descriptions. This is the task for the first milestone.',
        'startDate': '20200110',
        'dueDate': '20200115',
        'nodeColor': 'green',
        'nodeShape': 'circle',
        'subtasks': [
          {
            'id': '1',
            'detail': 'Morbi facilisis finibus lacus quis aliquam.',
            'status': true,
          },
          {
            'id': '2',
            'detail': 'Vestibulum turpis nibh.',
            'status': true,
          }
        ]
      },
      {
        'id': '2',
        'name': 'Second Task',
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
        'name': 'Third Task',
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

  return (
    <div>
      <div className='flex h-screen bg-white overflow-y-scroll'>
        <div className="container w-5/6 flex-col m-auto py-8 space-y-6">
          <RoadmapDetails />
          <RoadmapDisplay roadmap={roadmap} />
          <MilestoneDetails milestone={currentMilestone} />
          <div className="flex flex-col space-y-2">
            <button onClick={()=>console.log("save!")} className="bg-main-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default View