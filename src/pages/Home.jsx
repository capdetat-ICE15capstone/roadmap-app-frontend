import React from "react";
import Roadmap from "../components/Roadmap";
import RoadmapCreate from "../components/RoadmapCreate";
import RoadmapDropdown from "../components/RoadmapDropdown";
import UserBanner from "../components/UserBanner";

const Home = () => {
  return (
    <>
      {/*Roadmaps*/}
      <div className="relative inline-block mx-4">
        
        <div>
          <UserBanner 
            owner_id={63380984211}
            owner_name="Thanapat"
            user_exp={1432}
            avatar_id="https://via.placeholder.com/300"
          />
        </div>
        <div>
          <UserBanner
            owner_id={63380984211}
            owner_name="Thanapat"
            user_exp={1432}
            avatar_id="https://via.placeholder.com/300"
          />
        </div>
        <div>
          <UserBanner
            owner_id={63380984211}
            owner_name="123456789123456789123456"
            user_exp={1432}
            avatar_id="https://via.placeholder.com/300"
          />
        </div>
        <div>
          <UserBanner
            owner_id={63380984211}
            owner_name="Thanapat"
            user_exp={1432}
            avatar_id="https://via.placeholder.com/300"
          />
        </div>
        <div>
          <UserBanner
            owner_id={63380984211}
            owner_name="Thanapat"
            user_exp={1432}
            avatar_id="https://via.placeholder.com/300"
          />
        </div>
        <div>
          <UserBanner
            owner_id={63380984211}
            owner_name="Thanapat"
            user_exp={1432}
            avatar_id="https://via.placeholder.com/300"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
