import React from 'react';

function Prompt({ title, message, positiveText, negativeText, positiveFunction, negativeFunction }) {

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="flex flex-col rounded-xl bg-white shadow-lg max-w-md max-xs:max-w-xs">
          <div className="flex flex-col rounded-t-xl bg-gradient-to-b from-blue-900 to-main-blue">
            <div className={`${title ? 'visible' : 'hidden'} text-xl text-white font-bold mx-4 my-2`}>
              {title}
            </div>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            <div className='text-center'>
              {message}
            </div>
            <div className={`${(negativeText && positiveText) && 'space-x-2'} flex justify-center`}>
              <button
                onClick={negativeFunction}
                className={`${negativeText ? 'visible' : 'hidden'} ${positiveText && 'w-1/2'} bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-bold transition ease-in-out hover:bg-gray-700 duration-300`}
                type="button">
                {negativeText}
              </button>
              <button
                onClick={positiveFunction}
                className={`${positiveText ? 'visible' : 'hidden'} ${negativeText && 'w-1/2'} bg-sub-blue text-white px-4 py-2 rounded-full text-sm font-bold transition ease-in-out hover:bg-nav-blue duration-300`}
                type="button"
              >
                {positiveText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black opacity-50 w-full h-full"></div>
    </div>
  )
}

export default Prompt