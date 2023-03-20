import react from "react"
import { ReactComponent as PrivateIcon } from "../assets/roadmapDropdown_assets/private_icon.svg"
import { ReactComponent as PublicIcon } from "../assets/roadmapDropdown_assets/public_icon.svg"
import { ReactComponent as DeleteIcon } from "../assets/roadmapDropdown_assets/delete_icon.svg"
import { ReactComponent as RenameIcon } from "../assets/roadmapDropdown_assets/rename_icon.svg"
import { ReactComponent as DropdownIcon } from "../assets/roadmapDropdown_assets/dropdown_icon.svg"

const RoadmapDropdown = () => {
    return (
        <>
            <div className="absolute flex flex-col items-center bg-[#FFFFFF] font-bold appearance-none border rounded-xl px-12 py-4 ml-2 leading-tight focus:outline-none focus:shadow-outline w-60 h-36 z-50">
                <div className="relative">
                    This is dropdown
                </div>
                <span className="absolute left-0">
                    <PrivateIcon/>
                </span>
                <span>
                    <PublicIcon/>
                </span>
                <span>
                    <DeleteIcon/>
                </span>
                <span>
                    <RenameIcon/>
                </span>
            </div>
        </>
    )
}

export default RoadmapDropdown;