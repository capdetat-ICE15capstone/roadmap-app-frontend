import React from "react";

const DuoSubpageSelector = (props) => {
    return (
        <div className='max-w-lg'>
            <div className='flex justify-between'>
                <TabItem displayName={props.tab1Name} tab="1" setCurrentTab={props.setCurrentTab} currentTab={props.currentTab}/>
                <TabItem displayName={props.tab2Name} tab="2" setCurrentTab={props.setCurrentTab} currentTab={props.currentTab}/>
            </div>
            <hr className='border-4 border-gray-200 rounded-full -translate-y-2 z-10'/>
        </div>
    )
}

const TabItem = ({displayName, tab, setCurrentTab, currentTab}) => {
    return (
        <button className='relative w-36 pt-1 hover:bg-gray-700 hover:scale-105 transition duration-200 group z-20' onClick={() => setCurrentTab(tab)}>
            <div className='overflow-hidden whitespace-nowrap flex justify-center'>
                <div className='text-gray-800 text-4xl font-bold px-1 group-hover:text-white'>
                    <span>{displayName}</span>
                </div>
            </div>
            {currentTab === tab ? 
                <hr className='border-4 border-gray-700 rounded-full'/>:
                <hr className='border-4 border-transparent'/>
            }
        </button>
    )
}

export default DuoSubpageSelector;