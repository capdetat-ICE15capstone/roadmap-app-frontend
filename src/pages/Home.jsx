import React, { useState } from "react";
import Roadmap from "../components/Roadmap";
import Roadmap2 from "../components/Roadmap2";
import RoadmapCreate from "../components/RoadmapCreate";

const Home = () => {
  return (
    <>
      {/*Roadmaps*/}
      <div className="relative inline-block mx-4">
        <div className="inline-block">
          <RoadmapCreate />
        </div>
        <div className="inline-block">
          <Roadmap />
        </div>
        <div className="inline-block">
          <Roadmap2 
          username="Thanapat" 
          ownerName="Tripipat" 
          roadmapName="React skill issue" 
          createdDate="03/17/2023" 
          updateDate="today bich" 
          views={6338098421} />
        </div>
        <div className="inline-block">
          <Roadmap2
          username="FingTheMan" 
          ownerName="Wuttikorn" 
          roadmapName="Dying From Capstone" 
          createdDate="03/17/2023" 
          updateDate="03/18/2023" 
          views={177013} />
        </div>
      </div>
    </>
  );
};

export default Home;
