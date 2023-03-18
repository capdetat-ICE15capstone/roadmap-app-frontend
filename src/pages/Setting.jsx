import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  const [fetchOption, setFetchOption] = useState("");
  const [mode, setMode] = useState("");
  const data = { rid: "1" };

  const onGoPress = (noState) => {
    if (!noState) {
      navigate("/createroadmap", {
        state: {
          fetchOption: fetchOption,
          mode: "fork",
          data: data,
        },
      });
    } else {
      navigate("/createroadmap");
    }
  };

  const handleFetchOptionChange = (e) => {
    console.log(e.target.value);
    setFetchOption(e.target.value);
  };

  const handleModeChange = (e) => {
    console.log(e.target.value);
    setMode(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        onChange={handleFetchOptionChange}
        className="border border-black m-2"
      ></input>
      <select
        value={mode}
        onChange={handleModeChange}
        className="border border-black m-2"
      >
        <option value="fork">Fork</option>
        <option value="edit">Edit</option>
      </select>
      <button
        type="button"
        onClick={() => onGoPress(false)}
        className="bg-red-400 rounded-md h-10 w-20 m-2"
      >
        GoCreate
      </button>
      <button
        type="button"
        onClick={() => onGoPress(true)}
        className="bg-emerald-400 rounded-md h-10 w-20 m-2"
      >
        NoState
      </button>
    </>
  );
};

export default Setting;
