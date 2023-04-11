import React, {useState} from 'react';
import { useEffect } from 'react';
import { axiosInstance } from "../functions/axiosInstance";
import SettingTab from '../components/SettingTab';
import ToggleSwitch from '../components/ToggleSwitch';

import Spinner from "../components/Spinner";

import { ReactComponent as GearIcon } from "../assets/setting_assets/gear.svg";
import { ReactComponent as ProfileIcon } from "../assets/setting_assets/profile.svg";
import { ReactComponent as AccountIcon } from "../assets/setting_assets/account.svg";
import { ReactComponent as NotificationIcon } from "../assets/setting_assets/notification.svg";

//-----PWA thingy----------------------------------------------------------------
import axios from "axios";

const publicVAPIDKey =
  "BEStV6D5Z4rWtMK0X2hXP8X4Zj9CKrOyHej3i1JQOZhk_FRCF3-dv3s7B97WNvIPoe_Pg7zX2CFwPF4_LMsf7ag";
const route = "http://localhost:8080/subscription";

function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
  
    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

//---------------------------------------------------------------------

const Setting = () => {
    const [data, setData] = useState(null);

    const [tab, setTab] = useState("profile");

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [link, setLink] = useState("");

    const [notification, setNotification] = useState(true);
    const [accountPublic, setAccountPublic] = useState(true);
    const [email, setEmail] = useState("username@gmail.com");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConform, setNewPasswordConfirm] = useState();

    //-----PWA thingy----------------------------------------------------------------

    const [notiOn, setNotiOn] = useState(false);

    const handleNotiSubscription = () => {
        console.log("function handlenotisub");
        if (notiOn === true) return;
    
        try {
          // Ask for notification permission
          if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
            // TELL THE USER THEY DONT HAVE NOTIFICATION AVAILABLE
            throw new Error("Notification Not supported");
          } else if (Notification.permission === "granted") {
            console.log("Permission granted"); // move on
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
              if (permission !== "granted") {
                console.error("Notification Permission: Denied");
                // TELL THE USER NOTIFICATION PERMISSION IS DENIED
                throw new Error("Notification Permission: Denied");
              }
            });
          } else {
            console.error("Notification Permission: Denied");
            // TELL THE USER NOTIFICATION PERMISSION IS DENIED
            throw new Error("Notification Permission: Denied");
          }
    
          navigator.serviceWorker.ready
            .then((serviceWorkerRegistration) => {
              const options = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVAPIDKey),
              };
    
              serviceWorkerRegistration.pushManager
                .subscribe(options)
                .then(
                  (pushSubscription) => {
                    console.log(pushSubscription);
                    axiosInstance.post(route, pushSubscription)
                        .catch(handleNotiUnsubscription)
                  },
                  (error) => {
                    console.error(error);
                  }
                )
                .then(() => {
                  setNotiOn(true);
                  console.log("registration complete");
                })
                .catch((error) => {
                  console.error("Subscription error");
                  console.error(error);
                  throw new Error("Subscription fail")
                });
            })
            .catch((error) => {
              console.error("service worker not ready");
              console.error(error);
              throw new Error("Service Worker not ready")
            });
        } catch (error) {
          console.error("setup error");
          console.error(error);
        }
      };
    
      const handleNotiUnsubscription = () => {
        console.log("unsub");
        navigator.serviceWorker.ready.then((reg) => {
          reg.pushManager.getSubscription().then((subscription) => {
            // Tell the server unsub
            let unsubRoute = `/subscription/?endpoint=${subscription.endpoint}`
            axiosInstance.delete(unsubRoute);
            subscription
              .unsubscribe()
              .then((successful) => {
                // You've successfully unsubscribed
                console.log(successful);
                setNotiOn(false);
              })
              .catch((e) => {
                // Unsubscribing failed
                console.error(e);
              });
          });
        });
      };

    //---------------------------------------------------------------------

    useEffect (() => {
        const fetchData = async () => {
            const response = await getSetting();
            console.log("Fetched data: ");
            console.log(response.data);
            setData(response.data);
            setUsername(response.data.username);
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
            setBio(response.data.bio);
            setAccountPublic(!response.data.is_private);
        }
        fetchData();
    }, []);

    const RenderProfile = () => {
        return (
            <div className='flex flex-col'>
                <SettingTitle text='Profile' Icon={ProfileIcon}/>
                {/* username, first name, last name, profile pic */}
                <div className='flex gap-2 justify-between max-w-4xl pl-4'>
                    {/* username, first name, last name */}
                    <div className='flex flex-col flex-grow pl-4'>
                        {/* username */}
                        <SettingField formID={"edit-username-form"} fieldTitle={"Username"} fieldDataName={"username"} fieldPlaceHolder={username} setOnSubmit={setUsername}/>
                        {/* first name */}
                        <SettingField formID={"first-name-form"} fieldTitle={"First Name"} fieldDataName={"first_name"} fieldPlaceHolder={firstName} setOnSubmit={setFirstName}/>
                        {/* last name */}
                        <SettingField formID={"last-name-form"} fieldTitle={"Last Name"} fieldDataName={"last_name"} fieldPlaceHolder={lastName} setOnSubmit={setLastName}/>
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
                {/* bio, links */}
                <div className='flex flex-col max-w-4xl pl-8'>
                    {/* bio */}
                    <SettingBioField formID={"bio-form"} fieldTitle={"Bio"} fieldDataName={"bio"} fieldPlaceHolder={bio} setOnSubmit={setBio}/>
                    {/* links */}
                    {/*}
                    <SettingField formID={"links-form"} fieldTitle={"Links"} fieldDataName={"link"} fieldPlaceHolder={link} setOnSubmit={setLink}/>
                    {*/}
                </div>
            </div>
        )
    }

    const RenderAccount = () => {
        return (
            <div className='flex flex-col'>
                <SettingTitle text='Account' Icon={AccountIcon}/>
                {/* account privacy, email */}
                <div className='flex-col max-w-4xl pl-8'>
                    <ToggleSwitch name={"Public Account"} isToggled={accountPublic} setIsToggled={setAccountPublic} callOnChanged={updatePrivacy}/>
                    <hr className='border-2 border-transparent'/>
                    <EmailSettingField name="Email Address" email={email}/>
                </div>
    
                {/* password */}
                <SettingTopic text="Password"/>
                <div className='flex max-w-4xl pl-8'>
                    <PasswordSettingField oldPassword={oldPassword} setOldPassword={setOldPassword} newPassword={setNewPassword} setNewPassword={setNewPassword}/>
                </div>
    
                {/* delete account */}
                <SettingTopicRed text="Delete Account"/>
                <div className='flex-col max-w-4xl pl-8'>
                    <p className='text-sm text-gray-500 mb-3'>
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button 
                        className="shadow appearance-none border rounded-lg py-2 px-6 text-sm text-red-500 bg-white leading-tight focus:outline-none focus:shadow-outline font-bold"
                        onClick={() => deleteAccount()}
                    >
                        Delete your account
                    </button>
                </div>
    
                {/* notification */}
                <SettingTitle text="Notifications" Icon={NotificationIcon}/>
                <div className='flex max-w-4xl pl-8'>
                    <ToggleSwitch name={"Allow Notifications"} isToggled={notification} setIsToggled={setNotification}/>
                </div>
                <div className='h-36'></div>
            </div>
        )
    }

    const RenderAppearance = () => {
        return (
            <div className=''>

            </div>
        )
    }

    // return (
    //     <div className='flex'>
    //         {console.log("[Debug on submit] \nusername: " + username + "\nfirst name: " + firstName + "\nlast name: " + lastName + "\nbio: " + bio + "\nlink: " + link)}
    //         <div className='flex flex-col h-max px-12 pt-8 flex-grow'>
    //             {/* Render Setting Tab */}
    //             <SettingTab tab={tab} setTab={setTab}/>
    //             <hr className='border-8 border-transparent py-3'/>

    //             {/* Render Setting Content (depending on tab) */}
    //             <div className='pl-10'>
    //                 {tab === "profile" ? 
    //                 <RenderProfile/> :
    //                 tab === "account" ? 
    //                 <RenderAccount notification={notification} setNotification={setNotification} accountPublic={accountPublic} setAccountPublic={setAccountPublic} email={email}/> :
    //                 tab === "appearance" ?? 
    //                 <Appearance/>
    //                 }
    //             </div>
    //         </div>
    //     </div>
    // )

    const SettingField = ({formID, fieldTitle, fieldDataName, fieldPlaceHolder, setOnSubmit}) => {
        return (
            <form id={formID} onSubmit={handleFieldSubmit(setOnSubmit, data, setData)} className='mb-4'>
                <label className='flex flex-col'>
                    <SettingText text={fieldTitle}/>
                    <div className='flex gap-0.5'>
                        <input 
                            name={fieldDataName}
                            className="flex-grow shadow appearance-none border rounded-lg w-max py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
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
    
    const SettingBioField = ({formID, fieldTitle, fieldDataName, fieldPlaceHolder, setOnSubmit}) => {
        return (
            <form id={formID} onSubmit={handleFieldSubmit(setOnSubmit)} className='mb-3 max-w-4xl'>
                <label className='flex flex-col'>
                    <SettingText text={fieldTitle}/>
                        <textarea
                            name={fieldDataName}
                            className="w-full h-32 px-3 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none resize-none focus:shadow-outline shadow bg-gray-100"
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
                    className="w-72 px-3 py-2 h-10 text-sm text-gray-700 border rounded-lg focus:outline-none resize-none focus:shadow-outline shadow bg-gray-100"
                    placeholder={email}
                    id="text"
                    readOnly={true}
                    ></textarea>
                </div>
            </div>
        )
    }
    
    const PasswordSettingField = () => {
        return (
            <form id="passwordSetting" onSubmit={handlePasswordSubmit} className='flex-col justify-between pt-1'>
                {/* current password */}
                <div className='flex justify-between gap-20'>
                    <div className='flex-grow'>
                        <SettingText text="Current Password"/>
                        <textarea
                        type="text"
                        className="w-72 px-3 py-2 h-10 text-sm text-gray-700 border rounded-lg focus:outline-none resize-none focus:shadow-outline shadow bg-gray-100"
                        placeholder={'********'}
                        id="oldPassword"
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
                        className="w-72 px-3 py-2 h-10 text-sm text-gray-700 border rounded-lg focus:outline-none resize-none focus:shadow-outline shadow bg-gray-100"
                        placeholder={'********'}
                        id="newPassword"
                        ></textarea>
                    </div>
                    <div className='flex-col'>
                        <SettingText text="Confirm New Password"/>
                        <textarea
                        type="text"
                        className="w-72 px-3 py-2 h-10 text-sm text-gray-700 border rounded-lg focus:outline-none resize-none focus:shadow-outline shadow bg-gray-100"
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
            // password matched
            setNewPassword(event.target.newPassword.value);
            console.log({ ...data, "old_password": event.target.oldPassword.value, "new_password": event.target.newPassword.value});
            updateSetting("/user/password/", { ...data, "old_password": event.target.oldPassword.value, "new_password": event.target.newPassword.value});
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
                <p className="text-gray-800 text-sm mt-8 font-bold px-1 pl-8">
                    {text}
                </p>
                <hr className='border-1 border-gray-300 max-w-4xl mb-3 ml-3'/>
            </>
        )
    }
    
    const SettingTopicRed = ({text}) => {
        return (
            <>
                <p className="text-red-600 text-sm mt-8 font-bold px-1 pl-8">
                    {text}
                </p>
                <hr className='border-1 border-gray-300 max-w-4xl mb-3 ml-3'/>
            </>
        )
    }
    
    const SettingTitle = ({text, Icon}) => {
        return (
            <>
                <div className='flex mt-8 '>
                    <Icon className="h-8 w-auto"/>
                    <p className="text-gray-800 text-2xl font-bold px-1">
                        {text}
                    </p>
                </div>
                <hr className='border-1 border-gray-400 max-w-4xl mb-3'/>
            </>
        )
    }
    
    const handleFieldSubmit = setOnSubmit => (event) => {
        event.preventDefault();

        const { name, value } = event.target.text;
        setOnSubmit(value);
        setData({ ...data, [name]: value});

        updateSetting("/user/" + name + "/", { ...data, [name]: value});
    }

    const deleteAccount = () => {
        console.log("delete account");
        updateSetting("/account/deactivate");
    }

    const updatePrivacy = () => {
        console.log({ ...data, "is_private": accountPublic});
        updateSetting("/user/privacy/", { ...data, "is_private": accountPublic});
    }

    if (!data) {
        return <Spinner/>;
    }

    return (
        <div className='flex-col h-screen overflow-y-scroll'>
            <div className="relative flex top-[59px] left-[38px] w-fit h-fit mb-24">
                <div className="mr-[13px]">
                <GearIcon/>
                </div>          
                <div className="font-inter font-extrabold text-[40px] text-[#09275B] leading-[48px]">
                Setting
                </div>
            </div>
            <div className='w-3/4 max-w-4xl mx-auto'>
                <RenderProfile/>
                <RenderAccount/>
            </div>
            <button
                className="bg-red-400 w-20 h-10"
                onClick={notiOn ? handleNotiUnsubscription : handleNotiSubscription}
            >
                Sub
            </button>
        </div>
    )
}

export default Setting;

export const getSetting = async (timeout = 0) => {
    // check whether user is logged-in
    const route = `/user/user_profile_settings`

    try {
        let response = await axiosInstance.get(route, { timeout: timeout });
        return response;
    } catch (error) {
        console.error("Fail GetSetting()");
    }
}

export const updateSetting = async (route, body, timeout = 10000) => {
    try {
        let response = await axiosInstance.put(route, body, { timeout: timeout });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}