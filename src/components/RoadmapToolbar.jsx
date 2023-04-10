import React from 'react'
import { useNavigate } from 'react-router-dom';

function RoadmapToolbar({ isOwner, roadmapID }) {
  if (isOwner) {
    return (
      <div className="flex space-x-1">
        <button onClick={() => navigate(`/clone/${roadmapID}`)} className="bg-sub-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
          Clone
        </button>
        <button onClick={() => navigate(`/edit/${roadmapID}`)} className="bg-gray-300 grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
          Edit
        </button>
        <button onClick={() => setDetailToggle(!detailToggle)} className="bg-gray-300 grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
          i
        </button>
      </div>
    )
  } else {
    return (
      <div className="flex space-x-1">
        <button onClick={() => navigate("/clone")} className="bg-sub-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
          Clone
        </button>
        <button onClick={() => likeRoadmap()} className="bg-gray-300 grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
          Like
        </button>
        <button onClick={() => setDetailToggle(!detailToggle)} className="bg-gray-300 grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold" type="button">
          i
        </button>
      </div>
    )
  }
}

export default RoadmapToolbar