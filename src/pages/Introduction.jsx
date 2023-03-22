import React from "react";

const featureData = [
  {
    imgSrc:
      "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Hu_Tao_Card.png/revision/latest?cb=20220725204937",
    title: "Roadmap for planning",
    body: "plan and create each task; provide a complete task description",
  },
  {
    imgSrc:
      "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Hu_Tao_Card.png/revision/latest?cb=20220725204937",
    title: "Plan start time and deadline",
    body: "input the start and due date for each task",
  },
  {
    imgSrc:
      "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Hu_Tao_Card.png/revision/latest?cb=20220725204937",
    title: "Create subtask",
    body: "create subtask under each main task and update the working progress by using checkbox",
  },
  {
    imgSrc:
      "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Hu_Tao_Card.png/revision/latest?cb=20220725204937",
    title: "Ordering the task",
    body: "Organize and priotitize the tasks within the roadmap in order of importance",
  },
  {
    imgSrc:
      "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Hu_Tao_Card.png/revision/latest?cb=20220725204937",
    title: "Archive",
    body: "Remove the completed or inactive roadmap from the active list; access them later in the user profile",
  },
];

const howItWorkData = [
  {
    imgSrc:
      "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Hu_Tao_Card.png/revision/latest?cb=20220725204937",
    title: "Feed",
    body: "Provide the randomly selected different public roadmaps for each user",
  },
  {
    imgSrc:
      "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Hu_Tao_Card.png/revision/latest?cb=20220725204937",
    title: "Search",
    body: "Search the roadmap by using title, tags, or roadmap creator's username; search for other user by their username",
  },
  {
    imgSrc:
      "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Hu_Tao_Card.png/revision/latest?cb=20220725204937",
    title: "Interact with other users' roadmap",
    body: "View, clone or rate other users' roadmaps, as long as those roadmaps are not set as private",
  },
  {
    imgSrc:
      "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Hu_Tao_Card.png/revision/latest?cb=20220725204937",
    title: "XP",
    body: "Earn experience point (XP) for completing tasks",
  },
  {
    imgSrc:
      "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Hu_Tao_Card.png/revision/latest?cb=20220725204937",
    title: "Points",
    body: "Earn points for completing the daily quest; point can be exchanged into items",
  },
];

const Introduction = () => {
  return (
    <>
      <div className="h-10 w-full sticky flex bg-slate-300 justify-between">
        <h3>Milemap</h3>
        <div className="flex">
          <h3>Premium</h3>
          <h3>Explore</h3>
          <h3>Log in</h3>
        </div>
      </div>
      <div className="w-full flex bg-slate-600">
        <div className="w-2/3">
          <h1>
            Manage your task more effectively, Stay on tracks with your goal!
          </h1>
          <h3>
            creating roadmap, tracking progress, interacting with other roadmap
          </h3>
          <button type="button" className="rounded-md bg-red-600">
            Try MileMap!
          </button>
        </div>
        <div className="w-1/3">
            <img src="https://static.wikia.nocookie.net/gensin-impact/images/8/88/Hu_Tao_Card.png/revision/latest?cb=20220725204937"></img>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <h1>How it works</h1>
        </div>

        <div className="flex">
          {featureData.map((data) => {
            return (
              <div className="flex flex-col basis-1/5 items-center">
                <img src={data.imgSrc}></img>
                <h1>{data.title}</h1>
                <h1 className="text-center">{data.body}</h1>
              </div>
            );
          })}
        </div>
        <div>
          <div className="flex justify-center">
            <h1>Other Features</h1>
          </div>
          <div className="flex">
            {howItWorkData.map((data) => {
              return (
                <div className="flex flex-col basis-1/5 items-center">
                  <img src={data.imgSrc}></img>
                  <h1>{data.title}</h1>
                  <h1 className="text-center">{data.body}</h1>
                </div>
              );
            })}
          </div>
          <div className="bg-blue-900">

          </div>
        </div>
      </div>
    </>
  );
};

export default Introduction;
