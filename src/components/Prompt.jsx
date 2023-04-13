import React from 'react';

function Prompt({ title, message, positiveText, cancelText, positiveFunction, negativeFunction }) {

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="flex flex-col rounded-2xl p-4 bg-white space-y-4 shadow-lg">
          <div className='text-center'>
            {message}
          </div>
          <div className={`${(cancelText && positiveText) && 'space-x-2'} flex justify-center`}>
            <button
              onClick={negativeFunction}
              className={`${cancelText ? 'visible' : 'hidden'} ${positiveText && 'w-1/2'} bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-bold`}
              type="button">
              {cancelText}
            </button>
            <button
              onClick={positiveFunction}
              className={`${positiveText ? 'visible' : 'hidden'} ${cancelText && 'w-1/2'} bg-sub-blue text-white px-4 py-2 rounded-full text-sm font-bold`}
              type="button"
            >
              {positiveText}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-black opacity-50 w-full h-full"></div>
    </div>
  )
}

export default Prompt