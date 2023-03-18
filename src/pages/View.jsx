import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LineTo from 'react-lineto';

function View() {

  const [roadmap, setRoadmap] = useState({
    name: 'Dummy Roadmap',
    description: 'none',
    publicity: true,
    tasks: [{
      'id': '1',
      'name': 'start',
      'description': 'none',
      'startDate': '20200110',
      'dueDate': '20200115',
      'nodeColor': 'green',
      'nodeShape': 'circle',
      'subtasks': [{
        'id': '1',
        'detail': 'none',
        'status': false,
      }]
    }]
  });

  const description = "Morbi facilisis finibus lacus quis aliquam. Vestibulum turpis nibh, imperdiet non gravida quis, pretium vitae est. Phasellus in sollicitudin quam, id lacinia nisl. Suspendisse non commodo est. Vestibulum ut mauris fermentum, laoreet ex sed, elementum ante. Sed mollis neque vel purus laoreet condimentum.";

  console.log(roadmap);

  return (
    <div>
      <div className='flex h-screen bg-gray-200 overflow-y-scroll'>
        <div className="container w-5/6 flex-col m-auto py-8 space-y-4">
          <div className='flex flex-col bg-white rounded-lg shadow-lg p-4 space-y-4'>
            <div className='flex justify-between'>
              <div className='text-3xl font-extrabold'>
                Lorem Ipsum
              </div>
              <button className="bg-transparent text-gray-600 border border-grey-500 px-4 py-2 font-semilight rounded-lg text-sm" type="button">
                Expand/Collapse
              </button>
            </div>
            <div className='flex flex-col bg-slate-100 rounded p-4 text-sm'>
              #lorem #ipsum
            </div>
            <div className='flex flex-col bg-slate-100 rounded p-4 text-sm'>
              {description}
            </div>
            <div className="flex space-x-4">
              <button className="bg-transparent grow text-gray-600 border border-grey-500 px-4 py-2 font-semilight rounded-lg text-sm" type="button">
                Button A
              </button>
              <button className="bg-transparent grow text-gray-600 border border-grey-500 px-4 py-2 font-semilight rounded-lg text-sm" type="button">
                Button B
              </button>
              <button className="bg-transparent grow text-gray-600 border border-grey-500 px-4 py-2 font-semilight rounded-lg text-sm" type="button">
                Button C
              </button>
            </div>
          </div>
          <div className='flex bg-white rounded-lg shadow-lg p-4 overflow-x-auto'>
            <div className='flex m-8'>
              <div className='flex items-center'>
                <div className='p-4 rounded-full bg-slate-500 text-white'>
                  01
                </div>
              </div>
              <div className='flex items-center'>
                <hr className="w-8 h-1 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
                <div className='p-4 rounded-full bg-slate-500 text-white'>
                  02
                </div>
              </div>
              <div className='flex items-center'>
                <hr className="w-8 h-1 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
                <div className='p-4 rounded-full bg-slate-500 text-white'>
                  03
                </div>
              </div>
              <div className='flex items-center'>
                <hr className="w-8 h-1 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
                <div className='p-4 rounded-full bg-slate-500 text-white'>
                  04
                </div>
              </div>
              <div className='flex items-center'>
                <hr className="w-8 h-1 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
                <div className='p-4 rounded-full bg-slate-500 text-white'>
                  05
                </div>
              </div>
              <div className='flex items-center'>
                <hr className="w-8 h-1 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
                <div className='p-4 rounded-full bg-slate-500 text-white'>
                  06
                </div>
              </div>
              <div className='flex items-center'>
                <hr className="w-8 h-1 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
                <div className='p-4 rounded-full bg-slate-500 text-white'>
                  07
                </div>
              </div>
              <div className='flex items-center'>
                <hr className="w-8 h-1 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
                <div className='p-4 rounded-full bg-slate-500 text-white'>
                  08
                </div>
              </div>
              <div className='flex items-center'>
                <hr className="w-8 h-1 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
                <div className='p-4 rounded-full bg-slate-500 text-white'>
                  09
                </div>
              </div>
              <div className='flex items-center'>
                <hr className="w-8 h-1 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
                <div className='p-4 rounded-full bg-slate-500 text-white'>
                  10
                </div>
              </div>
              <div className='flex items-center'>
                <hr className="w-8 h-1 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
                <div className='p-4 rounded-full bg-slate-500 text-white'>
                  11
                </div>
              </div>
              <div className='flex items-center'>
                <hr className="w-8 h-1 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
                <div className='p-4 rounded-full bg-slate-500 text-white'>
                  12
                </div>
              </div>
            </div>
          </div>
          <div className='flex bg-white rounded-lg shadow-lg p-4'>
            <div className='flex flex-col bg-white p-4 space-y-2 w-1/2'>
              <div className='font-bold'>
                Lorem Ipsum
              </div>
              <div className='text-sm'>
                {description}
              </div>
              <div className='flex space-x-2'>
                <div className='bg-green-100 grow font-bold text-center p-2'>
                  Date-1 : ...........
                </div>
                <div className='bg-red-100 grow font-bold text-center p-2'>
                  Date-2 : ...........
                </div>
              </div>
            </div>
            <div className='flex flex-col bg-white p-4 space-y-2 w-1/2 shrink-0'>
              <div className='font-bold'>
                Lorem Ipsum
              </div>
              <div className='flex flex-col justify-center space-y-2 text-sm'>
                <div className='bg-yellow-100 p-2'>
                  Sed maximus, lacus eget faucibus tempor
                </div>
                <div className='bg-orange-100 p-2'>
                  Vestibulum turpis nibh, imperdiet non gravida quis
                </div>
                <div className='bg-red-100 p-2'>
                  Phasellus in sollicitudin quam, id lacinia nisl.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default View