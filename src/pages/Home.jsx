import React from "react";
import Roadmap from "../components/Roadmap";
import RoadmapCreate from "../components/RoadmapCreate";
import RoadmapDropdown from "../components/RoadmapDropdown";

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
          <Roadmap 
          creator_name="Thanapat" 
          owner_name="Tripipat" 
          title="React skill issue" 
          created_at="03/17/2023" 
          edited_at="today bich" 
          views_counts={6338098421} />
          <RoadmapDropdown />
        </div>
        <div className="inline-block">
          <Roadmap
          creator_name="FingTheMan" 
          owner_name="Wuttikorn" 
          title="Dying From Capstone" 
          created_at="03/17/2023" 
          edited_at="03/18/2023" 
          views_counts={177013} />
          <RoadmapDropdown />
        </div>
      </div>
    </>
  );
};

export default Home;
