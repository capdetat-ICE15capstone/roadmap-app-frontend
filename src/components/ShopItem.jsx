import React from 'react'
import { motion } from 'framer-motion';
import placeholderImage from "../assets/shop_assests/eno_orange.png"

function ShopItem({ item, handleSelect }) {
  const { imageName } = 'eno_orange.png';
  const imagePath = `../assets/shop_assests/${imageName}`;

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
        <img src={(imagePath)} alt={item.imageName} className="rounded-xl h-full w-full" />
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