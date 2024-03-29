import React, { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion"

const LockUnlockButton = ({ isLock, fillColor = "white", className }) => {
  const animation = useAnimationControls();

  useEffect(() => {
    spinAnimation();
  }, [isLock]) 

  const spinAnimation = async () => {
    await animation.start({rotate: 360});
    await animation.start({rotate: 0});
  }

  return (
    <>
      {isLock ? (
        <motion.svg
          width="18"
          height="23"
          viewBox="0 0 18 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className ?? ""}
          animate={animation}
          transition={{duration:0.5}}
        >
          <path
            d="M15.4999 7.66683H14.4166V5.50016C14.4166 2.51016 11.9899 0.0834961 8.99992 0.0834961C6.00992 0.0834961 3.58325 2.51016 3.58325 5.50016V7.66683H2.49992C1.30825 7.66683 0.333252 8.64183 0.333252 9.8335V20.6668C0.333252 21.8585 1.30825 22.8335 2.49992 22.8335H15.4999C16.6916 22.8335 17.6666 21.8585 17.6666 20.6668V9.8335C17.6666 8.64183 16.6916 7.66683 15.4999 7.66683ZM8.99992 17.4168C7.80825 17.4168 6.83325 16.4418 6.83325 15.2502C6.83325 14.0585 7.80825 13.0835 8.99992 13.0835C10.1916 13.0835 11.1666 14.0585 11.1666 15.2502C11.1666 16.4418 10.1916 17.4168 8.99992 17.4168ZM12.3583 7.66683H5.64158V5.50016C5.64158 3.64766 7.14742 2.14183 8.99992 2.14183C10.8524 2.14183 12.3583 3.64766 12.3583 5.50016V7.66683Z"
            fill={fillColor ?? "#525252"}
          />
        </motion.svg>
      ) : (
        <motion.svg
          width="18"
          height="23"
          viewBox="0 0 18 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className ?? ""}
          animate={animation}
          transition={{duration:0.5}}
        >
          <path
            d="M8.66667 17.3333C9.85833 17.3333 10.8333 16.3583 10.8333 15.1667C10.8333 13.975 9.85833 13 8.66667 13C7.475 13 6.5 13.975 6.5 15.1667C6.5 16.3583 7.475 17.3333 8.66667 17.3333ZM15.1667 7.58333H14.0833V5.41667C14.0833 2.42667 11.6567 0 8.66667 0C5.67667 0 3.25 2.42667 3.25 5.41667H5.30833C5.30833 3.56417 6.81417 2.05833 8.66667 2.05833C10.5192 2.05833 12.025 3.56417 12.025 5.41667V7.58333H2.16667C0.975 7.58333 0 8.55833 0 9.75V20.5833C0 21.775 0.975 22.75 2.16667 22.75H15.1667C16.3583 22.75 17.3333 21.775 17.3333 20.5833V9.75C17.3333 8.55833 16.3583 7.58333 15.1667 7.58333ZM15.1667 20.5833H2.16667V9.75H15.1667V20.5833Z"
            fill={fillColor ?? "#525252"}
          />
        </motion.svg>
      )}
      <span className={`[@media(max-width:360px)]:hidden md:hidden lg:block font-bold ${isLock ? "text-white" : "text-nav-blue" }`}>
        {isLock ? "Private" : "Public"}
      </span>
    </>
  );
};

export default LockUnlockButton;
