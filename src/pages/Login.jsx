import React, { useState } from 'react'

import { ReactComponent as Logo } from "../assets/logo-big.svg"
import email from "../assets/images/email.png";
import facebook from "../assets/images/facebook.png";
import google from "../assets/images/google.png";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password, rememberMe);
        document.getElementById("login-form").reset();
        setUsername("");
        setPassword("");
        setRememberMe(false);
    };

    return (
        <>
            <div className="flex flex-col h-screen bg-gray-200">
                <div className="flex bg-white rounded shadow-xl m-auto">
                    <div className="flex flex-col bg-gradient-to-b from-teal-300 to-amber-100 rounded">
                        <div className="flex flex-col grow justify-center my-4 mx-12">
                            <Logo className="justify-center self-center" />
                            <div className="mb-2">
                                <p className="font-semibold text-2xl ">
                                    WELCOME to
                                </p>
                                <p className="font-extrabold text-3xl ">
                                    APPNAME!
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="font-regular text-sm">
                                    We're here to help YOU complete your <br />
                                    TASK successfully
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col m-6">
                        <p className="flex justify-center mb-4 text-3xl font-bold text-slate-600">
                            USER LOGIN
                        </p>
                        <form id="login-form" onSubmit={handleSubmit}>
                            <div className="flex flex-col space-y-4 mb-4">
                                <input
                                    type="username"
                                    className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="InputEmail"
                                    placeholder="Username"
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                />
                                <input
                                    type="password"
                                    className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="InputPassword"
                                    placeholder="********"
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row  justify-between ">
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4S bg-gray-100 border-gray-300 rounded"
                                            id="CheckRememberMe"
                                            onChange={() => setRememberMe(!rememberMe)}
                                        />
                                        <a className="ml-2 text-xs font-medium text-gray-400">
                                            Remember Me
                                        </a>
                                    </label>
                                    <div>
                                        <a className="font-bold text-xs text-blue-900" href="#">
                                            Forgot Password?
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <button type="submit" className="bg-blue-900 text-white shadow font-bold py-2 rounded-lg">
                                    Log In
                                </button>
                            </div>
                        </form>
                        <div className="flex justify-center m-4">
                            <p className="text-xs font-light text-gray-400">
                                ---------------- OR ----------------
                            </p>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className="flex flex-col mb-4">
                                <button className="bg-transparent grow text-gray-600 border border-grey-500 py-2 font-semilight rounded-lg text-sm" type="button">
                                    <div className="flex justify-center items-center space-x-2">
                                        <img src={google} alt="google" className="w-4 h-4"></img>
                                        <span>Continue with Google</span>
                                    </div>
                                </button>
                            </div>
                            <div className="flex flex-col mb-4">
                                <button className="bg-transparent grow text-gray-600 border border-grey-500 py-2 font-semilight rounded-lg text-sm" type="button">
                                    <div className="flex justify-center items-center space-x-2">
                                        <img src={facebook} alt="google" className="w-4 h-4"></img>
                                        <span>Continue with Facebook</span>
                                    </div>
                                </button>
                            </div>
                            <div className="flex flex-col mb-4">
                                <button className="bg-transparent text-gray-600 border border-grey-500 py-2 font-semilight rounded-lg text-sm" type="button">
                                    <div className="flex justify-center items-center space-x-2">
                                        <img src={email} alt="google" className="w-4 h-4"></img>
                                        <span>Sign up with email</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login