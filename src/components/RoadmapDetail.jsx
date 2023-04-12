import React from 'react'
import { useNavigate } from 'react-router-dom';
import { convertDateTimeString } from '../functions/formatFunction'

import { ReactComponent as LikeIcon } from '../assets/shapes/like.svg';
import { ReactComponent as LikeHilightIcon } from '../assets/shapes/like_hilight.svg';
import { ReactComponent as ForkIcon } from '../assets/shapes/fork.svg';

function RoadmapDetail({ roadmapName, roadmapID, roadmapPrivacy, roadmapViewCount, roadmapForkCount, roadmapEditDate, roadmapDescription, isOwner, likeCount, isLiked, isCompleted, handleLike }) {
  const navigate = useNavigate();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='text-3xl font-extrabold self-center py-4 break-words'>
          {roadmapName} {isCompleted ? '✓' : ''}
        </div>
        <div className="flex self-center space-x-1 h-10">
          {isOwner === true && (
            <>
              <div className="flex items-center gap-2 bg-gray-700 grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold truncate self-center pointer-events-none">
                {(!isLiked) ? (
                  <LikeIcon className='h-4 w-4 mb-[1px]' />
                ) : (
                  <LikeHilightIcon className='h-4 w-4 mb-[1px]' />
                )}
                {likeCount}
              </div>
              <button onClick={() => navigate(`/edit/${roadmapID}`)} className={`${(isCompleted) ? 'bg-gray-700 pointer-events-none' : 'bg-sub-blue'} grow text-white self-center px-4 py-2 font-semilight rounded-full text-sm font-bold`} type="button">
                Edit
              </button>
            </>
          )}
          {isOwner === false && (
            <>
              <button onClick={handleLike} className="flex items-center gap-2 bg-sub-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold truncate self-center" type="button">
                {(!isLiked) ? (
                  <LikeIcon className='h-4 w-4 mb-[1px]' />
                ) : (
                  <LikeHilightIcon className='h-4 w-4 mb-[1px]' />
                )}
                {likeCount}
              </button>
              <button onClick={() => navigate(`/clone/${roadmapID}`)} className="flex items-center gap-2 bg-main-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm self-center font-bold" type="button">
                <ForkIcon className='h-4 w-4 mb-[1px]' />
                {roadmapForkCount}
              </button>
            </>
          )}
          <button onClick={() => console.log("detail!")} className="bg-gray-500 grow text-white px-4 py-2 font-semilight rounded-full self-center text-sm font-bold" type="button">
            i
          </button>
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