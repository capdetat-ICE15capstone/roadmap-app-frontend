import react, { useState } from "react"
import { ReactComponent as PrivateIcon } from "../assets/roadmapDropdown_assets/private_icon.svg"
import { ReactComponent as PublicIcon } from "../assets/roadmapDropdown_assets/public_icon.svg"
import { ReactComponent as DeleteIcon } from "../assets/roadmapDropdown_assets/delete_icon.svg"
import { ReactComponent as RenameIcon } from "../assets/roadmapDropdown_assets/rename_icon.svg"
import { ReactComponent as DropdownIcon } from "../assets/roadmapDropdown_assets/dropdown_icon.svg"

const RoadmapDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    var showDropdown = {display:"none"};

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    if (isOpen)
        showDropdown = {display:"inline-block"};

    return (
        <>
            <button onClick={handleClick}>
                <div className="absolute left-[690px] top-[320px] flex justify-center items-center w-[20px] h-[20px] rounded-[20px] hover:bg-[#EEEAEA]">
                    <DropdownIcon/>
                </div>
            </button>
            <div className="absolute left-[570px] top-[350px] bg-[#FFFFFF] font-bold appearance-none border rounded-xl px-12 py-4 ml-2 leading-tight focus:outline-none focus:shadow-outline w-60 h-36 z-50" style={showDropdown}>
                <div className="absolute left-0">
                    <PrivateIcon/>
                </div>
            </div>
        </>
    )
}

export default RoadmapDropdown;