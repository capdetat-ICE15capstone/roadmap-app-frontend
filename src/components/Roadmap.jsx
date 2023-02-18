import React from "react";
import { ReactComponent as EyeIcon } from "../assets/roadmap_assets/eye_Icon.svg"

const Roadmap = () => {
    return (
        < div className="container relative w-80 h-80 m-8" >
            {/*upper*/}
            <div className="relative h-2/3 w-auto border solid border-x-4 border-y-8 border-[#7DC5E3]  ">
                <h1 className="absolute text-black bottom-1 left-2">
                    username
                </h1>
                <h1 className="absolute text-gray-600 bottom-1 right-2">
                    Last updated: dd/mm/yyyy
                </h1>
            </div>
            {/*lower*/}
            <div className="relative h-1/3 w-auto bg-gray-300">
                <h1 className="absolute top-0 left-2 text-2xl">
                    Roadmap Name
                </h1>
                <h1 className="absolute top-7 left-2">
                    Owner: owner name
                </h1>
                <h1 className="absolute top-14 left-2 text-gray-600">
                    Created : dd/mm/yyyy
                </h1>
                <span className="absolute bottom-1 left-4">
                    <EyeIcon />
                </span>
                <h1 className="absolute bottom-1 left-12">
                    : 0 views
                </h1>
            </div>
        </ div>
    )
};

export default Roadmap;