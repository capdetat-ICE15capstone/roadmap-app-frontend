import React from 'react';
import { convertDateTimeString } from '../functions/formatFunction';
import { AnimatePresence, motion } from 'framer-motion';

function PopUpTaskViewer({ visible, task, handleCloseWindow }) {
  const variants = {
    initial: {
      opacity: 0,
      y: -5
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    exit: {
      opacity: 0,
      y: 5,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    fadeIntial: {
      opacity: 0,
    },
    fadeAnimate: {
      opacity: 0.5,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    },
    fadeExit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className='flex flex-col bg-[#e6eefc] rounded-2xl'>
              <div className="flex items-center rounded-t-xl bg-gradient-to-b from-blue-900 to-main-blue">
                <div className='text-xl text-white font-bold mx-4 my-2'>
                  {task.name}
                </div>
              </div>
              <div className='flex xs:flex-row max-xs:flex-col'>
                <div className='flex flex-col justify-center space-y-4 xs:w-1/2 max-xs:w-full p-4'>
                  <div className='text-sm break-words'>
                    {task.description}
                  </div>
                  <div className='flex flex-col md:flex-row md:space-x-2 max-md:space-y-2'>
                    <div className='grow font-bold text-center text-xs'>
                      Start: {convertDateTimeString(task.startDate)}
                    </div>
                    <div className='grow font-bold text-center text-xs'>
                      Due: {convertDateTimeString(task.dueDate)}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col xs:w-1/2 max-xs:w-full  p-4 bg-[#f5f8fd] xs:rounded-r-2xl max-xs:rounded-b-2xl justify-end'>
                  <div className='flex flex-col justify-center space-y-4 text-sm break-all'>
                    {task.subtasks.map((subtask, index) => {
                      return (
                        <label key={index} className='flex items-center'>
                          <input
                            type="checkbox"
                            disabled={true}
                            className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 accent-slate-500 rounded pointer-events-none shrink-0"
                            defaultChecked={subtask.status}
                          />
                          {subtask.detail}
                        </label>
                      )
                    })}
                    <button type="button" onClick={handleCloseWindow} className="bg-nav-blue text-white shadow font-bold py-2 px-4 rounded-full transition ease-in-out hover:bg-mid-blue duration-300">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial="fadeInitial"
            animate="fadeAnimate"
            exit="fadeExit"
            variants={variants}
            className="bg-black opacity-0 w-full h-full"
          />
        </div>
      )}
    </AnimatePresence>
  )
}

PopUpTaskViewer.defaultProps = {
  visible: false
};

export default PopUpTaskViewer