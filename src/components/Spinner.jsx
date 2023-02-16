import React from 'react'
import { ReactComponent as Logo } from "../assets/logo.svg"

const Spinner = () => {
    return (
        <div className="fixed inset-0 z-10 bg-black opacity-80 flex">
            <Logo className="animate-spin h-1/3 w-1/3 self-center justify-self-center grow"></Logo>
        </div>
    )
}

export default Spinner