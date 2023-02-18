import React from "react";
import { ReactComponent as PlusIcon } from "../assets/roadmap_assets/plus_Icon.svg"


const RoadmapCreate = () => {
    return (
        < div className="relative border border-dashed border-black border-2 w-80 h-80 m-8" >
            {/*<PlusIcon className="absolute h-full w-full" />*/}
            <div className="max-w-2xl max-h-2xl">
                <PlusIcon className="absolute inset-1/2" />
            </div>
        </ div>
    )
};

export default RoadmapCreate;