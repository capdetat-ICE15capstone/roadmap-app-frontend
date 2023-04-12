import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Roadmap from "../components/Roadmap";
import { useIsMD } from "../hooks/useMediaQuery";

const itemVariant = {
  initial: { y: 100, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  exit: { y: 100, opacity: 0 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },
};

const firstRowData = [
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

const secondRowData = [
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

const RecommendedRoadmap = React.forwardRef((props, ref) => {
  // component for displaying 4 roadmap at the footer

  // get 4 roadmap data
  // fake data
  const RMdata = [
    {
      owner_id: 1,
      creator_id: 2,
      owner_name: "Taiwan",
      creator_name: "China",
      rid: 4,
      views_count: 200,
      stars_count: 600,
      forks_count: 400,
      created_at: "ssssssssss",
      edited_at: "SSSSSSSSS",
      title: "How to not suck",
    },
    {
      owner_id: 1,
      creator_id: 2,
      owner_name: "Taiwan",
      creator_name: "China",
      rid: 5,
      views_count: 200,
      stars_count: 600,
      forks_count: 400,
      created_at: "ssssssssss",
      edited_at: "SSSSSSSSS",
      title: "How to not suck",
    },
    {
      owner_id: 1,
      creator_id: 2,
      owner_name: "Taiwan",
      creator_name: "China",
      rid: 6,
      views_count: 200,
      stars_count: 600,
      forks_count: 400,
      created_at: "ssssssssss",
      edited_at: "SSSSSSSSS",
      title: "How to not suck",
    },
    {
      owner_id: 1,
      creator_id: 2,
      owner_name: "Taiwan",
      creator_name: "China",
      rid: 7,
      views_count: 200,
      stars_count: 600,
      forks_count: 400,
      created_at: "ssssssssss",
      edited_at: "SSSSSSSSS",
      title: "How to not suck",
    },
  ];

  return (
    <div className="flex flex-col justify-center bg-nav-blue px-10 pb-10" ref={ref}>
      <div className="text-white font-bold flex text-2xl justify-center my-10">
        Recommended Roadmap
      </div>
      <div>
        <div className="flex gap-4 justify-evenly flex-wrap">
          {RMdata.map((roadmap, index) => {
            return (
              <motion.div
                key={roadmap.rid}
                variants={itemVariant}
                initial="initial"
                whileInView="whileInView"
                exit="exit"
                transition="transition"
              >
                <Roadmap {...roadmap} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

const FeatureList = (props) => {
  const { dataSet } = props;
  const isMD = useIsMD();

  return dataSet === null ? (
    <div></div>
  ) : (
    <div className="flex flex-col gap-8 md:flex-row md:gap-0">
      {dataSet.map((data, index) => {
        return (
          <motion.div
            key={data.imgSrc}
            className="flex flex-col basis-1/2 gap-2"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition= {isMD ? {
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.05
            } : {
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0
            }}
          >
            <div className="flex justify-center">
              <img
                src={data.imgSrc}
                className={`${data.extra ? data.extra : ""} w-32 h-32`}
              ></img>
            </div>

            <h1 className="font-bold text-xl text-center">{data.title}</h1>
            <h1 className="text-center">{data.body}</h1>
          </motion.div>
        );
      })}
    </div>
  );
};

const PremiumPage = React.forwardRef((props, ref) => {
  const planDetail = [
    {
      borderClass: "border-gray-300",
      line1: "Starter",
      line2: "Free",
      line3: "Forever",
      list: [
        "A maximum of 3 roadmaps allowed",
        "A maximum of 16 tasks per roadmap allowed",
        "A maximum of 8 subtasks per roadmap allowed",
        "Web-based Application",
      ],
      buttonText: "Choose Starter",
      buttonClassName:
        "border-2 border-nav-blue bg-transparent w-2/3 text-nav-blue font-bold rounded-md my-20",
    },
    {
      borderClass: "border-nav-blue",
      line1: "Professional",
      line2: "$69.42 per month",
      line3: "Billed annually",
      list: [
        "Unlimited roadmaps allowed",
        "Unlimited tasks allowed",
        "Unlimited subtasks allowed",
        "No ads banner on any page",
      ],
      buttonText: "Choose Professional",
      buttonClassName:
        "border bg-nav-blue w-2/3 text-white font-bold rounded-md my-20 min-w-min",
    },
  ];

  return (
    <div className="flex w-full h-full flex-col items-center" ref={ref}>
      <div className="flex justify-center my-14">
        <span className="text-nav-blue text-3xl font-bold">Pricing</span>
      </div>
      <div className="flex h-4/5 w-full justify-evenly">
        {planDetail.map((plan) => {
          return (
            <div className={`p-10 h-full w-full flex flex-col border-2 border-t-[16px] basis-1/3 items-center justify-between rounded-2xl ${plan.borderClass}`}>
              
              <div className="items-center flex flex-col gap-4">
                <span>{plan.line1}</span>
                <span className="text-4xl">{plan.line2}</span>
                <span>{plan.line3}</span>
                <div>
                  <ol className="before:[&>li]:content-['✓_'] [&>li]:my-5">
                    {plan.list.map((listItem) => {
                      return <li>{listItem}</li>;
                    })}
                  </ol>
                </div>
              </div>
              <button className={`${plan.buttonClassName} px-2 py-2`}>
                {plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
});

const MotionRecommendedRoadmap = motion(RecommendedRoadmap);
const MotionPremiumPage = motion(PremiumPage);

const Introduction = () => {
  const [inPremium, setInPremium] = useState(false);

  return (
    <>
      <AnimatePresence>
        <div className="h-20 w-full sticky flex justify-between items-center shadow-xl">
          <div className="m-4">
            <img
              src="./src/assets/intro/logo.svg"
              className="inline-block mr-2"
            ></img>
            <img
              src="./src/assets/intro/MileMap.svg"
              className="inline-block"
            ></img>
          </div>
          <div className="flex items-center">
            {/* this path is only temporary */}
            <button
              className={`m-4 font-bold hover:scale-125 duration:200 transition ease-in ${inPremium ? "underline underline-offset-4" : ""}`}
              type="button"
              onClick={() => setInPremium(true)}
            >
              Premium
            </button>
            <button
              className={`m-4 font-bold hover:scale-125 transition duration:200 ease-in ${!inPremium ? "underline underline-offset-4" : ""}`}
              type="button"
              onClick={() => setInPremium(false)}
            >
              Explore
            </button>
            <Link
              to="/login"
              className="bg-dark-blue text-white font-bold rounded-md h-10 w-20 flex justify-center items-center m-4"
            >
              Login
            </Link>
          </div>
        </div>
        {inPremium ? (
          <MotionPremiumPage
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          />
        ) : (
          <>
            <div className="w-full flex flex-col md:flex-row bg-gray-background justify-between">
              <div className="flex flex-col items-start justify-center p-10 gap-4">
                <h1 className="text-dark-blue text-5xl font-bold">
                  Manage your task more effectively, Stay on tracks with your
                  goal!
                </h1>
                <h3 className="font-semibold text-xl">
                  creating roadmap, tracking progress, interacting with other
                  roadmap
                </h3>
                <Link
                  className="rounded-md bg-button-pink font-bold text-white p-2 text-2xl px-6"
                  to="/login"
                >
                  Try MileMap!
                </Link>
              </div>
              <div className="m-10 basis-2/5 flex items-center justify-center md:justify-end">
                <img src="./src/assets/intro/0.svg" className="max-w-xl"></img>
              </div>
            </div>
            <div className="p-10 flex flex-col gap-12">
              <div className="flex flex-col gap-10">
                <div className="flex justify-center">
                  <h1 className="font-bold text-xl">How it works</h1>
                </div>
                <FeatureList dataSet={firstRowData} />
              </div>

              <div className="flex flex-col gap-10">
                <div className="flex justify-center">
                  <h1 className="text-xl font-bold">Other Features</h1>
                </div>
                <FeatureList dataSet={secondRowData} />
              </div>
            </div>
            <a id="explore">
              <MotionRecommendedRoadmap
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              />
            </a>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Introduction;
