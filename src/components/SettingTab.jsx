import React from "react";

import { ReactComponent as HomeLogo } from "../assets/navbar_assets/home_icon.svg"

const TabItem = (props) => {
    return (
        <button className='grow py-1 hover:bg-blue-500 hover:scale-105 transition duration-200' onClick={() => props.setTab(props.tabName)}>
            <div className='overflow-hidden whitespace-nowrap flex justify-center'>
                <props.SvgIcon className='w-6 h-auto inline'/>
                <div className='font-nunito-sans text-black font-bold justify-self-center'>
                    {props.displayName}
                </div>
            </div>
        </button>
    )
}

const SettingTab = (props) => {
    return (
        <div className='flex'>
            <div className='flex justify-evenly grow'>
                <TabItem SvgIcon={HomeLogo} displayName="Profile" tabName="profile" setTab={props.setTab}/>
                <TabItem SvgIcon={HomeLogo} displayName="Account" tabName="account" setTab={props.setTab}/>
                <TabItem SvgIcon={HomeLogo} displayName="Appearance" tabName="appearance" setTab={props.setTab}/>
            </div>
            <div className='grow'>

            </div>
        </div>
    )
}

export default SettingTab;