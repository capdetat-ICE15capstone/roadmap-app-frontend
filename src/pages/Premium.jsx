import React from "react";

const planDetail = [
  {
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
    buttonClassName: "border-2 border-nav-blue bg-transparent w-2/3 text-nav-blue font-bold rounded-md h-10 my-20"
  },
  {
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
    buttonClassName: "border bg-nav-blue w-2/3 text-white font-bold rounded-md h-10 my-20"
  },
];

const Premium = () => {
  return (
    <div className="flex w-screen m-0 p-0 h-screen flex-col items-center">
      <div className="flex justify-center my-14">
        <span className="text-nav-blue text-3xl font-bold">Pricing</span>
      </div>
      <div className="flex h-4/5 w-full justify-evenly">
        {
          planDetail.map((plan) => {
            return (
              <div className="p-10 h-full w-full flex flex-col border basis-1/3 items-center justify-between">
                <div className="items-center flex flex-col gap-4">
                  <span>{plan.line1}</span>
                  <span className="text-4xl">{plan.line2}</span>
                  <span>{plan.line3}</span>
                  <div>
                    <ol className="before:[&>li]:content-['✓'] [&>li]:my-5">
                      {
                        plan.list.map((listItem) => {
                          return <li>{listItem}</li>
                        })
                      }
                    </ol>
                  </div>
                </div>
                <button className={plan.buttonClassName}>
                  {plan.buttonText}
                </button>
              </div>
            );
          })
        }
        
      </div>
    </div>
  );
};



export default Premium;
