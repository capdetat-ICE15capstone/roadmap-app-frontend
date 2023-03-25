import React, {useState} from 'react'
import SettingTab from '../components/SettingTab';

const Setting = () => {
    const [tab, setTab] = useState("profile");

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [link, setLink] = useState("");
    
    return (
        <div className='flex'>
            {console.log("[Debug on submit] \nusername: " + username + "\nfirst name: " + firstName + "\nlast name: " + lastName + "\nbio: " + bio + "\nlink: " + link)}
            <div className='flex flex-col h-max px-12 pt-8 flex-grow justify-center'>
                {/* Render Setting Tab */}
                <SettingTab tab={tab} setTab={setTab}/>
                <hr className='border-8 border-transparent py-3'/>

                {/* Render Setting Content (depending on tab) */}
                {tab === "profile" ? 
                <RenderProfile setUsername={setUsername} setFirstName={setFirstName} setLastName={setLastName} setBio={setBio} setLink={setLink}/> :
                tab === "account" ? 
                <p>account</p> :
                tab === "appearance" ?? 
                <p>appearance</p>
                }
            </div>
        </div>
    )
}

export default Setting;

const RenderProfile = ({setUsername, setFirstName, setLastName, setBio, setLink}) => {
    return (
        <div className='flex flex-col'>
            {/* username, first name, last name, profile pic */}
            <div className='flex gap-2 justify-between max-w-4xl'>
                {/* username, first name, last name */}
                <div className='flex flex-col flex-grow'>
                    {/* username */}
                    <SettingField formID={"edit-username-form"} fieldTitle={"Username"} fieldPlaceHolder={"bocchi"} setOnSubmit={setUsername}/>
                    {/* first name */}
                    <SettingField formID={"first-name-form"} fieldTitle={"First Name"} fieldPlaceHolder={"Hotori"} setOnSubmit={setFirstName}/>
                    {/* last name */}
                    <SettingField formID={"last-name-form"} fieldTitle={"Last Name"} fieldPlaceHolder={"Gotou"} setOnSubmit={setLastName}/>
                </div>
                {/* profile pic */}
                <div className='pl-8'>
                    <p className="text-gray-800 text-sm mb-1 font-bold">
                        Profile Picture
                    </p>
                    <div className='pl-10'>
                        <div className=''>
                            <div className='w-48 h-48 overflow-hidden rounded-full'>
                                <img src="https://preview.redd.it/p2hrqjb7bpaa1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=3a93ad0769038a197421464aa34389e830525baa"></img>
                            </div>
                        </div>
                        <button className="shadow appearance-none border rounded-lg w-16 py-2 px-3 border-t-4 text-sm text-white bg-blue-900 leading-tight focus:outline-none focus:shadow-outline float-right">
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <hr className='border-1 border-gray-300 max-w-4xl my-5'/>
            {/* bio, links */}
            <div className='flex flex-col max-w-4xl'>
                {/* bio */}
                <SettingBioField formID={"bio-form"} fieldTitle={"Bio"} fieldPlaceHolder={"This is the life of Hitori Gotou, a.k.a. bocchi za rokku"} setOnSubmit={setBio}/>
                {/* links */}
                <SettingField formID={"links-form"} fieldTitle={"Links"} fieldPlaceHolder={"https://github.com/bocchides"} setOnSubmit={setLink}/>
            </div>
        </div>
    )
}

const SettingField = ({formID, fieldTitle, fieldPlaceHolder, setOnSubmit}) => {
    return (
        <form id={formID} onSubmit={handleSubmit(setOnSubmit)} className='mb-4'>
            <label className='flex flex-col'>
                <p className="text-gray-800 text-sm mb-1 font-bold px-1">
                    {fieldTitle}
                </p>
                <div className='flex gap-0.5'>
                    <input 
                        type="username"
                        className="flex-grow shadow appearance-none border rounded-lg w-max py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={fieldPlaceHolder}
                        id="text"
                    />
                    <button 
                        type='submit' 
                        className="shadow appearance-none border rounded-lg w-16 py-2 px-3 text-sm text-white bg-blue-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        Edit
                    </button>
                </div>
            </label>
        </form>
    )
}

const SettingBioField = ({formID, fieldTitle, fieldPlaceHolder, setOnSubmit}) => {
    return (
        <form id={formID} onSubmit={handleSubmit(setOnSubmit)} className='mb-3 max-w-4xl'>
            <label className='flex flex-col'>
                <p className="text-gray-800 text-sm mb-1 font-bold px-1">
                    {fieldTitle}
                </p>
                    <textarea
                        type="text"
                        className="w-full h-32 px-3 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none resize-none focus:shadow-outline shadow"
                        placeholder={fieldPlaceHolder}
                        id="text"
                    >
                    </textarea>
                    <button 
                        type='submit' 
                        className="shadow appearance-none border rounded-lg w-16 py-2 px-3 border-t-4 text-sm text-white bg-blue-900 leading-tight focus:outline-none focus:shadow-outline ml-auto"
                    >
                        Save
                    </button>
            </label>
        </form>
    )
}

const handleSubmit = setOnSubmit => (event) => {
    event.preventDefault();
    setOnSubmit(event.target.text.value);
    /* TODO: set data to backend based on form id */
}