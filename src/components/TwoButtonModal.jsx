import React from "react";
import { ReactComponent as Question } from "../assets/taskmodal/questionMark.svg";

function TwoButtonModal({
  isOpen,
  onLightPress = () => console.log("Light Press"),
  onDarkPress = () => console.log("Dark Press"),
  textField,
  Icon = Question,
  oneButton = false,
}) {
  return (
    <div
      className={`fixed z-[60] inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

        <div></div>
        <div className="bg-white rounded-2xl w-4/5 md:w-3/5 lg:w-2/5 z-40">
          <div className="w-full bg-blue-900 h-2/5 p-4 rounded-t-2xl flex gap-3">
            <Icon className="w-8 h-8" />
            <span className="font-bold text-white text-2xl">
              {textField.title ?? "Default Modal title"}
            </span>
          </div>
          <h3 className="text-lg font-medium my-6 mx-9">
            {textField.body ?? "Default Modal body"}
          </h3>
          <div className="flex justify-end m-8">
            {oneButton ? null : (
              <button
                className="transparent border border-blue-900 text-blue-900 font-semibold px-4 py-2 rounded mr-4"
                onClick={onLightPress}
              >
                {textField.lightButtonText ?? "Light"}
              </button>
            ) }
            <button
              className="text-white font-semibold bg-blue-900 px-4 py-2 rounded"
              onClick={onDarkPress}
            >
              {textField.darkButtonText ?? "Dark"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwoButtonModal;
