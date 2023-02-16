import React from 'react'

import { ReactComponent as Logo } from "../assets/logo-big.svg"

const Signup = () => {
  return (
    <>
      <div className="m-auto">
        <div className="flex bg-white rounded shadow-lg">
          <div className="flex flex-col m-6">
            <p className="text-center mb-4 text-3xl font-bold text-slate-600">
              Create Account
            </p>
            <form className="mx-8">
              <div className="flex flex-row justify-between">
                <lable>
                  <p className="text-gray-600 text-sm">
                    First Name
                  </p>
                  <input
                    type="username"
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="InputEmail"
                    placeholder="Username"
                  />
                </lable>
                <lable>
                  <p className="text-gray-600 text-sm">
                    Last Name
                  </p>
                  <input
                    type="username"
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="InputEmail"
                    placeholder="Username"
                  />
                </lable>
              </div>
              <div className="flex flex-col">
                <lable>
                  <p className="text-gray-600 text-sm">
                    Username
                  </p>
                  <input
                    type="username"
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="InputEmail"
                    placeholder="Username"
                  />
                </lable>
              </div>
              <div className="flex flex-row justify-between">
                <lable>
                  <p className="text-gray-600 text-sm">
                    First Name
                  </p>
                  <input
                    type="username"
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="InputEmail"
                    placeholder="Username"
                  />
                </lable>
                <lable>
                  <p className="text-gray-600 text-sm">
                    Last Name
                  </p>
                  <input
                    type="username"
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="InputEmail"
                    placeholder="Username"
                  />
                </lable>
              </div>
              <div className="flex justify-between mb-4">
                <div>
                  <label>
                    <input
                      type="checkbox"
                      className="w-4 h-4S bg-gray-100 border-gray-300 rounded"
                      id="CheckRememberMe"
                    />
                    <a className="ml-2 text-xs font-medium text-gray-400">
                      Remember Me
                    </a>
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button type="submit" className="bg-blue-900 text-white shadow font-bold py-2 px-16 rounded-lg focus:outline-none focus:shadow-outline">
                  Log In
                </button>
              </div>
            </form>
            <div className="flex justify-center m-4">
              <p className="text-xs font-light text-gray-400">
                ---------------- OR ----------------
              </p>
            </div>
            <div className="flex flex-col mb-2 mx-8">
              <div className="flex items-center justify-center mb-4">
                <button className="bg-transparent grow text-gray-600 border border-grey-500 py-2 font-semilight rounded-lg text-sm" type="button">
                  Continue with Google
                </button>
              </div>
              <div className="flex items-center justify-center mb-4">
                <button className="bg-transparent grow text-gray-600 border border-grey-500 py-2 font-semilight rounded-lg text-sm" type="button">
                  Continue with Facebook
                </button>
              </div>
              <div className="flex items-center justify-center mb-4">
                <button className="bg-transparent grow text-gray-600 border border-grey-500 py-2 font-semilight rounded-lg text-sm" type="button">
                  Continue with Email
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-gradient-to-b from-teal-300 to-amber-100 rounded">
            <div className="flex flex-col grow justify-center my-4 mx-12">
              <Logo className="justify-center self-center" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Signup