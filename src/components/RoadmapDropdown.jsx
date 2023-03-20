import react, { useState } from "react"
import { ReactComponent as PrivateIcon } from "../assets/roadmapDropdown_assets/private_icon.svg"
import { ReactComponent as PublicIcon } from "../assets/roadmapDropdown_assets/public_icon.svg"
import { ReactComponent as DeleteIcon } from "../assets/roadmapDropdown_assets/delete_icon.svg"
import { ReactComponent as RenameIcon } from "../assets/roadmapDropdown_assets/rename_icon.svg"
import { ReactComponent as DropdownIcon } from "../assets/roadmapDropdown_assets/dropdown_icon.svg"

const RoadmapDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    var showDropdown = {display:"none"};

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    if (isOpen)
        showDropdown = {display:"inline-block"};

    return (
        <div className="absolute flex justify-center z-50">
            <button onClick={handleClick} className="relative flex justify-center items-center top-[-70px] left-[310px] w-[20px] h-[20px] rounded-[20px] hover:bg-[rgb(238,234,234)]">                
                <DropdownIcon/>
            </button>
            <div className="absolute top-[-30px] left-[200px] bg-[#FFFFFF] font-bold appearance-none border rounded-xl leading-tight focus:outline-none focus:shadow-outline w-60 h-36" style={showDropdown}>
                <div className="inline-block relative">
                    <div className="absolute left-[14px] top-[0px]">
                        <PrivateIcon/>
                    </div>
                    <div className="absolute left-[37px] top-[-1px]">
                        Private
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default RoadmapDropdown;