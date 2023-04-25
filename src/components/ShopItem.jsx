import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import placeholderImage from "../assets/shop_assests/eno_orange.png"

function ShopItem({ item, handleSelect }) {

  function handleClick() {
    handleSelect(item);
  }

  return (
    <>
      <motion.div
        className='flex flex-col bg-white border border-gray-300 rounded-2xl shadow-md p-2 w-60'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          type: "easeInOut",
          duration: "0.5"
        }}
      >
        <div className="h-full w-full flex items-center justify-center p-3">
          <img src={item.imgSrc} alt={item.imgSrc} className="rounded-xl max-h-[200px]"/>
        </div>
        
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
      </motion.div>
    </>
  )
}

export default ShopItem