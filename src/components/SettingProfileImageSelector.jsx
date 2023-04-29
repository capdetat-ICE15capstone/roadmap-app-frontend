import { useState, useEffect, lazy } from "react";
import { updateSetting } from '../pages/Setting';

// import p1 from "../assets/profileImage_assets/placeholder1.png";
// import p2 from "../assets/profileImage_assets/placeholder2.png";
// import p3 from "../assets/profileImage_assets/placeholder3.jpeg";
// import p4 from "../assets/profileImage_assets/placeholder4.jpeg";

import p1 from "../assets/profileImage_assets/1.jpg";
import p2 from "../assets/profileImage_assets/5.jpg";
import p3 from "../assets/profileImage_assets/2.jpg";
import p4 from "../assets/profileImage_assets/6.jpg";
import p5 from "../assets/profileImage_assets/3.jpg";
import p6 from "../assets/profileImage_assets/7.jpg";
import p7 from "../assets/profileImage_assets/4.jpg";
import p8 from "../assets/profileImage_assets/8.jpg";
import p9 from "../assets/profileImage_assets/9.jpg";
import p10 from "../assets/profileImage_assets/10.jpg";
import p11 from "../assets/profileImage_assets/11.jpg";
import p12 from "../assets/profileImage_assets/12.jpg";
import p13 from "../assets/profileImage_assets/13.jpg";
import p14 from "../assets/profileImage_assets/14.jpg";
import { ReactComponent as LockIcon } from "../assets/setting_assets/lock.svg";

const lib = {
    0: p1,
    1: p2,
    2: p3,
    3: p4,
    4: p5,
    5: p6,
    6: p7,
    7: p8,
    8: p9,
    9: p10,
    10: p11,
    11: p12,
    12: p13,
    13: p14,
    // 14: p3,
    // 15: p4,
    // 16: p1,
    // 17: p2,
    // 18: p3,
    // 19: p4,
    // 20: p1,
}

export const getProfilePictureSrc = (id) => {
    if (lib.hasOwnProperty(id)) {
        return lib[id];
    }
    return lib[0];
}

const SettingProfileImageSelector = ({isOpen, setIsOpen, selectedIndex = 0, setProfilePicture, level}) => {
    const [index, setIndex] = useState(0);

    useEffect (() => {
        setIndex(selectedIndex);
    }, [isOpen]);

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const ProfPic = ({id, reqLevel}) => {
        return (
            //div className={`w-${side} h-${side} overflow-hidden rounded-full`}>
            <button className={`px-1 py-2`} onClick={handleClickProfile(id)} disabled={level < reqLevel && reqLevel > 0}>
                <div className="flex flex-col">
                    <div className={`relative w-36 h-36 lg-w-40 lg-h-40 overflow-hidden rounded-full border-8 ${index == id ? "border-blue-800" : "border-transparent"}`}>
                        {level < reqLevel && reqLevel > 0 ?
                            <div className={`absolute w-full h-full overflow-hidden bg-black opacity-50`}>
                                <div className="flex flex-col w-full h-full justify-center items-center">
                                    <LockIcon width={64} height={64}/>
                                </div>
                            </div>
                        : <></>}
                        <div className="">
                            <img src={getProfilePictureSrc(id)}
                                className="w-36 lg-w-40 h-auto object-fit"
                            />
                        </div>
                    </div>
                    <p className={`${level < reqLevel && reqLevel > 0 ? "text-black" : "text-transparent"}`}>{"Level: " + reqLevel}</p>
                </div>
            </button>
        )
    };

    const handleClickProfile = id => (event) => {
        event.preventDefault();
        setIndex(id);
    }

    const handleCloseModal = (event) => {
        event.preventDefault();
        setIsOpen(false);
    }

    const handleSaveModal = async (event) => {
        event.preventDefault();
        
        setProfilePicture(index);

    }

    return (
        <div
        className={`fixed z-30 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}
        >
            <div className="fixed inset-0 bg-black opacity-25 flex justify-center items-center"></div>
            <form className="fixed inset-0 flex justify-center items-center">
                <div className="bg-white rounded-2xl my-6 mx-auto 2-11/12 md:w-5/6 xl:w-2/3 2xl:w-1/2">
                    <div className="flex flex-col">
                        {/* Title */}
                        <div className="py-4 px-5 lg:py-8 text-center">
                            <h3 className="text-4xl font-semibold text-black">
                                Select Profile Image
                            </h3>
                        </div>
                        {/* Images for select */}
                        <div className="w-full mx-auto bg-gray-100 h-[448px] border-t border-b border-solid border-slate-200 overflow-y-scroll">
                            <div className="flex flex-wrap px-5 gap-1 justify-evenly my-2">
                                <ProfPic id={0} reqLevel={0}/>
                                <ProfPic id={1} reqLevel={0}/>
                                <ProfPic id={2} reqLevel={5}/>
                                <ProfPic id={3} reqLevel={5}/>
                                <ProfPic id={4} reqLevel={10}/>
                                <ProfPic id={5} reqLevel={10}/>
                                <ProfPic id={6} reqLevel={15}/>
                                <ProfPic id={7} reqLevel={15}/>
                                <ProfPic id={8} reqLevel={20}/>
                                <ProfPic id={9} reqLevel={25}/>
                                <ProfPic id={10} reqLevel={30}/>
                                <ProfPic id={11} reqLevel={35}/>
                                <ProfPic id={12} reqLevel={40}/>
                                {/* <ProfPic id={13} reqLevel={27}/>
                                <ProfPic id={14} reqLevel={30}/>
                                <ProfPic id={15} reqLevel={33}/>
                                <ProfPic id={16} reqLevel={36}/>
                                <ProfPic id={17} reqLevel={39}/>
                                <ProfPic id={18} reqLevel={42}/>
                                <ProfPic id={19} reqLevel={45}/> */}
                            </div>
                            <div className="flex justify-center mb-3">
                                <span>Designed by <a href="http://www.freepik.com" className="underline text-blue-500">pikisuperstar / Freepik</a></span>
                            </div>
                        </div>
                        
                        {/* Title */}
                        <div className="py-2 px-5 lg:py-2">
                            <div className="flex p-4 rounded-b gap-3 justify justify-end">
                                <button
                                    className="text-black border border-black background-transparent rounded-full font-bold uppercase text-sm h-10 w-24 "
                                    type="button"
                                    onClick={handleCloseModal}
                                >
                                Close
                                </button>
                                <button
                                    className="bg-nav-blue text-white font-bold uppercase text-sm rounded-full shadow hover:shadow-lg h-10 w-24"
                                    onClick={handleSaveModal}
                                >
                                Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default SettingProfileImageSelector;
