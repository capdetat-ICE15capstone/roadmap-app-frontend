import { useState } from "react";
import TwoButtonModal from "./TwoButtonModal";

const SettingProfileImageSelector = ({isOpen, setIsOpen, selectedIndex = 0, setSelectedIndex}) => {

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const ProfPic = (id) => {
        return (
            //div className={`w-${side} h-${side} overflow-hidden rounded-full`}>
            <button className="px-2 py-2">
                <div className={`w-40 h-40 lg-w-48 lg-h-48 overflow-hidden rounded-full`}>
                    <img src="https://preview.redd.it/p2hrqjb7bpaa1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=3a93ad0769038a197421464aa34389e830525baa"
                        className="w-40 lg-w-48 h-auto object-fit"
                    />
                </div>
            </button>
        )
    };

    const handleChickProfile = id => (event) => {
        event.preventDefault();

    }

    return (
        <div
        className={`fixed z-30 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}
        >
            <div className="fixed inset-0 bg-black opacity-25 flex justify-center items-center"></div>
            <form className="fixed inset-0 flex justify-center items-center">
                <div className="bg-white rounded-2xl my-6 mx-auto 2-11/12 md:w-5/6 xl:w-2/3 2xl:w-1/2 max-h-screen">
                    <div className="flex flex-col items-center">
                        {/* Title */}
                        <div className="py-4 px-5 lg:py-8">
                            <h3 className="text-4xl font-semibold text-black">
                                Select Profile Image
                            </h3>
                        </div>
                        {/* Images for select */}
                        <div className="w-full mx-auto">
                            <div className="flex flex-wrap px-5 gap-3 justify-evenly">
                                <ProfPic id={1}/>
                                <ProfPic id={2}/>
                                <ProfPic id={3}/>
                                <ProfPic id={4}/>
                                <ProfPic id={5}/>
                                <ProfPic id={6}/>
                                <ProfPic id={7}/>
                                <ProfPic id={8}/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default SettingProfileImageSelector;
