import React from "react";
import { ReactComponent as PlusIcon } from "../assets/roadmap_assets/plus_Icon.svg"


const RoadmapCreate = () => {
    return (
        < div className="relative flex justify-center items-center border-1 border-dashed border-black border-2 w-80 h-80 m-8" >
            {/*<PlusIcon className="absolute h-full w-full" />*/}
            <PlusIcon className="absolute "/>
        </ div>
    )
};

export default RoadmapCreate;