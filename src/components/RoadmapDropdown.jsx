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
    var togglePrivacy = {transform:"translateX(0px)"};
    var toggleButtonColor = {background:"#736666"}

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const roadmapPrivacy = () => {
        setIsPublic(!isPublic)
    }

    if (isOpen)
        showDropdown = {display:"inline-block"};

    if (isPublic) {
        togglePrivacy = {transform:"translateX(19px)"}
        toggleButtonColor = {background:"#00FF00"}
    }

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
                    <button onClick={roadmapPrivacy} className="absolute left-[96px] top-[4px] w-[14px] h-[14px] bg-[#FFFFFF] rounded-[14px] border-[0.7px] border-solid border-[#D9D9D9] hover:scale-[1.15] z-50" style={togglePrivacy}></button>
                    <button onClick={roadmapPrivacy} className="absolute left-[96px] top-[6px] w-[33px] h-[10px] bg-[#736666] rounded-[50px]" style={toggleButtonColor}></button>
                    <div className="absolute left-[134px] top-[0px]">
                        <PublicIcon/>
                    </div>
                    <div className="absolute left-[152px] top-[-1px]">
                        Public
                    </div>
                </div>
                <div className="inline-block relative">
                    <div className="absolute left-[13px] top-[35px]">
                        <DeleteIcon/>
                    </div>
                    <div className="absolute left-[37px] top-[34px]">
                        Delete
                    </div>
                </div>
                <div className="inline-block relative">
                    <div className="absolute left-[13px] top-[70px]">
                        <RenameIcon/>
                    </div>
                    <div className="absolute left-[37px] top-[69px]">
                        Rename
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default RoadmapDropdown;