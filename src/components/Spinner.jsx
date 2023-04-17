import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";

const Spinner = ({ className = "z-50" }) => {
  return (
    <div
      className={`fixed bg-gray-600 opacity-50 flex justify-center inset-0 w-full h-full ${className}`}
    >
      <Logo className="animate-spin h-1/3 w-1/3 self-center justify-self-center"></Logo>
    </div>
  );
};

export default Spinner;
