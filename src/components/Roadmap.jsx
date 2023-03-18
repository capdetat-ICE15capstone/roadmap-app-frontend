import React from 'react';
import PropTypes from 'prop-types';
import placeholderImage from "../assets/roadmap_assets/Placeholder_Image.png"
import { ReactComponent as EyeIcon } from "../assets/roadmap_assets/eye_Icon.svg"

const Roadmap = ({ userName, ownerName, roadmapName, createdDate, updateDate, views }) => {
  Roadmap.propTypes = {
    userName: PropTypes.string.isRequired,
    ownerName: PropTypes.string.isRequired,
    roadmapName: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    updateDate: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
  };
  return (
    <div className="relative rounded-[48px] bg-white border-gray-300 border-2 shadow-md w-80 h-80 m-8">
      <div className="relative container rounded-3xl h-3/5 w-auto m-2">
        <img src={placeholderImage} className="relative object-cover rounded-[48px] h-full w-full" />
        <h3 className="absolute text-black bottom-2 left-6">
          {userName}
        </h3>
        <h6 className="absolute text-gray-600 bottom-2 right-6">
          Last updated: {updateDate}
        </h6>
      </div>
      <div className="relative h-2/5 w-auto">
        <h1 className="absolute top-0 left-2 text-2xl">
          {roadmapName}
        </h1>
        <h1 className="absolute top-10 left-2">
          Owner: {ownerName}
        </h1>
        <h1 className="absolute top-10 right-2 text-gray-600">
          Created : {createdDate}
        </h1>
        <span className="absolute bottom-6 left-8">
            <EyeIcon />
        </span>
        <h1 className="absolute bottom-6 left-16">
          : {views} views
        </h1>
      </div>
    </div>
  );
};

export default Roadmap;



/*const roadmap1 = {userName: "FingTheMan", 
              ownerName: "Wuttikorn", 
              roadmapName: "Doing Capstone", 
              createdDate: "01/01/2023", 
              updateDate: "18/03/2023", 
              views: 177013};
const roadmap2 = {userName: "FingTheMan", 
              ownerName: "Wuttikorn", 
              roadmapName: "Dying from Capstone", 
              createdDate: "19/02/2023", 
              updateDate: "18/03/2023", 
              views: 177013};

const allRoadmap = [roadmap1, roadmap2, roadmap2]
var roadmapList = []
allRoadmap.forEach((roadmap)=>{
  roadmapList.push(<div className="relative rounded-[48px] bg-white border-gray-300 border-2 shadow-md w-80 h-80 m-8">
  <div className="relative container rounded-3xl h-3/5 w-auto m-2">
    <img src={placeholderImage} className="relative object-cover rounded-[48px] h-full w-full" />
    <h3 className="absolute text-black bottom-2 left-6">
      {roadmap.userName}
    </h3>
    <h6 className="absolute text-gray-600 bottom-2 right-6">
      Last updated: {roadmap.updateDate}
    </h6>
  </div>
  <div className="relative h-2/5 w-auto">
    <h1 className="absolute top-0 left-2 text-2xl">
      {roadmap.roadmapName}
    </h1>
    <h1 className="absolute top-10 left-2">
      Owner: {roadmap.ownerName}
    </h1>
    <h1 className="absolute top-10 right-2 text-gray-600">
      Created : {roadmap.createdDate}
    </h1>
    <span className="absolute bottom-6 left-8">
        <EyeIcon />
    </span>
    <h1 className="absolute bottom-6 left-16">
      : {roadmap.views} views
    </h1>
  </div>
</div>)
})
return (
  <>
    {roadmapList}
  </>
);*/