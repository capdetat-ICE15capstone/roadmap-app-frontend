import React from 'react';

function Prompt({ message, confirmFunction, cancelFunction }) {

  // useEffect(() => {

  // }, [])
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="flex flex-col rounded-2xl p-4 bg-white space-y-4 shadow-lg">
          <div className='text-center'>
            {message}
          </div>
          <div className='flex space-x-2'>
            <button onClick={cancelFunction} className="bg-gray-400 w-1/2 text-white px-4 py-2 rounded-full text-sm font-bold" type="button">
              Cancel
            </button>
            <button
              onClick={confirmFunction}
              className="bg-sub-blue w-1/2 text-white px-4 py-2 rounded-full text-sm font-bold"
              type="button">
              Confirm
            </button>
          </div>
        </div>
      </div>
      <div className="bg-black opacity-50 w-full h-full"></div>
    </div>
  )
}

export default Prompt