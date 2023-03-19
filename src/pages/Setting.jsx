import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRoadmap } from "../functions/roadmapFunction";

const Setting = () => {
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    const getTestRoadmap = async () => {  
      const rm = await getRoadmap("1");
      setRoadmap(rm);
    }
    getTestRoadmap();
  }, [])

  const onGoPress = (noState) => {
    if (!noState) {
      console.log("log with state");
      navigate("/edit/1", {
        state: {
          roadmap: roadmap
        },
      });
    } else {
      console.log("log with out state");
      navigate("/edit/1");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => onGoPress(false)}
        className="bg-red-400 rounded-md h-10 w-20 m-2"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => onGoPress(true)}
        className="bg-emerald-400 rounded-md h-10 w-20 m-2"
      >
        EditNS
      </button>
    </>
  );
};

export default Setting;
