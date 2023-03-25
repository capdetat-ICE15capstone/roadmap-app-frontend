import React from "react";
import { useNavigate } from "react-router";

const featureData = [
  {
    imgSrc: "./src/assets/intro/1.svg",
    title: "Roadmap for planning",
    body: "plan and create each task; provide a complete task description",
  },
  {
    imgSrc: "./src/assets/intro/2.svg",
    title: "Plan start time and deadline",
    body: "input the start and due date for each task",
  },
  {
    imgSrc: "./src/assets/intro/3.svg",
    title: "Create subtask",
    body: "create subtask under each main task and update the working progress by using checkbox",
  },
  {
    imgSrc: "./src/assets/intro/4.svg",
    title: "Ordering the task",
    body: "Organize and priotitize the tasks within the roadmap in order of importance",
  },
  {
    imgSrc: "./src/assets/intro/5.svg",
    title: "Archive",
    body: "Remove the completed or inactive roadmap from the active list; access them later in the user profile",
  },
];

const howItWorkData = [
  {
    imgSrc: "./src/assets/intro/6.svg",
    title: "Feed",
    body: "Provide the randomly selected different public roadmaps for each user",
  },
  {
    imgSrc: "./src/assets/intro/7.svg",
    title: "Search",
    body: "Search the roadmap by using title, tags, or roadmap creator's username; search for other user by their username",
  },
  {
    imgSrc: "./src/assets/intro/8.svg",
    title: "Interact with other users' roadmap",
    body: "View, clone or rate other users' roadmaps, as long as those roadmaps are not set as private",
    extra: "p-2",
  },
  {
    imgSrc: "./src/assets/intro/9.svg",
    title: "XP",
    body: "Earn experience point (XP) for completing tasks",
  },
  {
    imgSrc: "./src/assets/intro/10.svg",
    title: "Points",
    body: "Earn points for completing the daily quest; point can be exchanged into items",
  },
];

const Introduction = () => {
  const navigate = useNavigate();

  const getRoadmap = () => {
    // this function return 4 roadmap panel

    // temporary img to used for placeholder
    const pictureLink = [
      "https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/hu_tao/header_image.png?strip=all&quality=10&w=900",
      "https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/hu_tao/header_image.png?strip=all&quality=10&w=900",
      "https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/hu_tao/header_image.png?strip=all&quality=10&w=900",
      "https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/hu_tao/header_image.png?strip=all&quality=10&w=900",
    ];

    return (
      <>
        <div className="flex px-10">
          {pictureLink.map((rm) => {
            return (
              <div className="h-20 w-auto">
                <img src={rm}></img>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="h-20 w-full sticky flex justify-between items-center">
        <div className="m-4">
          <img src="./src/assets/intro/logo.svg" className="inline-block mr-2"></img>
          <img src="./src/assets/intro/MileMap.svg" className="inline-block"></img>
        </div>
        <div className="flex items-center">
          {/* this path is only temporary */}
          <button
            className="m-4 font-bold"
            type="button"
            onClick={() => navigate("/premium")}
          >
            Premium
          </button>
          <button
            className="m-4 font-bold"
            type="button"
            onClick={() => navigate("/explore")}
          >
            Explore
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="bg-dark-blue text-white font-bold rounded-md m-4 h-10 w-20"
          >
            Log in
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row bg-gray-background justify-between">
        <div className="flex flex-col items-start justify-center p-10 gap-4">
          <h1 className="text-dark-blue text-5xl font-bold">
            Manage your task more effectively, Stay on tracks with your goal!
          </h1>
          <h3 className="font-semibold text-xl">
            creating roadmap, tracking progress, interacting with other roadmap
          </h3>
          <button
            type="button"
            className="rounded-md bg-button-pink font-bold text-white p-2 text-2xl px-6"
            onClick={() => navigate("/login")}
          >
            Try MileMap!
          </button>
        </div>
        <div className="m-10 basis-2/5 flex items-center justify-center">
          <img src="./src/assets/intro/0.svg" className="max-w-xl"></img>
        </div>
      </div>
      <div className="px-10 flex flex-col gap-12 mb-12">
        <div className="flex flex-col gap-10">
          <div className="flex justify-center">
            <h1 className="font-bold text-xl">How it works</h1>
          </div>
          <div className="grid grid-cols-5 grid-rows-2 grid-flow-col-dense">
            {featureData.map((data) => {
              return (
                <>
                  <div className="flex justify-center" >
                    <img src={data.imgSrc} className={`${data.extra ? data.extra : ""}`}></img>
                  </div>
                  <div className="grid grid-rows-3">
                    <h1 className="text-xl font-bold text-center row-span-1">
                      {data.title}
                    </h1>
                    <h1 className="text-center row-span-2">{data.body}</h1>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex justify-center">
            <h1 className="text-xl font-bold">Other Features</h1>
          </div>
          <div className="grid grid-cols-5 grid-rows-2 grid-flow-col-dense">
            {howItWorkData.map((data) => {
              return (
                <>
                  <div className="flex justify-center">
                    <img
                      src={data.imgSrc}
                      className={`${data.extra ? data.extra : ""}`}
                    ></img>
                  </div>
                  <div className="grid grid-rows-3">
                    <h1 className="font-bold text-xl text-center row-span-1">
                      {data.title}
                    </h1>
                    <h1 className="text-center row-span-2">{data.body}</h1>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-blue-900 h-40 flex">{getRoadmap()}</div>
    </>
  );
};

export default Introduction;
