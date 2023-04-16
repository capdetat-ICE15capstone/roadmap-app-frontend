import { useState, useEffect } from "react";
import { updateSetting } from '../pages/Setting';
import { useNavigate } from 'react-router-dom';

import p1 from "../assets/setting_assets/firstlogin.png";

const HomeFirstLoginModal = ({isOpen, setIsOpen}) => {

    const navigate = useNavigate();

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const handleGoToSetting = () => {
        navigate("/setting/");
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
                                Update Your Bio
                            </h3>
                        </div>
                        {/* Images for select */}
                        <div className="w-full mx-auto bg-gray-100 h-[448px] border-t border-b border-solid border-slate-200 overflow-y-scroll">
                            <div className="flex justify-center">
                                <img src={p1}
                                    className="w-[564px] lg-w-40 h-auto object-fit"
                                />
                            </div>
                        </div>
                        {/* Title */}
                        <div className="py-2 px-5 lg:py-2 flex justify-between">
                            <diiv className="my-auto mx-6 text-lg">
                                Fill in your bio in the Setting page
                            </diiv>
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
                                    onClick={handleGoToSetting}
                                >
                                Setting
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default HomeFirstLoginModal;