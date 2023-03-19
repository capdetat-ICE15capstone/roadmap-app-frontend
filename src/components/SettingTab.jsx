import React from "react";

import { ReactComponent as HomeLogo } from "../assets/navbar_assets/home_icon.svg"

const TabItem = (props) => {
    return (
        <div className='grow py-1 hover:bg-blue-500 hover:scale-105 transition duration-200'>
            <div className='overflow-hidden whitespace-nowrap flex justify-center'>
                <props.SvgIcon className='w-6 h-auto inline'/>
                <div className='font-nunito-sans text-black font-bold justify-self-center'>
                    {props.displayName}
                </div>
            </div>
        </div>
    )
}

const SettingTab = () => {
    return (
        <div className='flex'>
            <div className='flex justify-evenly grow'>
                <TabItem SvgIcon={HomeLogo} displayName="Profile"/>
                <TabItem SvgIcon={HomeLogo} displayName="Account"/>
                <TabItem SvgIcon={HomeLogo} displayName="Appearance"/>
            </div>
            <div className='grow'>

            </div>
        </div>
    )
}

export default SettingTab;