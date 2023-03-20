import React, {useState} from 'react'
import SettingTab from '../components/SettingTab';

const Setting = () => {
    const [tab, setTab] = useState("");
    
    return (
        <div className='flex flex-col'>
            <SettingTab tab={tab} setTab={setTab}/>
            <RenderSettingContent tab={tab}/>
        </div>
    )
}

function RenderSettingContent({tab}) {
    switch (tab) {
        case "profile":
            return <p>profile</p>
        case "account":
            return <p>account</p>
        case "appearance":
            return <p>appearance</p>
    }
}

export default Setting;