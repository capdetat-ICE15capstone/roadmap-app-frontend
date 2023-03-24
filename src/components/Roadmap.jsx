import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import placeholderImage from "../assets/roadmap_assets/Placeholder_Image.png"
import { ReactComponent as EyeIcon } from "../assets/roadmap_assets/eye_Icon.svg"

const Roadmap = ({ owner_id, creator_id, owner_name, creator_name, rid, views_count, stars_count, forks_count, created_at, edited_at, title }) => {
  Roadmap.propTypes = {
    owner_id: PropTypes.number,
    creator_id: PropTypes.number,
    owner_name: PropTypes.string,
    creator_name: PropTypes.string,
    rid: PropTypes.number,
    views_count: PropTypes.number,
    stars_count: PropTypes.number,
    forks_count: PropTypes.number,
    created_at: PropTypes.string,
    edited_at: PropTypes.string,
    title: PropTypes.string
  };
  return (
    <Link to={`/view/${owner_id}`}>
      <div className="relative inline-block rounded-[48px] bg-white border-gray-300 border-2 shadow-md w-80 h-80 m-8 hover:transform hover:scale-110 transition duration-300">
        <div className="relative container rounded-3xl h-3/5 w-auto m-2">
          <img src={placeholderImage} className="relative object-cover rounded-[48px] h-full w-full" />
          <h3 className="absolute text-black bottom-2 left-6">
            {creator_name}
          </h3>
          <h6 className="absolute text-gray-600 bottom-2 right-6">
            Last updated: {edited_at}
          </h6>
        </div>
        <div className="relative h-2/5 w-auto">
          <h1 className="absolute top-0 left-2 text-2xl">
            {title}
          </h1>
          <h6 className="absolute top-0 right-24" >
            fork : {forks_count}
          </h6>
          <h6 className="absolute top-0 right-8">
            star : {stars_count}
          </h6>
          <h1 className="absolute top-10 left-2">
            Owner: <Link to={`/home/${owner_id}`} className="z-10 hover:text-blue-600">{owner_name}</Link>
          </h1>
          <h1 className="absolute top-10 right-2 text-gray-600">
            Created : {created_at}
          </h1>
          <span className="absolute bottom-6 left-8">
            <EyeIcon />
          </span>
          <h1 className="absolute bottom-6 left-16">
            : {views_count} views
          </h1>
        </div>
      </div>
    </Link>

  );
};

export default Roadmap;