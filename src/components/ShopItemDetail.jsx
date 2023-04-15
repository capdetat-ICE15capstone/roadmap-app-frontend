import React, { useState } from 'react'
import placeholderImage from "../assets/roadmap_assets/Placeholder_Image.png"
import Prompt from './Prompt';

function ShopItemDetail({ item, points, handlePoints, handleClose }) {

  const [isConfirming, setIsConfirming] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isFalied, setIsFailed] = useState(false);

  function handleConfirm() {
    setIsConfirming(true);
  }

  function handleExchange() {
    if (points > item.cost) {
      handlePoints(points - item.cost);
      setIsComplete(true);
      setIsConfirming(false);
    } else {
      setIsFailed(true);
      setIsConfirming(false);
    }
  }

  return (
    <>
      <div className={`fixed inset-0 z-50`}>
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className='flex flex-col bg-white rounded-2xl shadow-md p-2 w-60'>
            <img src={placeholderImage} className="rounded-xl h-full w-full" />
            <div className='flex flex-col space-y-4 pt-2'>
              <div className='flex justify-between m-2'>
                <div className='font-bold'>
                  {item.name}
                </div>
                <div>
                  P {item.cost}
                </div>
              </div>
              <div className='m-2'>
                {item.description}
              </div>
              <div className='flex justify-center space-x-2'>
                <button onClick={handleConfirm} type="button" className="w-1/2 bg-yellow-400 text-white shadow font-bold py-2 rounded-lg transition ease-in-out hover:bg-yellow-600 duration-300">
                  Exchange
                </button>
                <button onClick={handleClose} type="button" className="w-1/2 bg-gray-500 text-white shadow font-bold py-2 rounded-lg transition ease-in-out hover:bg-gray-700 duration-300">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black opacity-50 w-full h-full"></div>
      </div>
      {isConfirming && (
        <Prompt title="Confirm Exchange" message="Are you sure you want to exhange your points for this item?" positiveText="Yes" negativeText="No" positiveFunction={() => handleExchange()} negativeFunction={() => setIsConfirming(false)} />
      )}
      {isComplete && (
        <Prompt title="Sucessful Exchange" message="Congratulations! You have successfully exchange for this item!" positiveText="Okay" positiveFunction={() => setIsComplete(false)} />
      )}
      {isFalied && (
        <Prompt title="Failed Exchange" message="Insufficient points." positiveText="Okay" positiveFunction={() => setIsFailed(false)} />
      )}
    </>
  )
}

export default ShopItemDetail