import React from 'react'

import placeholderImage from "../assets/roadmap_assets/Placeholder_Image.png"

function ShopItem({ item, handleSelect }) {
  function handleClick() {
    handleSelect(item);
  }

  return (
    <>
      <div className='flex flex-col bg-white rounded-2xl shadow-md p-2 w-60'>
        <img src={placeholderImage} className="rounded-xl h-full w-full" />
        <div className='flex flex-col space-y-2 pt-2'>
          <div className='font-bold'>
            {item.name}
          </div>
          <div>
            P {item.cost}
          </div>
          <button onClick={() => handleClick()} type="button" className="bg-nav-blue text-white shadow font-bold py-2 rounded-lg transition ease-in-out hover:bg-sub-blue duration-300">
            Details
          </button>
        </div>
      </div>
    </>
  )
}

export default ShopItem