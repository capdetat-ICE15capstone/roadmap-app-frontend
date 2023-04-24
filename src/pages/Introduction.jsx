import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Roadmap from "../components/Roadmap";
import { useIsMD } from "../hooks/useMediaQuery";
import { ReactComponent as DollarSign } from "../assets/intro/dollarSign.svg";
import Img0 from "../assets/intro/0.svg";
import Img1 from "../assets/intro/1.svg";
import Img2 from "../assets/intro/2.svg";
import Img3 from "../assets/intro/3.svg";
import Img4 from "../assets/intro/4.svg";
import Img5 from "../assets/intro/5.svg";
import Img6 from "../assets/intro/6.svg";
import Img7 from "../assets/intro/7.svg";
import Img8 from "../assets/intro/8.svg";
import Img9 from "../assets/intro/9.svg";
import Img10 from "../assets/intro/10.svg";
import Logo from "../assets/intro/logo.svg";
import MileMap from "../assets/intro/MileMap.svg";
import { ReactComponent as RecRoadmap1 } from "../assets/intro/recRoadmap1.svg";
import { ReactComponent as RecRoadmap2 } from "../assets/intro/recRoadmap2.svg";
import { ReactComponent as RecRoadmap3 } from "../assets/intro/recRoadmap3.svg";
import { ReactComponent as RecRoadmap4 } from "../assets/intro/recRoadmap4.svg";
import { ReactComponent as RecRoadmap5 } from "../assets/intro/recRoadmap5.svg";
import { isUserLoggedIn } from "../functions/userFunction";

