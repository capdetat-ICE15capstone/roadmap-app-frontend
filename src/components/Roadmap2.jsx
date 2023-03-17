import React from 'react';
import PropTypes from 'prop-types';
import placeholderImage from "../assets/roadmap_assets/Placeholder_Image.png"
import { ReactComponent as EyeIcon } from "../assets/roadmap_assets/eye_Icon.svg"
//import { ReactComponent as Placeholder_Image } from "../assets/roadmap_assets/Placeholder_Image.svg"

const Roadmap = ({ username, ownerName, roadmapName, createdDate, updateDate, views }) => {
  return (
    <div className="relative rounded-[48px] bg-white border-gray-300 border-2 shadow-md w-80 h-80 m-8">
      {/*upper*/}
      <div className="relative container rounded-3xl h-3/5 w-auto m-2">
        <img src={placeholderImage} className="relative object-cover rounded-[48px] h-full w-full" />
        <h3 className="absolute text-black bottom-2 left-6">
          {username}
        </h3>
        <h6 className="absolute text-gray-600 bottom-2 right-6">
          Last updated: {updateDate}
        </h6>
      </div>
      {/*lower*/}
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

Roadmap.propTypes = {
  username: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  roadmapName: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  updateDate: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
};

export default Roadmap;
