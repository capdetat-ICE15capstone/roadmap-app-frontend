import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { AnimatePresence, motion } from 'framer-motion';

const Spinner = ({ className = "z-50", visible }) => {
  const variants = {
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
        <motion.div
          initial="fadeInitial"
          animate="fadeAnimate"
          exit="fadeExit"
          variants={variants}
          className={`fixed bg-black opacity-0 flex justify-center inset-0 w-full h-full ${className}`}
        >
          <Logo className="animate-spin h-1/3 w-1/3 self-center justify-self-center"></Logo>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Spinner;
