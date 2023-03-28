import React, {useState} from 'react'
import SettingTab from '../components/SettingTab';
import ToggleSwitch from '../components/ToggleSwitch';

const Setting = () => {
    const [tab, setTab] = useState("profile");

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [link, setLink] = useState("");

    const [notification, setNotification] = useState(true);
    const [accountPublic, setAccountPublic] = useState(true);
    const [email, setEmail] = useState("username@gmail.com");
    const [currentRealPassword, setCurrentRealPassword] = useState("username@gmail.com");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const RenderProfile = () => {
        return (
            <div className='flex flex-col'>
                {/* username, first name, last name, profile pic */}
                <div className='flex gap-2 justify-between max-w-4xl'>
                    {/* username, first name, last name */}
                    <div className='flex flex-col flex-grow pl-4'>
                        {/* username */}
                        <SettingField formID={"edit-username-form"} fieldTitle={"Username"} fieldPlaceHolder={"bocchi"} setOnSubmit={setUsername}/>
                        {/* first name */}
                        <SettingField formID={"first-name-form"} fieldTitle={"First Name"} fieldPlaceHolder={"Hotori"} setOnSubmit={setFirstName}/>
                        {/* last name */}
                        <SettingField formID={"last-name-form"} fieldTitle={"Last Name"} fieldPlaceHolder={"Gotou"} setOnSubmit={setLastName}/>
                    </div>
                    {/* profile pic */}
                    <div className='pl-8'>
                        <SettingText text="Profile Picture"/>
                        <div className='pl-10'>
                            <div className=''>
                                <div className='w-48 h-48 overflow-hidden rounded-full'>
                                    <img src="https://preview.redd.it/p2hrqjb7bpaa1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=3a93ad0769038a197421464aa34389e830525baa"></img>
                                </div>
                            </div>
                            <button className="shadow appearance-none border rounded-lg w-16 py-2 px-3 text-sm text-white bg-blue-900 leading-tight focus:outline-none focus:shadow-outline float-right">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <SettingTopic text="Social"/>
                {/* bio, links */}
                <div className='flex flex-col max-w-4xl pl-4'>
                    {/* bio */}
                    <SettingBioField formID={"bio-form"} fieldTitle={"Bio"} fieldPlaceHolder={"This is the life of Hitori Gotou, a.k.a. bocchi za rokku"} setOnSubmit={setBio}/>
                    {/* links */}
                    <SettingField formID={"links-form"} fieldTitle={"Links"} fieldPlaceHolder={"https://github.com/bocchides"} setOnSubmit={setLink}/>
                </div>
            </div>
        )
    }

    const RenderAccount = () => {
        return (
            <div className='flex flex-col'>
                {/* account privacy, email */}
                <div className='flex-col max-w-4xl pl-4'>
                    <ToggleSwitch name={"Public Account"} isToggled={accountPublic} setIsToggled={setAccountPublic}/>
                    <hr className='border-2 border-transparent'/>
                    <EmailSettingField name="Email Address" email={email}/>
                </div>
    
                {/* password */}
                <SettingTopic text="Password"/>
                <div className='flex max-w-4xl pl-4'>
                    <PasswordSettingField currentPassword={currentPassword} setCurrentPassword={setCurrentPassword} newPassword={setNewPassword} setNewPassword={setNewPassword}/>
                </div>
    
                {/* delete account */}
                <SettingTopicRed text="Delete Account"/>
                <div className='flex-col max-w-4xl pl-4'>
                    <p className='text-sm text-gray-500 mb-3'>
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button 
                        className="shadow appearance-none border rounded-lg py-2 px-6 text-sm text-red-500 bg-white leading-tight focus:outline-none focus:shadow-outline font-bold"
                        onClick={() => {console.log("delete account")}}
                    >
                        Delete your account
                    </button>
                </div>
    
                {/* notification */}
                <SettingTopic text="Notifications"/>
                <div className='flex max-w-4xl pl-4'>
                    <ToggleSwitch name={"Allow Notifications"} isToggled={notification} setIsToggled={setNotification}/>
                </div>
            </div>
        )
    }

    const RenderAppearance = () => {
        return (
            <div className=''>

            </div>
        )
    }

    return (
        <div className='flex'>
            {console.log("[Debug on submit] \nusername: " + username + "\nfirst name: " + firstName + "\nlast name: " + lastName + "\nbio: " + bio + "\nlink: " + link)}
            <div className='flex flex-col h-max px-12 pt-8 flex-grow'>
                {/* Render Setting Tab */}
                <SettingTab tab={tab} setTab={setTab}/>
                <hr className='border-8 border-transparent py-3'/>

                {/* Render Setting Content (depending on tab) */}
                <div className='pl-10'>
                    {tab === "profile" ? 
                    <RenderProfile/> :
                    tab === "account" ? 
                    <RenderAccount notification={notification} setNotification={setNotification} accountPublic={accountPublic} setAccountPublic={setAccountPublic} email={email}/> :
                    tab === "appearance" ?? 
                    <Appearance/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Setting;

const SettingField = ({formID, fieldTitle, fieldPlaceHolder, setOnSubmit}) => {
    return (
        <form id={formID} onSubmit={handleFieldSubmit(setOnSubmit)} className='mb-4'>
            <label className='flex flex-col'>
                <SettingText text={fieldTitle}/>
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
        <form id={formID} onSubmit={handleFieldSubmit(setOnSubmit)} className='mb-3 max-w-4xl'>
            <label className='flex flex-col'>
                <SettingText text={fieldTitle}/>
                    <textarea
                        type="text"
                        className="w-full h-32 px-3 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none resize-none focus:shadow-outline shadow"
                        placeholder={fieldPlaceHolder}
                        id="text"
                    >
                    </textarea>
                    <button 
                        type='submit' 
                        className="shadow appearance-none border rounded-lg w-16 py-2 px-3 mt-1 text-sm text-white bg-blue-900 leading-tight focus:outline-none focus:shadow-outline ml-auto"
                    >
                        Save
                    </button>
            </label>
        </form>
    )
}

const EmailSettingField = ({name, email}) => {
    return (
        <div className='flex flex-col max-w-md'>
            <p className="text-gray-800 text-sm mb-1 font-bold px-1">
                {name}
            </p>
            <div className='flex gap-0.5'>
                <textarea
                type="text"
                className="w-72 px-3 py-2 h-10 text-sm text-gray-700 border rounded-lg focus:outline-none resize-none focus:shadow-outline shadow"
                placeholder={email}
                id="text"
                readOnly={true}
                ></textarea>
            </div>
        </div>
    )
}

const PasswordSettingField = ({currentPassword, setCurrentPassword, newPassword, setNewPassword}) => {
    return (
        <form id="passwordSetting" onSubmit={handlePasswordSubmit} className='flex-col justify-between pt-1'>
            {/* current password */}
            <div className='flex justify-between gap-20'>
                <div className='flex-grow'>
                    <SettingText text="Current Password"/>
                    <textarea
                    type="text"
                    className="w-72 px-3 py-2 h-10 text-sm text-gray-700 border rounded-lg focus:outline-none resize-none focus:shadow-outline shadow"
                    placeholder={'********'}
                    id="currentPassword"
                    ></textarea>
                </div>
                <div className='flex-grow'>

                </div>
            </div>
            {/* new password */}
            <div className="flex justify-between gap-20 pt-3">
                <div className='flex-col'>
                    <SettingText text="New Password"/>
                    <textarea
                    type="text"
                    className="w-72 px-3 py-2 h-10 text-sm text-gray-700 border rounded-lg focus:outline-none resize-none focus:shadow-outline shadow"
                    placeholder={'********'}
                    id="newPassword"
                    ></textarea>
                </div>
                <div className='flex-col'>
                    <SettingText text="Confirm New Password"/>
                    <textarea
                    type="text"
                    className="w-72 px-3 py-2 h-10 text-sm text-gray-700 border rounded-lg focus:outline-none resize-none focus:shadow-outline shadow"
                    placeholder={'********'}
                    id="confirmNewPassword"
                    ></textarea>
                </div>
            </div>
            {/* update password button */}
            <div>
                <button 
                    type='submit' 
                    className="shadow appearance-none border rounded-lg py-2 px-6 mt-4 text-sm text-white bg-blue-900 leading-tight focus:outline-none focus:shadow-outline ml-auto"
                >
                    Update Password
                </button>
            </div>
        </form>
    )
}

const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (event.target.newPassword.value === event.target.confirmNewPassword.value) {
        console.log("Confirm new password matched");
    } else {
        console.log("Confirm new password does NOT match");
    }
    /* TODO: set data to backend based on form id */
}

const SettingText = ({text}) => {
    return (
        <p className="text-gray-800 text-sm mb-1 font-bold px-1">
            {text}
        </p>
    )
}

const SettingTopic = ({text}) => {
    return (
        <>
            <p className="text-gray-800 text-base mt-8 font-bold px-1">
                {text}
            </p>
            <hr className='border-1 border-gray-300 max-w-4xl mb-3'/>
        </>
    )
}

const SettingTopicRed = ({text}) => {
    return (
        <>
            <p className="text-red-600 text-base mt-8 font-bold px-1">
                {text}
            </p>
            <hr className='border-1 border-gray-300 max-w-4xl mb-3'/>
        </>
    )
}

const handleFieldSubmit = setOnSubmit => (event) => {
    event.preventDefault();
    setOnSubmit(event.target.text.value);
    /* TODO: set data to backend based on form id */
}