const itemVariant = {
  initial: { y: 100, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  whileHover: { scale: 1.1 },
  exit: { y: 100, opacity: 0 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
    duration: 150,
  },
};

const firstRowData = [
  {
    imgSrc: Img1,
    title: "Roadmap for planning",
    body: "plan and create each task; provide a complete task description",
  },
  {
    imgSrc: Img2,
    title: "Plan start time and deadline",
    body: "input the start and due date for each task",
  },
  {
    imgSrc: Img3,
    title: "Create subtask",
    body: "create subtask under each main task and update the working progress by using checkbox",
  },
  {
    imgSrc: Img4,
    title: "Ordering the task",
    body: "Organize and priotitize the tasks within the roadmap in order of importance",
  },
  {
    imgSrc: Img5,
    title: "Archive",
    body: "Remove the completed or inactive roadmap from the active list; access them later in the user profile",
  },
];

const secondRowData = [
  {
    imgSrc: Img6,
    title: "Feed",
    body: "Provide the randomly selected different public roadmaps for each user",
  },
  {
    imgSrc: Img7,
    title: "Search",
    body: "Search the roadmap by using title, tags, or roadmap creator's username; search for other user by their username",
  },
  {
    imgSrc: Img8,
    title: "Interact with other users' roadmap",
    body: "View, clone or rate other users' roadmaps, as long as those roadmaps are not set as private",
    extra: "p-2",
  },
  {
    imgSrc: Img9,
    title: "XP",
    body: "Earn experience point (XP) for completing tasks",
  },
  {
    imgSrc: Img10,
    title: "Points",
    body: "Earn points for completing the daily quest; point can be exchanged into items",
  },
];

const FakeRoadmap = ({ SvgPanel }) => {
  return (
    <motion.div
      variants={itemVariant}
      initial="initial"
      whileInView="whileInView"
      exit="exit"
      transition="transition"
      whileHover="whileHover"
    >
      <Link to="/login">
        <SvgPanel />
      </Link>
    </motion.div>
  );
};

const RecommendedRoadmap = React.forwardRef((props, ref) => {
  // component for displaying 4 roadmap at the footer

  // get 4 roadmap data
  // fake data

  return (
    <div
      className="flex flex-col justify-center bg-nav-blue px-10 pb-10"
      ref={ref}
    >
      <div className="text-white font-bold flex text-2xl justify-center my-10">
        Recommended Roadmap
      </div>
      <div>
        <div className="flex justify-evenly flex-wrap">
          <FakeRoadmap SvgPanel={RecRoadmap1} />
          <FakeRoadmap SvgPanel={RecRoadmap2} />
          <FakeRoadmap SvgPanel={RecRoadmap3} />
          <FakeRoadmap SvgPanel={RecRoadmap4} />
          <FakeRoadmap SvgPanel={RecRoadmap5} />
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
            // exit={{ y: 300, opacity: 0 }}
            transition={
              isMD
                ? {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.05,
                  }
                : {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0,
                  }
            }
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
  const navigate = useNavigate();

  const handleNavigateLogin = (premium) => {
    navigate("/login", { state: { premium: premium } });
  };

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
      premium: false,
    },
    {
      borderClass: "border-nav-blue",
      line1: "Professional",
      line2: "$6.99 per month",
      line3: "Billed annually",
      list: [
        "Unlimited roadmaps allowed",
        "Unlimited tasks allowed",
        "A maximum of 8 subtasks per roadmap allowed",
        "No ads banner on any page",
      ],
      buttonText: "Choose Professional",
      buttonClassName:
        "border bg-nav-blue w-2/3 text-white font-bold rounded-md my-20 min-w-min",
      premium: true,
    },
  ];

  return (
    <div className="flex w-full h-full flex-col items-center mt-20" ref={ref}>
      <div className="flex justify-center my-14 items-center gap-2">
        <DollarSign />
        <span className="text-nav-blue text-3xl font-bold">Pricing</span>
      </div>
      <div className="flex h-4/5 w-4/5 gap-4 lg:w-full justify-evenly flex-col lg:flex-row mb-4">
        {planDetail.map((plan) => {
          return (
            <div
              className={`p-8 flex flex-col border-2 border-t-[16px] basis-1/3 mx-4 gap-4 items-center justify-between rounded-2xl ${plan.borderClass}`}
            >
              <div className="items-center flex flex-col gap-4">
                <span>{plan.line1}</span>
                <span className="text-4xl block text-center">{plan.line2}</span>
                <span>{plan.line3}</span>
                <div>
                  <ol className="before:[&>li]:content-['✓_'] [&>li]:my-5">
                    {plan.list.map((listItem) => {
                      return <li className="block text-center">{listItem}</li>;
                    })}
                  </ol>
                </div>
              </div>
              <button
                className={`${plan.buttonClassName} px-2 py-2`}
                onClick={() => handleNavigateLogin(plan.premium)}
              >
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

const Introduction = ({ wantPremium = false }) => {
  const [inPremium, setInPremium] = useState(false);
  const [logInStatus, setLoginStatus] = useState(null);

  useEffect(() => {
    setInPremium(wantPremium);
    const checkLogin = async () => {
      const response = await isUserLoggedIn();
      setLoginStatus(response);
    }

    checkLogin();
  }, []);

  return (
    <>
      <div className="h-20 top-0 w-full fixed flex justify-between items-center shadow-xl bg-white z-20">
        <div className="m-4">
          <img src={Logo} className="inline-block mr-2"></img>
          <img src={MileMap} className="hidden md:inline-block"></img>
        </div>
        <div className="flex items-center">
          {/* this path is only temporary */}
          <button
            className={`m-4 font-bold hover:scale-125 duration:200 transition focus:outline-none ease-in ${
              inPremium ? "underline underline-offset-4" : ""
            }`}
            type="button"
            onClick={() => setInPremium(true)}
          >
            Premium
          </button>
          <button
            className={`m-4 font-bold hover:scale-125 transition duration:200 focus:outline-none ease-in ${
              !inPremium ? "underline underline-offset-4" : ""
            }`}
            type="button"
            onClick={() => setInPremium(false)}
          >
            Explore
          </button>
          <Link
            to="/login"
            className="bg-dark-blue text-white font-bold rounded-md h-10 w-20 flex justify-center items-center m-4"
          >
            {logInStatus === true ? "Home" : logInStatus === false ? "Login" : "Loading"}
          </Link>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {inPremium ? (
          <MotionPremiumPage
            key="premiumPage"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0,
            }}
          />
        ) : (
          <motion.div
            key="introPage"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0,
            }}
            className="mt-20"
          >
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
                <img src={Img0} className="max-w-xl"></img>
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Introduction;
