import React from "react";

import { ReactComponent as HomeLogo } from "../assets/navbar_assets/home_icon.svg"

const SettingTab = (props) => {
    return (
        <div>
            <div className='flex'>
                <div className='flex justify-evenly'>
                    <TabItem SvgIcon={HomeLogo} displayName="Profile" tabName="profile" tab={props.tab} setTab={props.setTab}/>
                    <TabItem SvgIcon={HomeLogo} displayName="Account" tabName="account" tab={props.tab} setTab={props.setTab}/>
                    <TabItem SvgIcon={HomeLogo} displayName="Appearance" tabName="appearance" tab={props.tab} setTab={props.setTab}/>
                </div>
                <div className='grow'>
                    <button 
                        className="shadow appearance-none border rounded-lg py-2 px-6 text-sm text-black bg-white leading-tight focus:outline-none focus:shadow-outline font-bold float-right"
                        onClick={() => {console.log("logout")}}
                    >
                        Logout
                    </button>   
                </div>
            </div>
            <hr className='border-1 border-gray-700'/>
        </div>
    )
}

const TabItem = ({SvgIcon, displayName, tabName, tab, setTab}) => {
    return (
        <button className='w-52 grow pt-1 hover:bg-gray-700 hover:scale-105 transition duration-200 group' onClick={() => setTab(tabName)}>
            <div className='overflow-hidden whitespace-nowrap flex justify-center'>
                <SvgIcon className='w-6 h-auto inline stroke-gray-700'/>
                <div className='text-gray-800 text-lg font-bold px-1 group-hover:text-white'>
                    <span>{displayName}</span>
                </div>
            </div>
            {tabName === tab ? 
                <hr className='border-2 border-gray-700'/>:
                <hr className='border-2 border-transparent'/>
            }
        </button>
    )
}

export default SettingTab;