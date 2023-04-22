import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { AnimatePresence, motion } from 'framer-motion';

const SpinnerNeo = ({ className = "z-50", visible }) => {
  const variants = {
    fadeIntial: {
      opacity: 0.5,
    },
    fadeAnimate: {
      opacity: 0.5,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    fadeExit: {
      opacity: 0,
      transition: {
        duration: 0.3,
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
          className={`fixed bg-gray-500 opacity-0 flex justify-center inset-0 w-full h-full ${className}`}
        >
          <Logo className="animate-spin h-1/3 w-1/3 self-center justify-self-center"></Logo>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

SpinnerNeo.defaultProps = {
  visible: false
};

export default SpinnerNeo;
