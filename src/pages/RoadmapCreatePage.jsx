import React, { useRef, useState } from "react";

const RoadmapCreatePage = () => {
  const [RMName, setRMName] = useState("");
  const [RMDesc, setRMDesc] = useState("")

  const onPressingSaveButton = (e) => {
    e.preventDefault(); // stop the page from reloading when submitting the form, may remove in the future
    console.log({
      name: RMName,
      description: RMDesc
    });
  };

  return (
    <>
      <div>
        <div className="text-4xl font-inter font-bold ml-10 mt-10">
          Create your roadmap
        </div>
        <form onSubmit={onPressingSaveButton}>
          <div>
            <label>Name: </label>
            <input
              className="border-4 border-emerald-400 rounded-md text-4xl"
              type="text"
              value={RMName}
              onChange={e => setRMName(e.target.value)}
            />
          </div>

          <label>Description: </label>
          <textarea
            className="border ml-2 border-emerald-400 block text-2xl"
            rows={10}
            cols={60}
            value={RMDesc}
            onChange={e => setRMDesc(e.target.value)}
          ></textarea>
          <button className="rounded-xl bg-emerald-400 text-white font-bold hover:bg-yellow-300 transition duration-200 w-20 h-10 fixed right-2 bottom-2">
            Save
          </button>
        </form>

        <div>
          <p className="text-4xl font-inter font-bold ml-10 mt-10 break-word w-32">
            {RMName}
          </p>
        </div>
      </div>
    </>
  );
};

export default RoadmapCreatePage;
