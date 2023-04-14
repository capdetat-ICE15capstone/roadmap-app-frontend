import { useState, useEffect } from "react";
import { updateSetting } from '../pages/Setting';

import p1 from "../assets/profileImage_assets/placeholder1.png";
import p2 from "../assets/profileImage_assets/placeholder2.png";
import p3 from "../assets/profileImage_assets/placeholder3.jpeg";
import p4 from "../assets/profileImage_assets/placeholder4.jpeg";
import { update } from "lodash";

const lib = {
    0: p1,
    1: p2,
    2: p3,
    3: p4,
    4: p1,
    5: p2,
    6: p3,
    7: p4,
    8: p1,
    9: p2,
    10: p3,
    11: p4,
    12: p1,
    13: p2,
    14: p3,
    15: p4,
    16: p1,
    17: p2,
    18: p3,
    19: p4,
    20: p1,
}

export const getProfilePictureSrc = (id) => {
    if (lib.hasOwnProperty(id)) {
        return lib[id];
    }
    return lib[0];
}

const SettingProfileImageSelector = ({isOpen, setIsOpen, selectedIndex = 0, setProfilePicture}) => {
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

    const ProfPic = ({id}) => {
        return (
            //div className={`w-${side} h-${side} overflow-hidden rounded-full`}>
            <button className={`px-2 py-2`} onClick={handleClickProfile(id)}>
                <div className={`w-36 h-36 lg-w-40 lg-h-40 overflow-hidden rounded-full border-8 ${index == id ? "border-blue-800" : "border-transparent"}`}>
                    <img src={getProfilePictureSrc(id)}
                        className="w-36 lg-w-40 h-auto object-fit"
                    />
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
                        <div className="w-full mx-auto bg-gray-100 h-96 border-t border-b border-solid border-slate-200 overflow-y-scroll">
                            <div className="flex flex-wrap px-5 gap-3 justify-evenly">
                                <ProfPic id={0}/>
                                <ProfPic id={1}/>
                                <ProfPic id={2}/>
                                <ProfPic id={3}/>
                                <ProfPic id={4}/>
                                <ProfPic id={5}/>
                                <ProfPic id={6}/>
                                <ProfPic id={7}/>
                                <ProfPic id={8}/>
                                <ProfPic id={9}/>
                                <ProfPic id={10}/>
                                <ProfPic id={11}/>
                                <ProfPic id={12}/>
                                <ProfPic id={13}/>
                                <ProfPic id={14}/>
                                <ProfPic id={15}/>
                                <ProfPic id={16}/>
                                <ProfPic id={17}/>
                                <ProfPic id={18}/>
                                <ProfPic id={19}/>
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
