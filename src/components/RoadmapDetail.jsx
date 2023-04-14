import React from 'react'
import { useNavigate } from 'react-router-dom';
import { convertDateTimeString } from '../functions/formatFunction'

import { ReactComponent as LikeIcon } from '../assets/shapes/like.svg';
import { ReactComponent as LikeHilightIcon } from '../assets/shapes/like_hilight.svg';
import { ReactComponent as ForkIcon } from '../assets/shapes/fork.svg';

function RoadmapDetail({ roadmapName, roadmapID, roadmapPrivacy, roadmapViewCount, roadmapForkCount, roadmapEditDate, roadmapDescription, isOwner, likeCount, isLiked, isCompleted, handleLike }) {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex max-sm:flex-col justify-between items-center sm:space-x-8 max-sm:space-y-4'>
        <div className='text-3xl font-extrabold self-center break-words'>
          {roadmapName} {isCompleted ? '✓' : ''}
        </div>
        <div className="flex sm:w-[200px] sm:justify-end sm:space-x-1 max-sm:space-x-2 max-sm:w-full h-9 shrink-0">
          {isOwner === true && (
            <>
              <div className="flex flex-1 justify-center items-center space-x-2 bg-gray-600 text-white px-4 py-2 font-semilight rounded-full text-sm font-bold truncate pointer-events-none">
                {(!isLiked) ? (
                  <LikeIcon className='h-4 w-4' />
                ) : (
                  <LikeHilightIcon className='h-4 w-4' />
                )}
                <span>
                  {likeCount}
                </span>
              </div>
              <button onClick={() => navigate(`/edit/${roadmapID}`)} className={`${(isCompleted) ? 'bg-gray-700 pointer-events-none' : 'bg-sub-blue'} flex flex-1 justify-center items-center text-white px-4 py-2 font-semilight rounded-full text-sm font-bold transition ease-in-out hover:bg-nav-blue duration-300`} type="button">
                Edit
              </button>
              <button onClick={() => console.log("detail!")} className="flex max-sm:flex-1 justify-center items-center bg-nav-blue text-white px-4 py-2 font-semilight rounded-full max-sm:text-sm font-bold transition ease-in-out hover:bg-black duration-300" type="button">
                i
              </button>
            </>
          )}
          {isOwner === false && (
            <>
              <div onClick={handleLike} className="flex max-sm:flex-1 justify-center items-center space-x-2 bg-sub-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold truncate transition ease-in-out hover:bg-nav-blue duration-300" type="button">
                {(!isLiked) ? (
                  <LikeIcon className='h-4 w-4' />
                ) : (
                  <LikeHilightIcon className='h-4 w-4' />
                )}
                <span>
                  {likeCount}
                </span>
              </div>
              <button onClick={() => navigate(`/clone/${roadmapID}`)} className={`flex max-sm:flex-1 justify-center items-center space-x-2 bg-sub-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold truncate transition ease-in-out hover:bg-nav-blue duration-300`} type="button">
                <ForkIcon className='h-4 w-4' />
                <span>
                  {roadmapForkCount}
                </span>
              </button>
              <button onClick={() => console.log("detail!")} className="flex max-sm:flex-1 justify-center items-center bg-nav-blue text-white px-4 py-2 font-semilight rounded-full max-sm:text-sm font-bold transition ease-in-out hover:bg-black duration-300" type="button">
                i
              </button>
            </>
          )}
        </div>
      </div>
      <div className='flex flex-col rounded-2xl text-sm space-y-2'>
        <div className='flex space-x-2 h-6'>
          <div className={`${(roadmapPrivacy) ? 'border-red-400' : 'border-green-400'} border-solid border-[1px] rounded-full px-2 py-1 text-xs self-center shrink-0`}>
            {!roadmapPrivacy ? "Public" : "Private"}
          </div>
          <div className='border-solid border-[1px] rounded-full px-2 py-1 text-xs border-gray-300 self-center shrink-0'>
            {roadmapViewCount} Views
          </div>
          <div className='border-solid border-[1px] rounded-full px-2 py-1 text-xs border-gray-300 self-center truncate'>
            {convertDateTimeString(roadmapEditDate)}
          </div>
        </div>
        <div>
          {roadmapDescription}
        </div>
      </div>
    </div>
  )
}

export default RoadmapDetail