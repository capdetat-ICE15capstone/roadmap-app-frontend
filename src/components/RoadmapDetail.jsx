import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { convertDateTimeString } from '../functions/formatFunction'

import { ReactComponent as LikeIcon } from '../assets/shapes/like.svg';
import { ReactComponent as LikeHilightIcon } from '../assets/shapes/like_hilight.svg';
import { ReactComponent as ForkIcon } from '../assets/shapes/fork.svg';

function RoadmapDetail({ roadmap, isOwner, likeCount, isLiked, isCompleted, isArchived, handleLike }) {
  const navigate = useNavigate();

  const [visible, setVisible] = useState();

  return (
    <>
      <div className='relative'>
        <div className='flex flex-col space-y-4'>
          <div className='flex max-sm:flex-col justify-between items-center sm:space-x-8 max-sm:space-y-4'>
            <div className='text-3xl font-extrabold self-center break-words'>
              {roadmap.name} {isCompleted ? '✓' : ''}
            </div>
            <div className="flex sm:justify-end sm:space-x-1 max-sm:space-x-2 max-sm:w-full h-9 shrink-0">
              {(isOwner || (isOwner && isArchived)) && (
                <>
                  <div className="flex sm:w-24 max-sm:flex-1 justify-center items-center space-x-2 bg-gray-600 text-white px-4 py-2 font-semilight rounded-full text-sm font-bold truncate pointer-events-none">
                    {(!isLiked) ? (
                      <LikeIcon className='h-4 w-4' />
                    ) : (
                      <LikeHilightIcon className='h-4 w-4' />
                    )}
                    <span>
                      {likeCount}
                    </span>
                  </div>
                  <button onClick={() => navigate(`/edit/${roadmap.rid}`)} className={`${(isCompleted || isArchived) ? 'bg-gray-700 pointer-events-none' : 'bg-sub-blue'} flex max-sm:flex-1 sm:w-24  justify-center items-center text-white px-4 py-2 font-semilight rounded-full text-sm font-bold transition ease-in-out hover:bg-nav-blue hover:scale-105 hover:z-10 duration-200`} type="button">
                    Edit
                  </button>
                  <button
                    className="flex max-sm:flex-1 justify-center items-center bg-nav-blue text-white px-4 py-2 font-semilight rounded-full max-sm:text-sm font-bold transition ease-in-out hover:bg-black hover:scale-105 hover:z-10 duration-200"
                    type="button"
                    onMouseOver={() => setVisible(true)}
                    onMouseOut={() => setVisible(false)}
                  >
                      i
                  </button>
                </>
              )}
              {!isOwner && (
                <>
                  <button onClick={handleLike} className="flex sm:w-24 max-sm:flex-1 shrink-0 justify-center items-center space-x-2 bg-sub-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold truncate transition ease-in-out hover:bg-nav-blue hover:scale-105 hover:z-10 duration-200" type="button">
                    {(!isLiked) ? (
                      <LikeIcon className='h-4 w-4' />
                    ) : (
                      <LikeHilightIcon className='h-4 w-4' />
                    )}
                    <span>
                      {likeCount}
                    </span>
                  </button>
                  <button onClick={() => navigate(`/clone/${roadmap.rid}`)} className={`flex sm:w-24 max-sm:flex-1 justify-center items-center space-x-2 bg-sub-blue grow text-white px-4 py-2 font-semilight rounded-full text-sm font-bold truncate transition ease-in-out hover:bg-nav-blue hover:scale-105 hover:z-10 duration-200`} type="button">
                    <ForkIcon className='h-4 w-4' />
                    <span>
                      {roadmap.forks_count}
                    </span>
                  </button>
                  <button
                    className="flex max-sm:flex-1 justify-center items-center bg-nav-blue text-white px-4 py-2 font-semilight rounded-full max-sm:text-sm font-bold transition ease-in-out hover:bg-black hover:scale-105 hover:z-10 duration-200"
                    type="button"
                    onMouseOver={() => setVisible(true)}
                    onMouseOut={() => setVisible(false)}
                  >
                    i
                  </button>
                </>
              )}
            </div>
          </div>
          <div className='flex flex-col rounded-2xl text-sm space-y-2'>
            <div className='flex space-x-2 h-6'>
              <div className={`${(roadmap.is_private) ? 'border-red-400' : 'border-green-400'} border-solid border-[1px] rounded-full px-2 py-1 text-xs self-center shrink-0`}>
                {roadmap.is_private ? "Private" : "Public"}
              </div>
              <div className='border-solid border-[1px] rounded-full px-2 py-1 text-xs border-gray-300 self-center shrink-0'>
                {roadmap.views_count} Views
              </div>
              <div className='border-solid border-[1px] rounded-full px-2 py-1 text-xs border-gray-300 self-center truncate'>
                {convertDateTimeString(roadmap.edited_at)}
              </div>
            </div>
            <div>
              {roadmap.description}
            </div>
          </div>
        </div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] pointer-events-none p-4 bg-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)] rounded-xl opacity-0 transition-opacity duration-300 z-10 ${visible && 'opacity-90'}`}>
          <div className='flex flex-col text-black text-xs'>
            <span>★★★ Done before due date</span>
            <span>★★ Done after due date 1-3 days</span>
            <span>★ Done after due date more than 3 days</span>
          </div>
        </div>
      </div>

    </>
  )
}

export default RoadmapDetail